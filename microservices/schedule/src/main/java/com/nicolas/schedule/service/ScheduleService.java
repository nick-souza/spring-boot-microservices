package com.nicolas.schedule.service;

import com.nicolas.schedule.dto.AddScheduleDTO;
import com.nicolas.schedule.dto.ScheduleDTO;
import com.nicolas.schedule.profile.ScheduleProfile;
import com.nicolas.schedule.repository.ScheduleRepository;
import com.nicolas.schedule.utils.GenericResponse;
import com.nicolas.schedule.utils.exception.BadRequestException;
import com.nicolas.schedule.utils.exception.RecordNotFoundException;
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
public class ScheduleService {
    private final ScheduleRepository scheduleRepository;
    private final ScheduleProfile scheduleProfile;
    private final RestTemplate restTemplate;

//    @Autowired
//    public ScheduleService(ScheduleRepository scheduleRepository, ScheduleProfile scheduleProfile, RestTemplateBuilder restTemplateBuilder) {
//        this.scheduleRepository = scheduleRepository;
//        this.scheduleProfile = scheduleProfile;
//        this.restTemplate = restTemplateBuilder.errorHandler(new RestTemplateErrorHandler()).build();
//    }

    public ResponseEntity<GenericResponse<ScheduleDTO>> findScheduleById(Long id) {
        var _schedule = scheduleRepository.findById(id);

        if (_schedule.isEmpty())
            throw new RecordNotFoundException("Schedule not found");

        var schedule = scheduleProfile.toScheduleDTO().map(_schedule.get());

        var response = new GenericResponse<>(true, 200, schedule);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<ScheduleDTO>> addSchedule(AddScheduleDTO model) {
        // TODO: verify if the user and the room exists:
        // TODO: verify that the room is available at that time and place
        // TODO: add how many people will be, then validate using the room size
        // TODO: check if the appointment time is valid (1 hour max, and cant contain minutes)

//        try {
            if (model == null)
                throw new BadRequestException("Invalid body");

            var userResponse = restTemplate.getForObject("http://USER/user/{responsibleId}", GenericResponse.class, model.getResponsibleId());

            var roomResponse = restTemplate.getForObject("http://ROOM/room/{roomId}", GenericResponse.class, model.getRoomId());

            var _schedule = scheduleProfile.toSchedule().map(model);

            _schedule.setCreatedAt(LocalDateTime.now());
            _schedule.setLastUpdateAt(LocalDateTime.now());

            scheduleRepository.save(_schedule);

            var schedule = scheduleProfile.toScheduleDTO().map(_schedule);

            var response = new GenericResponse<>(true, 201, schedule);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
//        } catch (Exception ex) {
//            throw new BadRequestException(ex.getMessage());
//        }
    }

    public ResponseEntity<GenericResponse<List<ScheduleDTO>>> findAll() {
        var schedules = scheduleRepository.findAll().stream().map(schedule -> scheduleProfile.toScheduleDTO().map(schedule)).collect(Collectors.toList());

        if (schedules.isEmpty())
            throw new RecordNotFoundException("No schedule found");

        var response = new GenericResponse<>(true, 200, schedules);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
