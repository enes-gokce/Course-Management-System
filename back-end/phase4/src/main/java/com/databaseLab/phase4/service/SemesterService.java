package com.databaseLab.phase4.service;

import com.databaseLab.phase4.entity.Semester;
import com.databaseLab.phase4.repository.SemesterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SemesterService {

    private final SemesterRepository semesterRepository;

    @Autowired
    public SemesterService(SemesterRepository semesterRepository) {
        this.semesterRepository = semesterRepository;
    }

    public List<Semester> getSemestersOfStudent(int student_id){
        return semesterRepository.findSemestersOfStudent(student_id);
    }
}
