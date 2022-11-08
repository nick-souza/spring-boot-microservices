package com.nicolas.user.controller;

import com.nicolas.user.dto.AddUserDTO;
import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.utils.GenericResponse;
import com.nicolas.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
//@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse<UserDTO>> findUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<GenericResponse<UserDTO>> addUser(@RequestBody AddUserDTO model) {
        return userService.addUser(model);
    }

    @GetMapping("/")
    public ResponseEntity<GenericResponse<List<UserDTO>>> findAll() {
        return userService.findAll();
    }
}
