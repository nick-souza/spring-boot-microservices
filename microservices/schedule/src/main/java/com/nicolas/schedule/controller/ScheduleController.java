package com.nicolas.schedule.controller;

import com.nicolas.schedule.dto.AddScheduleDTO;
import com.nicolas.schedule.dto.ScheduleDTO;
import com.nicolas.schedule.dto.UpdateScheduleDTO;
import com.nicolas.schedule.service.ScheduleService;
import com.nicolas.schedule.utils.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/schedule/")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("")
    public ResponseEntity<GenericResponse<List<ScheduleDTO>>> findAll() {
        return scheduleService.findAll();
    }

    @GetMapping("{id}")
    public ResponseEntity<GenericResponse<ScheduleDTO>> findScheduleById(@PathVariable Long id) {
        return scheduleService.findScheduleById(id);
    }

    @PostMapping("add/")
    public ResponseEntity<GenericResponse<ScheduleDTO>> addSchedule(@RequestBody @Valid AddScheduleDTO model) {
        return scheduleService.addSchedule(model);
    }

    @GetMapping("room/{roomId}")
    public ResponseEntity<GenericResponse<List<ScheduleDTO>>> findSchedulesByRoom(@PathVariable Long roomId) {
        return scheduleService.findSchedulesByRoom(roomId);
    }

    @GetMapping("user/{responsibleId}")
    public ResponseEntity<GenericResponse<List<ScheduleDTO>>> findSchedulesByResponsible(@PathVariable Long responsibleId) {
        return scheduleService.findSchedulesByResponsible(responsibleId);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<HttpStatus> deleteSchedule(@PathVariable Long id) {
        return scheduleService.deleteSchedule(id);
    }

    @PutMapping("{id}")
    public ResponseEntity<GenericResponse<ScheduleDTO>> updateSchedule(@PathVariable Long id, @RequestBody @Valid UpdateScheduleDTO model) {
        return scheduleService.updateSchedule(id, model);
    }
}
