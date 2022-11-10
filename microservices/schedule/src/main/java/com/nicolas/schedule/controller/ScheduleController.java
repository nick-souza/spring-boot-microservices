package com.nicolas.schedule.controller;

import com.nicolas.schedule.dto.AddScheduleDTO;
import com.nicolas.schedule.dto.ScheduleDTO;
import com.nicolas.schedule.service.ScheduleService;
import com.nicolas.schedule.utils.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {
    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<GenericResponse<ScheduleDTO>> findScheduleById(@PathVariable Long id) {
        return scheduleService.findScheduleById(id);
    }

    @GetMapping("/")
    public ResponseEntity<GenericResponse<List<ScheduleDTO>>> findAll() {
        return scheduleService.findAll();
    }

    @PostMapping("/add")
    public ResponseEntity<GenericResponse<ScheduleDTO>> addSchedule(@RequestBody AddScheduleDTO model) {
        return scheduleService.addSchedule(model);
    }
}
