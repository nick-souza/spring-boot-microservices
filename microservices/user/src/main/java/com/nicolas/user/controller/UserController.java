package com.nicolas.user.controller;

import com.nicolas.user.dto.AddUserDTO;
import com.nicolas.user.dto.UpdateUserAdminDTO;
import com.nicolas.user.dto.UpdateUserDTO;
import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.utils.GenericResponse;
import com.nicolas.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/user/")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("{id}")
    public ResponseEntity<GenericResponse<UserDTO>> findUserById(@PathVariable Long id) {
        return userService.findUserById(id);
    }

    @PostMapping("add")
    public ResponseEntity<GenericResponse<UserDTO>> addUser(@RequestBody @Valid AddUserDTO model) {
        return userService.addUser(model);
    }

    @GetMapping("")
    public ResponseEntity<GenericResponse<List<UserDTO>>> findAll() {
        return userService.findAllActiveUsers();
    }

    @PutMapping("update/{id}")
    public ResponseEntity<GenericResponse<UserDTO>> updateUser(@PathVariable Long id, @RequestBody @Valid UpdateUserDTO model) {
        return userService.updateUser(id, model);
    }

    // TODO: Add role authentication here
//    @PutMapping("update/{id}")
//    public ResponseEntity<GenericResponse<UserDTO>> updateUserAdmin(@PathVariable Long id, @RequestBody @Valid UpdateUserAdminDTO model) {
//        return userService.updateUserAdmin(id, model);
//    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<HttpStatus> deleteUser(@PathVariable Long id) {
        return userService.deleteUser(id);
    }
}
