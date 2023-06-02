package com.databaseLab.phase4.service;

import com.databaseLab.phase4.dto.BasketStatistics;
import com.databaseLab.phase4.entity.Course;
import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.repository.CourseRepository;
import com.databaseLab.phase4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;
    private final UserRepository userRepository;

    @Autowired
    public CourseService(CourseRepository courseRepository, UserRepository userRepository) {
        this.courseRepository = courseRepository;
        this.userRepository = userRepository;
    }

    public List<RegisteredSections> getRegisteredSections(int user_id){
        System.out.println(courseRepository.findRegisteredSections(user_id));
        return courseRepository.findRegisteredSections(user_id);
    }

    public List<Course> getCurrentSemesterCourses(int year){
        return courseRepository.findCurrentSemesterCourses(year);
    }

    public List<Course> getAddedSectionsInBasket(int user_id){
        int basket_id = userRepository.findBasketIdOfStudent(user_id);
        return courseRepository.findAddedSectionsInBasket(basket_id);
    }

    public void addSectionToBasket(int user_id, int section_id){
        int basket_id = userRepository.findBasketIdOfStudent(user_id);
        courseRepository.insertSectionToBasket(section_id, basket_id);
    }

    public void deleteSectionFromBasket(int user_id, int section_id){
        int basket_id = userRepository.findBasketIdOfStudent(user_id);
        courseRepository.deleteSectionFromBasket(basket_id, section_id);
    }

    public BasketStatistics getBasketStatistics(int user_id){
        int basket_id = userRepository.findBasketIdOfStudent(user_id);
        System.out.println(courseRepository.findBasketStatistics(basket_id).getTotalECTS());
        return courseRepository.findBasketStatistics(basket_id);
    }
}
