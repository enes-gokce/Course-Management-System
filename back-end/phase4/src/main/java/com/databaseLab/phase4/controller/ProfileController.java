package com.databaseLab.phase4.controller;

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

    @PutMapping("/upload/{profile_id}")
    public void uploadProfilePicture(@PathVariable int profile_id, @RequestPart("file") MultipartFile file) throws IOException {
        profileService.uploadProfilePicture(profile_id, file);
    }

    @PutMapping("/update/{profile_id}")
    public void updateVal(@PathVariable int profile_id, @RequestPart("value") String value_to_change, String value) throws IOException {
        profileService.updateVal(profile_id, value_to_change, value);
    }

    @GetMapping("/picture/{profileId}")
    public ResponseEntity<byte[]> getProfilePicture(@PathVariable int profileId) {
        byte[] pictureData = profileService.getPictureById(profileId);
        System.out.println(pictureData);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG);
        return new ResponseEntity<>(pictureData, headers, HttpStatus.OK);
    }
}
