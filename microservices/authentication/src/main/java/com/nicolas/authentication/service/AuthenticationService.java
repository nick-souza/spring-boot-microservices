package com.nicolas.authentication.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nicolas.authentication.dto.incoming.AddUserDTO;
import com.nicolas.authentication.dto.incoming.LogInDTO;
import com.nicolas.authentication.dto.incoming.SignInDTO;
import com.nicolas.authentication.dto.outgoing.LogInResponseDTO;
import com.nicolas.authentication.dto.outgoing.SignInResponseDTO;
import com.nicolas.authentication.dto.outgoing.UserDTO;
import com.nicolas.authentication.model.User;
import com.nicolas.authentication.utils.GenericResponse;
import com.nicolas.authentication.utils.exception.BadRequestException;
import com.nicolas.authentication.utils.exception.RecordNotFoundException;
import com.nicolas.authentication.utils.exception.UnauthorizedRequestException;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Date;

@Service
@AllArgsConstructor
public class AuthenticationService {
    protected final String USER_URI = "http://USER/user/";
    public static final String SECRET_KEY = "463408a1-54c9-4307-bb1c-6cced559f5a7"; // Random GUID

    private final RestTemplate restTemplate;
    private final PasswordEncoder passEncoder;

    public ResponseEntity<GenericResponse<SignInResponseDTO>> signIn(SignInDTO model) {
        if (!model.getPassword().equals(model.getConfirmPassword()))
            throw new BadRequestException("Passwords do not match");

        var addUserDTO = new AddUserDTO();
        addUserDTO.setEmail(model.getEmail());
        addUserDTO.setName(model.getName());

        // Usando BCrypt para encriptar a senha:
        addUserDTO.setEncryptedPass(passEncoder.encode(model.getPassword()));

        var restResponse = restTemplate.postForObject(USER_URI + "sign-in", addUserDTO, GenericResponse.class);

        return new ResponseEntity<>(restResponse, HttpStatus.resolve(restResponse.getStatusCode()));
    }

    public ResponseEntity<GenericResponse<LogInResponseDTO>> logIn(LogInDTO model) {
        var userResponse = restTemplate.getForObject(USER_URI + "email-check/{email}", GenericResponse.class, model.getEmail());

        var user = getUser(userResponse.getData());

        var valid = passEncoder.matches(model.getPassword(), user.getPassword());

        // TODO: Throw unauthorized instead:
        if (!valid)
            throw new BadRequestException("Invalid credentials");

        var userDTO = getUserDTO(user);

        var logInDTO = new LogInResponseDTO();
        logInDTO.setEmail(user.getEmail());
        logInDTO.setId(user.getId());
        logInDTO.setToken(createToken(userDTO));

        var response = new GenericResponse<>(true, 200, logInDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public GenericResponse findByEmailOptional(String email) {
        try {
            var response = restTemplate.getForObject(USER_URI + "email/{email}", GenericResponse.class, email);

            var data = response.getData();

//            return new ResponseEntity<>(new GenericResponse<>(true, 200, data), HttpStatus.OK);
            return new GenericResponse<>(true, 200, data);
        } catch (Exception ex) {
            var msg = ex.getMessage();
//            return new ResponseEntity<>(new GenericResponse<>(false, 400, msg), HttpStatus.BAD_REQUEST);
            return new GenericResponse<>(false, 400, msg);
        }
    }

    // Used by the GatewayFilter to validate the JWT token:
    public LogInResponseDTO validateToken(String token) {
        try {
            // Pegando o email do JWT Claim para validar se existe:
            var email = Jwts.parser().setSigningKey(SECRET_KEY)
                                .parseClaimsJws(token)
                                .getBody()
                                .getSubject();

            var response = findByEmailOptional(email);

            if (response.getData() == null)
                throw new RecordNotFoundException("User not found");

            var user = getUserDTO(response.getData());

            var logInDTO = new LogInResponseDTO();

            logInDTO.setId(user.getId());
            logInDTO.setToken(createToken(user));
            logInDTO.setEmail(user.getEmail());

            return logInDTO;

        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException ex) {
            throw new UnauthorizedRequestException("Invalid JWT");
        }
    }

    private String createToken(UserDTO user) {
        var claims = Jwts.claims().setSubject(user.getEmail());

        var now = new Date();
        var validity = new Date(now.getTime() + 3600000); // 1 hour

        return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity).signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public UserDTO getUserDTO(Object userObj) {
        try {
            // Usando o Jackson para conversão:
            var mapper = new ObjectMapper();

            // Para poder ignorar o password:
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

//            // Chamando a aplicação USER para pegar o objeto pelo Id:
//            var userObj = restTemplate.getForObject(USER_URI + "{responsibleId}", GenericResponse.class, id).getData();

            // Convertendo para JSON String:
            String jsonStr = mapper.writeValueAsString(userObj);

            // Convertendo para o DTO:
            return mapper.readValue(jsonStr, UserDTO.class);
        } catch (JsonProcessingException ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    public User getUser(Object model) {
        try {
            var mapper = new ObjectMapper();

            String jsonStr = mapper.writeValueAsString(model);

            return mapper.readValue(jsonStr, User.class);
        } catch (JsonProcessingException ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }
}
