package com.nicolas.user.controller;

import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.handlers.GenericResponse;
import com.nicolas.user.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
@AllArgsConstructor
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse<UserDTO>> findUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }
}
