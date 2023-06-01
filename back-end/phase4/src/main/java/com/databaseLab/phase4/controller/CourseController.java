package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.service.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/course")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    @GetMapping("/registeredSections/{user_id}")
    public List<RegisteredSections> getRegisteredSections(@PathVariable int user_id){
        return courseService.getRegisteredSections(user_id);
    }
}
