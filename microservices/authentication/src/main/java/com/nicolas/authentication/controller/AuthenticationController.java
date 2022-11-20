package com.nicolas.authentication.controller;

import com.nicolas.authentication.dto.LogInDTO;
import com.nicolas.authentication.dto.SignInDTO;
import com.nicolas.authentication.dto.SignInResponseDTO;
import com.nicolas.authentication.service.AuthenticationService;
import com.nicolas.authentication.utils.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth/")
public class AuthenticationController {
    private final AuthenticationService authService;

    @Autowired
    public AuthenticationController (AuthenticationService authService) {
        this.authService = authService;
    }

    @PostMapping("sign-in")
    public ResponseEntity<GenericResponse<SignInResponseDTO>> signIn(@RequestBody SignInDTO model) {
        return authService.signIn(model);
    }

    @PostMapping("log-in")
    public ResponseEntity<GenericResponse<Boolean>> logIn(@RequestBody LogInDTO model) {
        return authService.logIn(model);
    }
}
