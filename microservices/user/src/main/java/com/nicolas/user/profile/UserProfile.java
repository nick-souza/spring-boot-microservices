package com.nicolas.user.profile;

import com.nicolas.user.dto.AddUserDTO;
import com.nicolas.user.dto.UpdateUserAdminDTO;
import com.nicolas.user.dto.UpdateUserDTO;
import com.nicolas.user.dto.UserDTO;
import com.nicolas.user.model.User;
import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfile {
    private final ModelMapper modelMapper;

    @Autowired
    public UserProfile() {
        this.modelMapper = new ModelMapper();
    }

    // Return:
    public TypeMap<User, UserDTO> toUserDTO() {
        return modelMapper.typeMap(User.class, UserDTO.class).addMappings(mapper -> {
            mapper.map(User::getId, UserDTO::setId);
            mapper.map(User::getName, UserDTO::setName);
            mapper.map(User::getLastName, UserDTO::setLastName);
            mapper.map(User::getEmail, UserDTO::setEmail);
            mapper.map(User::getStatus, UserDTO::setStatus);
            mapper.map(User::getRole, UserDTO::setRole);
            mapper.map(User::getCreatedAt, UserDTO::setCreationDate);
            mapper.map(User::getLastUpdateAt, UserDTO::setLastUpdate);
        });
    }

    // Add user:
    public TypeMap<AddUserDTO, User> addToUser() {
        return modelMapper.typeMap(AddUserDTO.class, User.class).addMappings(mapper -> {
            mapper.map(AddUserDTO::getName, User::setName);
            mapper.map(AddUserDTO::getLastName, User::setLastName);
            mapper.map(AddUserDTO::getEmail, User::setEmail);
        });
    }

    // Update user:
    public TypeMap<UpdateUserDTO, User> updateToUser() {
        // Ignorando propriedades nulas, para atualizar apenas os campos que vierem da requisição:
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());

        return modelMapper.typeMap(UpdateUserDTO.class, User.class).addMappings(mapper -> {
            mapper.map(UpdateUserDTO::getName, User::setName);
            mapper.map(UpdateUserDTO::getLastName, User::setLastName);
            mapper.map(UpdateUserDTO::getEmail, User::setEmail);
        });
    }

    // Admin Update user:
    public TypeMap<UpdateUserAdminDTO, User> updateAdminToUser() {
        // Ignorando propriedades nulas, para atualizar apenas os campos que vierem da requisição:
        modelMapper.getConfiguration().setPropertyCondition(Conditions.isNotNull());

        return modelMapper.typeMap(UpdateUserAdminDTO.class, User.class).addMappings(mapper -> {
            mapper.map(UpdateUserAdminDTO::getStatus, User::setStatus);
            mapper.map(UpdateUserAdminDTO::getRole, User::setRole);
        });
    }
}
