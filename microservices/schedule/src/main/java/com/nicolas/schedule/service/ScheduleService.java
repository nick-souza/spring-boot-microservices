package com.nicolas.schedule.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.nicolas.schedule.dto.*;
import com.nicolas.schedule.model.Schedule;
import com.nicolas.schedule.profile.ScheduleProfile;
import com.nicolas.schedule.repository.ScheduleRepository;
import com.nicolas.schedule.utils.GenericResponse;
import com.nicolas.schedule.exception.BadRequestException;
import com.nicolas.schedule.exception.RecordNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.*;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class ScheduleService {
    protected final String USER_URI = "http://USER/user/";
    protected final String ROOM_URI = "http://ROOM/room/";
    protected final Integer DAY_STARTS_AT = 8;
    protected final Integer DAY_ENDS_AT = 18;

    private final ScheduleRepository scheduleRepository;
    private final ScheduleProfile scheduleProfile;
    private final RestTemplate restTemplate;

    public ResponseEntity<GenericResponse<List<ScheduleDTO>>> findAll() {
        var schedules = scheduleRepository.findAll().stream().map(schedule -> {
            var _schedule = scheduleProfile.toScheduleDTO().map(schedule);

            _schedule.setResponsible(getUserDTO(_schedule.getResponsibleId()).getName());
            _schedule.setRoom(getRoomDTO(_schedule.getRoomId()).getName());

            return _schedule;
        }).collect(Collectors.toList());

        if (schedules.isEmpty())
            throw new RecordNotFoundException("No schedule found");

        var response = new GenericResponse<>(true, 200, schedules);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<ScheduleDTO>> findScheduleById(Long id) {
        var _schedule = scheduleRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("Schedule not found"));

        var schedule = scheduleProfile.toScheduleDTO().map(_schedule);

        schedule.setResponsible(getUserDTO(_schedule.getResponsibleId()).getName());
        schedule.setRoom(getRoomDTO(_schedule.getRoomId()).getName());

        var response = new GenericResponse<>(true, 200, schedule);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<List<ScheduleDTO>>> findSchedulesByRoom(Long roomId) {
        var scheduleList = scheduleRepository.findByRoomIdOrderByBookingStart(roomId).orElseThrow(() -> new RecordNotFoundException("No schedule found"))
        .stream().map(schedule -> {
            var _schedule = scheduleProfile.toScheduleDTO().map(schedule);

            _schedule.setResponsible(getUserDTO(_schedule.getResponsibleId()).getName());
            _schedule.setRoom(getRoomDTO(_schedule.getRoomId()).getName());

            return _schedule;
        }).collect(Collectors.toList());;

        var response = new GenericResponse<>(true, 200, scheduleList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<GenericResponse<List<ScheduleDTO>>> findSchedulesByResponsible(Long responsibleId) {
        var scheduleList = scheduleRepository.findByResponsibleIdOrderByBookingStart(responsibleId).orElseThrow(() -> new RecordNotFoundException("No schedule found"))
        .stream().map(schedule -> {
            var _schedule = scheduleProfile.toScheduleDTO().map(schedule);

            _schedule.setResponsible(getUserDTO(_schedule.getResponsibleId()).getName());
            _schedule.setRoom(getRoomDTO(_schedule.getRoomId()).getName());

            return _schedule;
        }).collect(Collectors.toList());

        var response = new GenericResponse<>(true, 200, scheduleList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    public ResponseEntity<HttpStatus> deleteSchedule(Long id) {
        if (id < 0)
            throw new BadRequestException("Invalid id");

        var _schedule = scheduleRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("Schedule not found"));

        scheduleRepository.delete(_schedule);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    public ResponseEntity<GenericResponse<ScheduleDTO>> addSchedule(AddScheduleDTO model) {
        try {
            if (model == null)
                throw new BadRequestException("Invalid body");

            // Validations:
            validateUser(model.getResponsibleId());
            validateRoom(model.getRoomId());
            validateAppointmentHours(model.getBookingStart(), model.getBookingEnd());
            validateConflicts(model.getRoomId(), model.getBookingStart(), model.getBookingEnd());

            var _schedule = scheduleProfile.toSchedule().map(model);

            _schedule.setCreatedAt(LocalDateTime.now());
            _schedule.setLastUpdateAt(LocalDateTime.now());

            scheduleRepository.save(_schedule);

            var schedule = toScheduleDTO(_schedule);

            var response = new GenericResponse<>(true, 201, schedule);

            return new ResponseEntity<>(response, HttpStatus.CREATED);
        } catch (DateTimeParseException ex) {
            throw new BadRequestException(String.format("The field '%s' is not a valid date", ex.getParsedString()));
        } catch (Exception ex) {
            return new ResponseEntity<>(new GenericResponse<>(500, ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public ResponseEntity<GenericResponse<ScheduleDTO>> updateSchedule(Long id, UpdateScheduleDTO model) {
        try {
            if (model == null)
                throw new BadRequestException("Invalid body");

            if (!model.getScheduleId().equals(id))
                throw new BadRequestException("Route and DTO identifiers do not match");

            var _schedule = scheduleRepository.findById(id).orElseThrow(() -> new RecordNotFoundException("Schedule not found"));

            if (model.getBookingStart() != null && model.getBookingEnd() != null) {
                var start = model.getBookingStart();
                var end = model.getBookingEnd();
                validateAppointmentHours(start, end);
            } else if (model.getBookingStart() != null){
                var start = model.getBookingStart();
                validateAppointmentHours(start, _schedule.getBookingEnd());
            } else if (model.getBookingEnd() != null){
                var end = model.getBookingEnd();
                validateAppointmentHours(_schedule.getBookingStart(), end);
            }

            scheduleProfile.updateToSchedule().map(model, _schedule);

            _schedule.setLastUpdateAt(LocalDateTime.now());

            scheduleRepository.save(_schedule);

            var schedule = toScheduleDTO(_schedule);

            var response = new GenericResponse<>(true, 200, schedule);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (DateTimeParseException ex) {
            throw new BadRequestException(String.format("The field '%s' is not a valid date", ex.getParsedString()));
        } catch (Exception ex) {
            return new ResponseEntity<>(new GenericResponse<>(500, ex.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private void validateConflicts(Long roomId, LocalDateTime bookingStart, LocalDateTime bookingEnd) {
        var _schedule = scheduleRepository
                .findByRoomIdAndBookingStartAndBookingEnd(roomId, bookingStart, bookingEnd);

        if (_schedule.isPresent())
            throw new BadRequestException("The room is not available at that time");
    }

    private void validateAppointmentHours(LocalDateTime start, LocalDateTime end) {
        // Verificando se é hora cheia:
        if (start.getMinute() != 0 || end.getMinute() != 0)
            throw new BadRequestException("Appointments must be made on full hours"); // TODO: Check translation

        // Verificando se tem uma hora de duração, pela diferença das datas:
        var appointmentDuration = Duration.between(start, end).toSeconds();

        if (appointmentDuration != 3600)
            throw new BadRequestException("Appointments must be one hour long only");

        // Verificando se a hora está entre o horário comercial:
        var startTime = start.toLocalTime();

        if (!startTime.isAfter(LocalTime.of(DAY_STARTS_AT, 0)) || !startTime.isBefore(LocalTime.of(DAY_ENDS_AT, 0)))
            throw new BadRequestException("Appointments must be done during business hours");

        // Verificando se o dia não cai em um final de semana:
        if ((start.getDayOfWeek() == DayOfWeek.SATURDAY || start.getDayOfWeek() == DayOfWeek.SUNDAY)
                || (end.getDayOfWeek() == DayOfWeek.SATURDAY || end.getDayOfWeek() == DayOfWeek.SUNDAY))
            throw new BadRequestException("Appointments must be on valid week days");

        // Verificando se a data ja passou:
        if (start.toLocalDate().isBefore(LocalDate.now()))
            throw new BadRequestException("Appointments can't be schedule on dates that already passed");
    }

    private void validateUser(Long id) {
        // Em caso de erro (ex: 404), uma Exception will be thrown:
        restTemplate.getForObject(USER_URI + "{responsibleId}", GenericResponse.class, id);
    }

    private void validateRoom(Long id) {
        restTemplate.getForObject(ROOM_URI + "{roomId}", GenericResponse.class, id);
    }

    private UserDTO getUserDTO(Long id) {
        try {
            // Usando o Jackson para conversão:
            var mapper = new ObjectMapper();

            // Chamando a aplicação USER para pegar o objeto pelo Id:
            var userObj = restTemplate.getForObject(USER_URI + "{responsibleId}", GenericResponse.class, id).getData();

            // Convertendo para JSON String:
            String jsonStr = mapper.writeValueAsString(userObj);

            // Convertendo para o DTO:
            return mapper.readValue(jsonStr, UserDTO.class);
        } catch (JsonProcessingException ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    private RoomDTO getRoomDTO(Long id) {
        try {
            var mapper = new ObjectMapper();

            var userObj = restTemplate.getForObject(ROOM_URI + "{roomId}", GenericResponse.class, id).getData();

            String jsonStr = mapper.writeValueAsString(userObj);

            return mapper.readValue(jsonStr, RoomDTO.class);
        } catch (JsonProcessingException ex) {
            throw new BadRequestException(ex.getMessage());
        }
    }

    private ScheduleDTO toScheduleDTO(Schedule schedule) {
        var roomName = getRoomDTO(schedule.getRoomId()).getName();
        var responsibleName = getUserDTO(schedule.getResponsibleId()).getName();

        var scheduleDTO = scheduleProfile.toScheduleDTO().map(schedule);

        scheduleDTO.setResponsible(responsibleName);
        scheduleDTO.setRoom(roomName);

        return scheduleDTO;
    }
}
