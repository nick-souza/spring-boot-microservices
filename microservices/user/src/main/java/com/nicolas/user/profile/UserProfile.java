package com.nicolas.user.profile;

import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.model.User;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfile {

    @Autowired
    private ModelMapper modelMapper;

    public TypeMap<User, UserDTO> toUser() {
        return modelMapper.typeMap(User.class, UserDTO.class).addMappings(mapper -> {
            mapper.map(User::getName, UserDTO::setName);
            mapper.map(User::getBirthDate, UserDTO::setDateOfBirth);
        });
    }
}
