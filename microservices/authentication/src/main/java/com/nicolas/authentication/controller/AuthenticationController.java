package com.nicolas.authentication.controller;

import com.nicolas.authentication.dto.incoming.LogInDTO;
import com.nicolas.authentication.dto.incoming.SignInDTO;
import com.nicolas.authentication.dto.outgoing.LogInResponseDTO;
import com.nicolas.authentication.dto.outgoing.SignInResponseDTO;
import com.nicolas.authentication.service.AuthenticationService;
import com.nicolas.authentication.utils.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("login")
    public ResponseEntity<GenericResponse<LogInResponseDTO>> logIn(@RequestBody LogInDTO model) {
        return authService.logIn(model);
    }

    @PostMapping("validateToken")
    public ResponseEntity<LogInResponseDTO> validateToken(@RequestParam String token) {
        return ResponseEntity.ok(authService.validateToken(token));
    }


//    @PostMapping("log-in/{email}")
//    public ResponseEntity<GenericResponse> check(@PathVariable String email) {
//        return authService.findByEmailOptional(email);
//    }
}
