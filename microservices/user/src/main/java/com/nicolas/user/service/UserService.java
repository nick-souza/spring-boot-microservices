package com.nicolas.user.service;

import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.handlers.GenericResponse;
import com.nicolas.user.handlers.exception.RecordNotFoundException;
import com.nicolas.user.model.User;
import com.nicolas.user.profile.UserProfile;
import com.nicolas.user.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserProfile userProfile;

    public ResponseEntity<GenericResponse<UserDTO>> findUserById(Long id) {
        var _user = userRepository.findById(id);

        if (_user.isEmpty())
            throw new RecordNotFoundException("User not found");

        var user = userProfile.toUser().map(_user.get());

        var response = new GenericResponse<>(true, 200, user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
