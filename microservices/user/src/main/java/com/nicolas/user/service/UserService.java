package com.nicolas.user.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nicolas.user.dto.*;
import com.nicolas.user.model.Enums.Role;
import com.nicolas.user.model.Enums.Status;
import com.nicolas.user.model.User;
import com.nicolas.user.profile.UserProfile;
import com.nicolas.user.repository.UserRepository;
import com.nicolas.user.utils.GenericResponse;
import com.nicolas.user.exception.BadRequestException;
import com.nicolas.user.exception.RecordNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class UserService {
    protected final String SCHEDULE_URI = "http://SCHEDULE/schedule/";

    private final UserRepository userRepository;
    private final UserProfile userProfile;
    private final RestTemplate restTemplate;

    public ResponseEntity<GenericResponse<List<UserDTO>>> findAllActiveUsers() {
        var users = userRepository.findAllByStatusOrderById(Status.Active).stream().map(user -> userProfile.toUserDTO().map(user)).collect(Collectors.toList());

        if (users.isEmpty())
            throw new RecordNotFoundException("No user found");

        var response = new GenericResponse<>(true, 200, users);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<User>> findUserByEmail(String email) {
        // Método que em caso de erro retorna o erro;
        var _user = userRepository.findByEmail(email).orElseThrow(() -> new RecordNotFoundException("User not found"));

        return new ResponseEntity<>(new GenericResponse<>(true, 200, _user), HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<UserDTO>> findUserByEmailOptional(String email) {
        // Método que mesmo em caso de erro, retorna null e não retorna o erro;
        var _user = userRepository.findByEmail(email);

        if (_user.isPresent())
            return new ResponseEntity<>(new GenericResponse<>(true, 200, userProfile.toUserDTO().map(_user.get())), HttpStatus.OK);

        return new ResponseEntity<>(new GenericResponse<>(true, 200, null), HttpStatus.OK);
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

        if (emailCheck(model.getEmail()))
            throw new BadRequestException("Email already taken");

        var _user = userProfile.addToUser().map(model);

        _user.setCreatedAt(LocalDateTime.now());
        _user.setLastUpdateAt(LocalDateTime.now());

        // TODO: Add logic to role based authentication:
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

        if (model.getEmail() != null && emailCheck(model.getEmail()))
            throw new BadRequestException("Email already taken");

        userProfile.updateToUser().map(model, _user);

        _user.setLastUpdateAt(LocalDateTime.now());

        userRepository.save(_user);

        var user = userProfile.toUserDTO().map(_user);

        var response = new GenericResponse<>(true, 200, user);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse> deleteUser(Long id) {
        if (id < 0) throw new BadRequestException("Invalid id");

        var _user = userRepository.findByIdAndStatus(id, Status.Active).orElseThrow(() -> new RecordNotFoundException("User not found"));

        var hasAppointments = checkAppointments(id);

        if (hasAppointments)
            return new ResponseEntity<>(new GenericResponse<>(200, "Esse usuário possui agendamentos. Para excluir, primeiro cancele esses agendamentos"), HttpStatus.OK);

        _user.setStatus(Status.Deleted);
        _user.setLastUpdateAt(LocalDateTime.now());

        userRepository.save(_user);

        return new ResponseEntity<>(new GenericResponse<>(200, true), HttpStatus.OK);
    }

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

    private boolean emailCheck(String email) {
        var user = userRepository.findByEmail(email);
        return user.isPresent();
    }

    private boolean checkAppointments(Long userId) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            var scheduleResponse = restTemplate.getForObject(SCHEDULE_URI + "user/{userId}", GenericResponse.class, userId).getData();

            var jsonStr = mapper.writeValueAsString(scheduleResponse);

            var list = mapper.readValue(jsonStr, new TypeReference<List<Object>>(){});

            return !list.isEmpty();
        } catch (Exception ex) {
            return true;
        }
    }
}
