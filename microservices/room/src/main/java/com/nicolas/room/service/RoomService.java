package com.nicolas.room.service;

import com.nicolas.room.dto.AddRoomDTO;
import com.nicolas.room.dto.RoomDTO;
import com.nicolas.room.profile.RoomProfile;
import com.nicolas.room.repository.RoomRepository;
import com.nicolas.room.utils.GenericResponse;
import com.nicolas.room.utils.exception.BadRequestException;
import com.nicolas.room.utils.exception.RecordNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomProfile roomProfile;

    @Autowired
    public RoomService(RoomRepository roomRepository, RoomProfile roomProfile) {
        this.roomRepository = roomRepository;
        this.roomProfile = roomProfile;
    }

    public ResponseEntity<GenericResponse<RoomDTO>> findRoomById(Long id) {
        var _room = roomRepository.findById(id);

        if (_room.isEmpty())
            throw new RecordNotFoundException("Room not found");

        var room = roomProfile.toRoomDTO().map(_room.get());

        var response = new GenericResponse<>(true, 200, room);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<RoomDTO>> addRoom(AddRoomDTO model) {
        if (model == null)
            throw new BadRequestException("Invalid body");

        var _room = roomProfile.toRoom().map(model);

        _room.setCreatedAt(LocalDateTime.now());
        _room.setLastUpdateAt(LocalDateTime.now());

        roomRepository.save(_room);

        var room = roomProfile.toRoomDTO().map(_room);

        var response = new GenericResponse<>(true, 201, room);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<GenericResponse<List<RoomDTO>>> findAll() {
        var rooms = roomRepository.findAll().stream().map(room -> roomProfile.toRoomDTO().map(room)).collect(Collectors.toList());

        if (rooms.isEmpty())
            throw new RecordNotFoundException("No room found");

        var response = new GenericResponse<>(true, 200, rooms);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
