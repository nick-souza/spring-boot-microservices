package com.nicolas.room.service;

import com.nicolas.room.dto.AddRoomDTO;
import com.nicolas.room.dto.RoomDTO;
import com.nicolas.room.dto.UpdateRoomDTO;
import com.nicolas.room.profile.RoomProfile;
import com.nicolas.room.repository.RoomRepository;
import com.nicolas.room.utils.GenericResponse;
import com.nicolas.room.exception.BadRequestException;
import com.nicolas.room.exception.RecordNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomService {
    private final RoomRepository roomRepository;
    private final RoomProfile roomProfile;

    public ResponseEntity<GenericResponse<List<RoomDTO>>> findAll() {
        var rooms = roomRepository.findAll().stream().map(room -> roomProfile.toRoomDTO().map(room)).collect(Collectors.toList());

        if (rooms.isEmpty())
            throw new RecordNotFoundException("No room found");

        var response = new GenericResponse<>(true, 200, rooms);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<RoomDTO>> findRoomById(Long id) {
        var _room = roomRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("Room not found"));

        var room = roomProfile.toRoomDTO().map(_room);

        var response = new GenericResponse<>(true, 200, room);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<RoomDTO>> addRoom(AddRoomDTO model) {
        if (model == null)
            throw new BadRequestException("Invalid body");

        var _room = roomProfile.addToRoom().map(model);

        _room.setCreatedAt(LocalDateTime.now());
        _room.setLastUpdateAt(LocalDateTime.now());

        roomRepository.save(_room);

        var room = roomProfile.toRoomDTO().map(_room);

        var response = new GenericResponse<>(true, 201, room);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    public ResponseEntity<GenericResponse<RoomDTO>> updateRoom(Long id, UpdateRoomDTO model){
        if (model == null)
            throw new BadRequestException("Invalid body");

        if (!model.getId().equals(id))
            throw new BadRequestException("Route and DTO identifiers do not match");

        var _room = roomRepository.findById(model.getId()).orElseThrow(() -> new RecordNotFoundException("Room not found"));

        roomProfile.updateToRoom().map(model, _room);

        _room.setLastUpdateAt(LocalDateTime.now());

        roomRepository.save(_room);

        var room = roomProfile.toRoomDTO().map(_room);

        var response = new GenericResponse<>(true, 200, room);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<HttpStatus> deleteRoom(Long id) {
        if (id < 0)
            throw new BadRequestException("Invalid id");

        var _room = roomRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("Room not found"));

        // TODO: Check if the room has any appointments before deleting it:

        roomRepository.delete(_room);

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
