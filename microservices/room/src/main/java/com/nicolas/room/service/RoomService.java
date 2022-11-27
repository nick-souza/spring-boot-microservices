package com.nicolas.room.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class RoomService {
    protected final String SCHEDULE_URI = "http://SCHEDULE/schedule/";

    private final RoomRepository roomRepository;
    private final RoomProfile roomProfile;
    private final RestTemplate restTemplate;

    public ResponseEntity<GenericResponse<List<RoomDTO>>> findAll() {
        var rooms = roomRepository.findAllByOrderByIdAsc().stream().map(room -> roomProfile.toRoomDTO().map(room)).collect(Collectors.toList());

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

    public ResponseEntity<GenericResponse> deleteRoom(Long id) {
        if (id < 0)
            throw new BadRequestException("Invalid id");

        var _room = roomRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("Room not found"));

        var hasAppointments = checkAppointments(id);

        if (hasAppointments)
            return new ResponseEntity<>(new GenericResponse<>(200, "Essa sala possui agendamentos. Para excluir, primeiro cancele esses agendamentos"), HttpStatus.OK);

        roomRepository.delete(_room);

        return new ResponseEntity<>(new GenericResponse<>(200, true), HttpStatus.OK);
    }

    private boolean checkAppointments(Long roomId) {
        try {
            ObjectMapper mapper = new ObjectMapper();

            var scheduleResponse = restTemplate.getForObject(SCHEDULE_URI + "room/{roomId}", GenericResponse.class, roomId).getData();

            var jsonStr = mapper.writeValueAsString(scheduleResponse);

            var list = mapper.readValue(jsonStr, new TypeReference<List<Object>>(){});

            return !list.isEmpty();
        } catch (Exception ex) {
            return true;
        }
    }
}
