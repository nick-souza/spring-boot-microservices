package com.nicolas.room.profile;

import com.nicolas.room.dto.AddRoomDTO;
import com.nicolas.room.dto.RoomDTO;
import com.nicolas.room.model.Room;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomProfile {
    private final ModelMapper modelMapper;

    @Autowired
    public RoomProfile(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public TypeMap<Room, RoomDTO> toRoomDTO() {
        return modelMapper.typeMap(Room.class, RoomDTO.class).addMappings(mapper -> {
            mapper.map(Room::getId, RoomDTO::setId);
            mapper.map(Room::getName, RoomDTO::setName);
            mapper.map(Room::getSize, RoomDTO::setSize);
        });
    }

    public TypeMap<AddRoomDTO, Room> toRoom() {
        return modelMapper.typeMap(AddRoomDTO.class, Room.class).addMappings(mapper -> {
            mapper.map(AddRoomDTO::getName, Room::setName);
            mapper.map(AddRoomDTO::getSize, Room::setSize);
        });
    }
}
