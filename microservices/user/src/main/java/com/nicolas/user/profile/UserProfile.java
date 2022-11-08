package com.nicolas.user.profile;

import com.nicolas.user.dto.AddUserDTO;
import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.model.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfile {
    private final ModelMapper modelMapper;

    @Autowired
    public UserProfile(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public TypeMap<User, UserDTO> toUserDTO() {
        return modelMapper.typeMap(User.class, UserDTO.class).addMappings(mapper -> {
            mapper.map(User::getId, UserDTO::setId);
            mapper.map(User::getName, UserDTO::setName);
            mapper.map(User::getBirthDate, UserDTO::setDateOfBirth);
        });
    }

    public TypeMap<AddUserDTO, User> toUser() {
        return modelMapper.typeMap(AddUserDTO.class, User.class).addMappings(mapper -> {
            mapper.map(AddUserDTO::getName, User::setName);
            mapper.map(AddUserDTO::getDateOfBirth, User::setBirthDate);
        });
    }
}
