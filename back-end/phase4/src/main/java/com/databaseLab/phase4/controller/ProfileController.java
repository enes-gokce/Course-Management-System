package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.dto.EmailPhoneDto;
import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.entity.User;
import com.databaseLab.phase4.service.ProfileService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

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

    @GetMapping("/advisor/{teacher_id}/students")
    public List<Profile> getAdvisingStudentsProfiles(@PathVariable int teacher_id){
        return profileService.getAdvisingStudentsProfiles(teacher_id);
    }

    @PutMapping("/upload/{profile_id}")
    public void uploadProfilePicture(@PathVariable int profile_id, @RequestPart("file") MultipartFile file) throws IOException {
        profileService.uploadProfilePicture(profile_id, file);
    }

    @GetMapping("/picture/{profileId}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable int profileId) {
        byte[] pictureData = profileService.getPictureById(profileId);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(pictureData, headers, HttpStatus.OK);
    }

    @PutMapping("/update/{profile_id}")
    public void updateProfile(@PathVariable int profile_id, @RequestBody EmailPhoneDto emailPhoneDto){
        profileService.updateProfileInDatabase(profile_id, emailPhoneDto);
    }
}
