package com.nicolas.schedule.profile;

import com.nicolas.schedule.dto.AddScheduleDTO;
import com.nicolas.schedule.dto.ScheduleDTO;
import com.nicolas.schedule.model.Schedule;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class ScheduleProfile {
    private final ModelMapper modelMapper;

    public ScheduleProfile() {
        modelMapper =  new ModelMapper();
    }

    public TypeMap<Schedule, ScheduleDTO> toScheduleDTO() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper.typeMap(Schedule.class, ScheduleDTO.class).addMappings(mapper -> {
            mapper.map(Schedule::getId, ScheduleDTO::setId);
            mapper.map(Schedule::getRoomId, ScheduleDTO::setRoomId);
            mapper.map(Schedule::getResponsibleId, ScheduleDTO::setResponsibleId);
            mapper.map(Schedule::getBookingStart, ScheduleDTO::setBookingStart);
            mapper.map(Schedule::getBookingEnd, ScheduleDTO::setBookingEnd);
        });
    }

    public TypeMap<AddScheduleDTO, Schedule> toSchedule() {
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

        return modelMapper.typeMap(AddScheduleDTO.class, Schedule.class).addMappings(mapper -> {
            mapper.map(AddScheduleDTO::getRoomId, Schedule::setRoomId);
            mapper.map(AddScheduleDTO::getResponsibleId, Schedule::setResponsibleId);
            mapper.map(AddScheduleDTO::getBookingStart, Schedule::setBookingStart);
            mapper.map(AddScheduleDTO::getBookingEnd, Schedule::setBookingEnd);
        });
    }
}
