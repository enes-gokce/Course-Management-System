package com.databaseLab.phase4.service;

import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    public List<RegisteredSections> getRegisteredSections(int user_id){
        System.out.println(courseRepository.findRegisteredSections(user_id));
        return courseRepository.findRegisteredSections(user_id);
    }
}
