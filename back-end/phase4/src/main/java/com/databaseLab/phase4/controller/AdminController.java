package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.dto.RegistrationDto;
import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;


    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/get/sections/{department_id}")
    public List<RegisteredSections> getSectionsInDepartment(@PathVariable int department_id){
        return adminService.getSectionsInDepartment(department_id);
    }

    @GetMapping("/get/registrations/{department_id}")
    public List<RegistrationDto> getStudentRegistrations(@PathVariable int department_id){
        return adminService.getStudentRegistrations(department_id);
    }

    @GetMapping("/get/students/profiles/{department_id}")
    public List<Profile> getStudentProfiles(@PathVariable int department_id){
        return adminService.getStudentProfiles(department_id);
    }

    @GetMapping("/get/teachers/profiles/{department_id}")
    public List<Profile> getTeacherProfiles(@PathVariable int department_id){
        return adminService.getTeacherProfiles(department_id);
    }
}
