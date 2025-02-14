package com.nicolas.user.controller;

import com.nicolas.user.dto.AddUserDTO;
import com.nicolas.user.dto.LogInResponseDTO;
import com.nicolas.user.dto.UpdateUserDTO;
import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.model.User;
import com.nicolas.user.utils.GenericResponse;
import com.nicolas.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user/")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("")
    public ResponseEntity<GenericResponse<List<UserDTO>>> findAll() {
        return userService.findAllActiveUsers();
    }

    @GetMapping("{id}")
    public ResponseEntity<GenericResponse<UserDTO>> findUserById(@PathVariable Long id) {
        return userService.findActiveUserById(id);
    }

    @PostMapping("sign-up")
    public ResponseEntity<GenericResponse<UserDTO>> addUser(@RequestBody @Valid AddUserDTO model) {
        return userService.addUser(model);
    }

    @GetMapping("email-check/{email}") // Usado pelo módulo de autenticação:
    public ResponseEntity<GenericResponse<User>> findByEmail(@PathVariable String email) {
        return userService.findUserByEmail(email);
    }

    @GetMapping("email/{email}") // Usado pelo módulo de autenticação:
    public ResponseEntity<GenericResponse<UserDTO>> findByEmailOptional(@PathVariable String email) {
        return userService.findUserByEmailOptional(email);
    }

    @PutMapping("update/{id}")
    public ResponseEntity<GenericResponse<UserDTO>> updateUser(@PathVariable Long id, @RequestBody @Valid UpdateUserDTO model) {
        return userService.updateUser(id, model);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<GenericResponse> deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}
