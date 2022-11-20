package com.nicolas.user.service;

import com.nicolas.user.dto.*;
import com.nicolas.user.model.Enums.Role;
import com.nicolas.user.model.Enums.Status;
import com.nicolas.user.model.User;
import com.nicolas.user.profile.UserProfile;
import com.nicolas.user.repository.UserRepository;
import com.nicolas.user.utils.GenericResponse;
import com.nicolas.user.utils.exception.BadRequestException;
import com.nicolas.user.utils.exception.RecordNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserProfile userProfile;


    public ResponseEntity<GenericResponse<List<UserDTO>>> findAllActiveUsers() {
        var users = userRepository.findAllByStatusOrderById(Status.Active).stream().map(user -> userProfile.toUserDTO().map(user)).collect(Collectors.toList());

        if (users.isEmpty())
            throw new RecordNotFoundException("No user found");

        var response = new GenericResponse<>(true, 200, users);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<User>> findUserByEmail(String email) {
        var _user = userRepository.findByEmail(email).orElseThrow(() -> new RecordNotFoundException("User not found"));

//        var logInDTO = new LogInResponseDTO();
//
//        logInDTO.setEmail(_user.getEmail());
//        logInDTO.setId(_user.getId());
//        logInDTO.setToken(null); // Token será criado pelo AuthenticationService;

        var response = new GenericResponse<>(true, 200, _user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse> findUserByEmailOptional(String email) {
        var _user = userRepository.findByEmail(email);

//        GenericResponse response;
//        if (_user.isPresent()){
//            var user = userProfile.toUserDTO().map(_user.get());
//            response = new GenericResponse<>(true, 200, user);
//        } else {
//            response = new GenericResponse<>(true, 200, _user);
//        }

       var response = new GenericResponse<>(true, 200, _user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<UserDTO>> findActiveUserById(Long id) {
        var _user = userRepository.findByIdAndStatus(id, Status.Active).orElseThrow(() -> new RecordNotFoundException("User not found"));

        var user = userProfile.toUserDTO().map(_user);

        var response = new GenericResponse<>(true, 200, user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<UserDTO>> addUser(AddUserDTO model) {
        if (model == null)
            throw new BadRequestException("Invalid body");

        if (!emailCheck(model.getEmail()))
            throw new BadRequestException("Email already taken");

        var _user = userProfile.addToUser().map(model);

        _user.setCreatedAt(LocalDateTime.now());
        _user.setLastUpdateAt(LocalDateTime.now());
        _user.setRole(Role.User);

        // TODO: Send email verification here before setting the status to active:
        _user.setStatus(Status.Active);

        userRepository.save(_user);

        var user = userProfile.toUserDTO().map(_user);

        var response = new GenericResponse<>(true, 201, user);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<GenericResponse<UserDTO>> updateUser(Long id, UpdateUserDTO model) {
        if (model == null)
            throw new BadRequestException("Invalid body");

        if (!model.getId().equals(id))
            throw new BadRequestException("Route and DTO identifiers do not match");

        var _user = userRepository.findByIdAndStatus(id, Status.Active).orElseThrow(() -> new RecordNotFoundException("User not found"));

        if (model.getEmail() != null && !emailCheck(model.getEmail()))
            throw new BadRequestException("Email already taken");

        userProfile.updateToUser().map(model, _user);

        _user.setLastUpdateAt(LocalDateTime.now());

        userRepository.save(_user);

        var user = userProfile.toUserDTO().map(_user);

        var response = new GenericResponse<>(true, 200, user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<HttpStatus> deleteUser(Long id) {
        if (id < 0)
            throw new BadRequestException("Invalid id");

        var _user = userRepository.findByIdAndStatus(id, Status.Active).orElseThrow(() -> new RecordNotFoundException("User not found"));

        _user.setStatus(Status.Deleted);
        _user.setLastUpdateAt(LocalDateTime.now());

        userRepository.save(_user);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // TODO: Method to update status and role, needing admin role:
    public ResponseEntity<GenericResponse<UserDTO>> updateUserAdmin(Long id, UpdateUserAdminDTO model) {
        if (!model.getId().equals(id))
            throw new BadRequestException("Route and DTO identifiers do not match");

        var _user = userRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("User not found"));

        userProfile.updateAdminToUser().map(model, _user);

        _user.setLastUpdateAt(LocalDateTime.now());

        userRepository.save(_user);

        var user = userProfile.toUserDTO().map(_user);

        var response = new GenericResponse<>(true, 200, user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // TODO: Method to reset the password:
    private boolean emailCheck(String email) {
        var user = userRepository.findByEmail(email);
        return user.isEmpty();
    }
}
