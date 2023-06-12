package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.dto.GradesDto;
import com.databaseLab.phase4.dto.GradesStatsDto;
import com.databaseLab.phase4.dto.RegistrationDto;
import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.entity.Student;
import com.databaseLab.phase4.service.TeacherService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/teacher")
public class TeacherController {

    private final TeacherService teacherService;

    public TeacherController(TeacherService teacherService) {
        this.teacherService = teacherService;
    }

    @GetMapping ("/get/sections/all/{teacher_id}")
    public List<RegisteredSections> getSectionsByTeacherId(@PathVariable int teacher_id){
        return teacherService.getSectionsByTeacherId(teacher_id);
    }

    @GetMapping ("/get/students/{section_id}")
    public List<Student> getStudentsBySectionId(@PathVariable int section_id){
        return teacherService.getStudentsBySectionId(section_id);
    }

    @PutMapping("/update/grades")
    public void enterGrade(@RequestBody GradesDto gradesDto){
        teacherService.enterGrade(gradesDto);
    }

    @GetMapping("/get/section/grades-stats/{section_id}")
    public GradesStatsDto getSectionGradeStats(@PathVariable int section_id){
        return teacherService.getSectionGradeStats(section_id);
    }

    @GetMapping("/get/registrations/{teacher_id}")
    public List<RegistrationDto> getStudentRegistrationsByAdvisor(@PathVariable int teacher_id){
        return teacherService.getStudentRegistrationsByAdvisor(teacher_id);
    }
}
