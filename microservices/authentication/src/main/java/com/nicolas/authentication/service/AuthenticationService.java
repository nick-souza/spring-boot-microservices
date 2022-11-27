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
import com.nicolas.authentication.exception.BadRequestException;
import com.nicolas.authentication.exception.RecordNotFoundException;
import com.nicolas.authentication.exception.UnauthorizedRequestException;
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
        // Comparando as senhas:
        if (!model.getPassword().equals(model.getConfirmPassword()))
            throw new BadRequestException("Passwords do not match");

        var addUserDTO = new AddUserDTO();

        addUserDTO.setEmail(model.getEmail());
        addUserDTO.setName(model.getName());
        // Usando BCrypt para encriptar a senha:
        addUserDTO.setEncryptedPass(passEncoder.encode(model.getPassword()));

        // Mandando o DTO para o user service, que em caso de sucesso retorna um SignInResponseDTO:
        var restResponse = restTemplate.postForObject(USER_URI + "sign-in", addUserDTO, GenericResponse.class);

        return new ResponseEntity<>(restResponse, HttpStatus.resolve(restResponse.getStatusCode()));
    }

    public ResponseEntity<GenericResponse<LogInResponseDTO>> logIn(LogInDTO model) {
        // Chamando o user service para verificar o email:
        var userResponse = restTemplate.getForObject(USER_URI + "email-check/{email}", GenericResponse.class, model.getEmail());

        // Em caso de sucesso, convertendo o response para User:
        var user = getUser(userResponse.getData());

        // Validando a senha encriptada e do model:
        var valid = passEncoder.matches(model.getPassword(), user.getPassword());

        if (!valid)
            throw new UnauthorizedRequestException("Invalid credentials");

        // Convertendo para a resposta, com o JWT:
        var logInDTO = new LogInResponseDTO();

        logInDTO.setEmail(user.getEmail());
        logInDTO.setId(user.getId());
        logInDTO.setToken(createToken(user.getEmail()));

        var response = new GenericResponse<>(true, 200, logInDTO);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Used by the GatewayFilter to validate the JWT token:
    public LogInResponseDTO validateToken(String token) {
        try {
            // Pegando o email do JWT Claim para validar se existe:
            var email = Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody().getSubject();

            var response = findByEmailOptional(email);

            if (response == null)
                throw new RecordNotFoundException("User not found");

            var user = getUserDTO(response);

            var logInDTO = new LogInResponseDTO();

            logInDTO.setId(user.getId());
            logInDTO.setName(user.getName());
            logInDTO.setLastName(user.getLastName());
            logInDTO.setEmail(user.getEmail());
            logInDTO.setStatus(user.getStatus());
            logInDTO.setRole(user.getRole());
            logInDTO.setCreationDate(user.getCreationDate());
            logInDTO.setRoleDesc(user.getRoleDesc());
            logInDTO.setStatusDesc(user.getStatusDesc());
            logInDTO.setLastUpdate(user.getLastUpdate());

            logInDTO.setToken(createToken(user.getEmail()));

            return logInDTO;
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException ex) {
            throw new UnauthorizedRequestException("Invalid JWT");
        }
    }

    private Object findByEmailOptional(String email) {
        try {
            // Chamando o user service para procurar o usuário pelo email:
            var response = restTemplate.getForObject(USER_URI + "email/{email}", GenericResponse.class, email);

            return response.getData();
        } catch (Exception ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    private String createToken(String userEmail) {
        // Colocando o email do user na claim:
        var claims = Jwts.claims().setSubject(userEmail);

        // Validade de uma hora:
        var now = new Date();
        var validity = new Date(now.getTime() + 3600000); // 1 hour

        // Criando e retornando o JWT token:
        return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity).signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public UserDTO getUserDTO(Object userObj) {
        try {
            // Usando o Jackson para conversão:
            var mapper = new ObjectMapper();

            // Para poder ignorar o password:
            mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

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
