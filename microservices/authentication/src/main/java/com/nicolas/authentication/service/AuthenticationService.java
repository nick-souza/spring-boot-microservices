package com.nicolas.authentication.service;

import com.nicolas.authentication.dto.AddUserDTO;
import com.nicolas.authentication.dto.LogInDTO;
import com.nicolas.authentication.dto.SignInDTO;
import com.nicolas.authentication.dto.SignInResponseDTO;
import com.nicolas.authentication.utils.GenericResponse;
import com.nicolas.authentication.utils.exception.BadRequestException;
import com.nicolas.authentication.utils.exception.RestTemplateErrorHandler;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@AllArgsConstructor
public class AuthenticationService {
    protected final String USER_URI = "http://USER/user/";

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

    public ResponseEntity<GenericResponse<Boolean>> logIn(LogInDTO model) {
        var user = restTemplate.getForObject(USER_URI + "email/{email}", GenericResponse.class, model.getEmail());

        var valid = passEncoder.matches(model.getPassword(), user.getData().toString());

        var statusCode = valid ? HttpStatus.OK : HttpStatus.UNAUTHORIZED;

        return new ResponseEntity<>(new GenericResponse<>(valid, statusCode.value(), valid), statusCode);
    }

    // TODO: Add JWT verification method:
}
