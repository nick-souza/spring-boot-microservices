package com.nicolas.user.service;

import com.nicolas.user.dto.AddUserDTO;
import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.utils.GenericResponse;
import com.nicolas.user.utils.exception.BadRequestException;
import com.nicolas.user.utils.exception.RecordNotFoundException;
import com.nicolas.user.profile.UserProfile;
import com.nicolas.user.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final UserProfile userProfile;

    @Autowired
    public UserService(UserRepository userRepository, UserProfile userProfile) {
        this.userRepository = userRepository;
        this.userProfile = userProfile;
    }

    public ResponseEntity<GenericResponse<UserDTO>> findUserById(Long id) {
        var _user = userRepository.findById(id);

        if (_user.isEmpty())
            throw new RecordNotFoundException("User not found");

        var user = userProfile.toUserDTO().map(_user.get());

        var response = new GenericResponse<>(true, 200, user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<UserDTO>> addUser(AddUserDTO model) {
        if (model == null)
            throw new BadRequestException("Invalid body");

        var _user = userProfile.toUser().map(model);

        _user.setCreatedAt(LocalDateTime.now());
        _user.setLastUpdateAt(LocalDateTime.now());

        userRepository.save(_user);

        var user = userProfile.toUserDTO().map(_user);

        var response = new GenericResponse<>(true, 201, user);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<GenericResponse<List<UserDTO>>> findAll() {
        var users = userRepository.findAll().stream().map(user -> userProfile.toUserDTO().map(user)).collect(Collectors.toList());

        if (users.isEmpty())
            throw new RecordNotFoundException("No user found");

        var response = new GenericResponse<>(true, 200, users);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
