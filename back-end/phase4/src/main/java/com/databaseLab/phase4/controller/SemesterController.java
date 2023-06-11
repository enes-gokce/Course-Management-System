package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.entity.Semester;
import com.databaseLab.phase4.service.SemesterService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/semesters")
public class SemesterController {

    private final SemesterService semesterService;

    public SemesterController(SemesterService semesterService) {
        this.semesterService = semesterService;
    }

    @GetMapping("/get/{student_id}")
    public List<Semester> getSemestersOfStudent(@PathVariable int student_id){
        return semesterService.getSemestersOfStudent(student_id);
    }
}
