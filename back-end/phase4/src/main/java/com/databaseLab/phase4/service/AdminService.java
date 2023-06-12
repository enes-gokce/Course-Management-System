package com.databaseLab.phase4.service;

import com.databaseLab.phase4.dto.RegistrationDto;
import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final AdminRepository adminRepository;

    @Autowired
    public AdminService(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    public List<RegisteredSections> getSectionsInDepartment(int department_id){
        return adminRepository.findSectionsInDepartment(department_id);
    }

    public List<RegistrationDto> getStudentRegistrations(int department_id){
        return adminRepository.findStudentsRegistrations(department_id);
    }

    public List<Profile> getStudentProfiles(int department_id){
        return adminRepository.findStudentProfiles(department_id);
    }

    public List<Profile> getTeacherProfiles(int department_id){
        return adminRepository.findTeacherProfiles(department_id);
    }
}
