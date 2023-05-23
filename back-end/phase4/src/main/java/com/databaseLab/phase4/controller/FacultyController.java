package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.entity.Faculty;
import com.databaseLab.phase4.service.FacultyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/faculty")
public class FacultyController {

    private final FacultyService facultyService;

    @Autowired
    public FacultyController(FacultyService facultyService) {
        this.facultyService = facultyService;
    }

    @GetMapping("/getAll")
    public List<Faculty> getAllFaculties() {
        return facultyService.getAllFaculties();
    }

    @GetMapping("/get/{faculty_id}")
    public Faculty getFacultyById(@PathVariable Integer faculty_id){
        return facultyService.getFacultyById(faculty_id);
    }

    @PostMapping("/post")
    public void insertFaculty(@RequestBody Faculty faculty){
        facultyService.insertFaculty(faculty);
    }

    @PutMapping("/update")
    public void updateFaculty(@RequestBody Faculty faculty){
        facultyService.updateFaculty(faculty);
    }

    @DeleteMapping("/delete/{faculty_id}")
    public void deleteFacultyById(@PathVariable Integer faculty_id){
        facultyService.deleteFacultyById(faculty_id);
    }
}
