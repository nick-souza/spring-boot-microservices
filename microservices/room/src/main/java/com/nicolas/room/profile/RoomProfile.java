package com.nicolas.room.profile;

import com.nicolas.room.dto.AddRoomDTO;
import com.nicolas.room.dto.RoomDTO;
import com.nicolas.room.dto.UpdateRoomDTO;
import com.nicolas.room.model.Room;
import org.modelmapper.Conditions;
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

    // Return
    public TypeMap<Room, RoomDTO> toRoomDTO() {
        return modelMapper.typeMap(Room.class, RoomDTO.class).addMappings(mapper -> {
            mapper.map(Room::getId, RoomDTO::setId);
            mapper.map(Room::getName, RoomDTO::setName);
            mapper.map(Room::getCapacity, RoomDTO::setCapacity);
            mapper.map(Room::getCreatedAt, RoomDTO::setCreationDate);
            mapper.map(Room::getLastUpdateAt, RoomDTO::setLastUpdate);
        });
    }

    // Add
    public TypeMap<AddRoomDTO, Room> addToRoom() {
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());
        return modelMapper.typeMap(AddRoomDTO.class, Room.class).addMappings(mapper -> {
            mapper.map(AddRoomDTO::getName, Room::setName);
            mapper.map(AddRoomDTO::getCapacity, Room::setCapacity);
        });
    }

    // Update
    public TypeMap<UpdateRoomDTO, Room> updateToRoom() {
        // Ignorando propriedades nulas, para atualizar apenas os campos que vierem da requisição:
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());

        return modelMapper.typeMap(UpdateRoomDTO.class, Room.class).addMappings(mapper -> {
            mapper.map(UpdateRoomDTO::getName, Room::setName);
            mapper.map(UpdateRoomDTO::getCapacity, Room::setCapacity);
        });
    }
}
