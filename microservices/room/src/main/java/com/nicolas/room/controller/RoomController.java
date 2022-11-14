package com.nicolas.room.controller;

import com.nicolas.room.dto.AddRoomDTO;
import com.nicolas.room.dto.RoomDTO;
import com.nicolas.room.dto.UpdateRoomDTO;
import com.nicolas.room.service.RoomService;
import com.nicolas.room.utils.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.ws.rs.Path;
import java.util.List;

@RestController
@RequestMapping("/room")
public class RoomController {
    private final RoomService roomService;

    @Autowired
    public RoomController(RoomService roomService) {
        this.roomService = roomService;
    }

    @GetMapping("/")
    public ResponseEntity<GenericResponse<List<RoomDTO>>> findAll() {
        return roomService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse<RoomDTO>> findRoomById(@PathVariable Long id) {
        return roomService.findRoomById(id);
    }

    @PostMapping("/add")
    public ResponseEntity<GenericResponse<RoomDTO>> addRoom(@RequestBody AddRoomDTO model) {
        return roomService.addRoom(model);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<GenericResponse<RoomDTO>> updateRoom(@PathVariable Long id, @RequestBody @Valid UpdateRoomDTO model) {
        return roomService.updateRoom(id, model);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteRoom(@PathVariable Long id){
        return roomService.deleteRoom(id);
    }
}
