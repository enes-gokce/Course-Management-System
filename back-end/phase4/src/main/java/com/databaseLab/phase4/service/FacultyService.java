package com.databaseLab.phase4.service;

import com.databaseLab.phase4.entity.Faculty;
import com.databaseLab.phase4.repository.FacultyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FacultyService {

    private final FacultyRepository facultyRepository;

    @Autowired
    public FacultyService(FacultyRepository facultyRepository) {
        this.facultyRepository = facultyRepository;
    }

    public List<Faculty> getAllFaculties(){
        List<Faculty> allFaculties = facultyRepository.findAll();
        for(Faculty faculty : allFaculties){
            System.out.println(faculty.getFaculty_id() + " " + faculty.getFaculty_name());
        }
        return allFaculties;
    }

    public Faculty getFacultyById(int faculty_id){
        return facultyRepository.findFacultyById(faculty_id);
    }

    public void insertFaculty(Faculty faculty){
        facultyRepository.insertFaculty(faculty.getFaculty_name());
    }

    public void updateFaculty(Faculty faculty){
        facultyRepository.updateFaculty(faculty.getFaculty_id(), faculty.getFaculty_name());
    }

    public void deleteFacultyById(int faculty_id){
        facultyRepository.deleteFacultyById(faculty_id);
    }
}
