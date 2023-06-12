package com.databaseLab.phase4.service;

import com.databaseLab.phase4.dto.GradesDto;
import com.databaseLab.phase4.dto.GradesStatsDto;
import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.entity.Student;
import com.databaseLab.phase4.repository.CourseRepository;
import com.databaseLab.phase4.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeacherService {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    @Autowired
    public TeacherService(CourseRepository courseRepository, StudentRepository studentRepository) {
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    public List<RegisteredSections> getSectionsByTeacherId(int teacher_id){
        return courseRepository.findSectionsByTeacherId(teacher_id);
    }

    public List<Student> getStudentsBySectionId(int section_id){
        return studentRepository.findStudentsBySectionId(section_id);
    }

    public void enterGrade(GradesDto gradesDto){
        courseRepository.updateGradesByGradesDto(gradesDto);
    }

    public GradesStatsDto getSectionGradeStats(int section_id){
        return courseRepository.findSectionGradesStats(section_id);
    }
}
