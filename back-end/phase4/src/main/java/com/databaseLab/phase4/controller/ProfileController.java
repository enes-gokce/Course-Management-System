package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.entity.User;
import com.databaseLab.phase4.service.ProfileService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/profile")
public class ProfileController {

    private final ProfileService profileService;

    public ProfileController(ProfileService profileService) {
        this.profileService = profileService;
    }

    @GetMapping("/{profile_id}")
    public Profile getProfileById(@PathVariable int profile_id){
        return profileService.getProfileById(profile_id);
    }

    @GetMapping("/advisor/{student_id}")
    public Profile getAdvisorByStudentId(@PathVariable int student_id){
        return profileService.getAdvisorProfileByStudentId(student_id);
    }
}
