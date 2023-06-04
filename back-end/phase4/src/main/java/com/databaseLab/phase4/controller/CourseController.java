package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.dto.BasketStatisticsDto;
import com.databaseLab.phase4.dto.StatusDto;
import com.databaseLab.phase4.entity.Course;
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

    @GetMapping("/get/registeredSections/{user_id}")
    public List<RegisteredSections> getRegisteredSections(@PathVariable int user_id){
        return courseService.getRegisteredSections(user_id);
    }

    @GetMapping("/get/currentSemesterCourses/{year}")
    public List<Course> getCurrentSemesterSections(@PathVariable int year){
        return courseService.getCurrentSemesterCourses(year);
    }

    @GetMapping("/basket/get/addedSectionsInBasket/{user_id}")
    public List<Course> getAddedSectionsInBasket(@PathVariable int user_id){
        return courseService.getAddedSectionsInBasket(user_id);
    }

    @GetMapping("/basket/get/basketStatistics/{user_id}")
    public BasketStatisticsDto getBasketStatistics(@PathVariable int user_id){
        return courseService.getBasketStatistics(user_id);
    }

    @GetMapping("/basket/get/registrationStatus/{user_id}")
    public StatusDto getRegistrationStatus(@PathVariable int user_id){
        System.out.println(courseService.getRegistrationStatus(user_id));
        return courseService.getRegistrationStatus(user_id);
    }

    @PostMapping("/basket/post/sectionToBasket/{user_id}/{section_id}")
    public void addSectionToBasket(@PathVariable int user_id, @PathVariable int section_id){
        courseService.addSectionToBasket(user_id, section_id);
    }

    @PutMapping("/basket/update/registrationStatus/{user_id}")
    public void updateRegistrationStatus(@RequestBody StatusDto statusDto, @PathVariable int user_id){
        System.out.println("bura" + statusDto);
        courseService.updateRegistrationStatus(user_id, statusDto);
    }

    @PutMapping("/section/update/quota/{section_id}/{operation}")
    public void updateSectionQuota(@PathVariable int section_id, @PathVariable String operation){
        courseService.updateSectionQuota(section_id, operation);
    }

    @DeleteMapping("/basket/delete/sectionFromBasket/{user_id}/{section_id}")
    public void deleteSectionFromBasket(@PathVariable int user_id, @PathVariable int section_id){
        courseService.deleteSectionFromBasket(user_id, section_id);
    }

}
