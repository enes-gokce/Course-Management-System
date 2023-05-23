package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.entity.Faculty;
import com.databaseLab.phase4.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class FacultyController {

    private final FacultyService facultyService;

    @Autowired
    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping("/getAll")
    public List<Faculty> getAllEntities() {
        return facultyService.getAllFaculties();
    }
}
