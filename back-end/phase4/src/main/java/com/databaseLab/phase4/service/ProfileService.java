package com.databaseLab.phase4.service;

import com.databaseLab.phase4.dto.EmailPhoneDto;
import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.repository.AdvisorRepository;
import com.databaseLab.phase4.repository.ProfileRepository;
import com.databaseLab.phase4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final AdvisorRepository advisorRepository;
    private final UserRepository userRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository, AdvisorRepository advisorRepository, UserRepository userRepository) {
        this.profileRepository = profileRepository;
        this.advisorRepository = advisorRepository;
        this.userRepository = userRepository;
    }

    public Profile getProfileById(int profile_id){
        return profileRepository.findProfileByProfileId(profile_id);
    }

    public Profile getAdvisorProfileByStudentId(int student_id){
        return getProfileById(advisorRepository.getAdvisorIdByStudentId(student_id));
    }

    public List<Profile> getAdvisingStudentsProfiles(int teacher_id){
        List<Integer> student_ids = advisorRepository.findAdvisingStudentsByAdvisorId(teacher_id);
        List<Profile> student_profiles = new ArrayList<>();
        for(Integer student_id : student_ids){
            student_profiles.add(profileRepository.findProfileByProfileId(userRepository.findProfileIdByUserId(student_id)));
        }
        return student_profiles;
    }

    public void uploadProfilePicture(int profile_id, MultipartFile file) throws IOException {
        profileRepository.uploadPicture(profile_id, file.getBytes());
    }

    public byte[] getPictureById(int profile_id){
        return profileRepository.findPictureById(profile_id);
    }

    public void updatePassword(int profile_id, String new_password) throws IOException {
        profileRepository.updatePassword(profile_id, new_password);
    }

    public void updateProfileInDatabase(int profile_id, EmailPhoneDto updatedData) {
        Profile profile = profileRepository.findProfileByProfileId(profile_id);
        if (profile != null) {
            // Update the profile data with the updated values
            if (updatedData.getEmail() != null) {
                profile.setEmail(updatedData.getEmail());
            }
            if (updatedData.getPhone_number() != null) {
                profile.setPhone_number(updatedData.getPhone_number());
            }

            // Update the profile in the database
            profileRepository.updateChanged(profile_id, "email", profile.getEmail());
            profileRepository.updateChanged(profile_id, "phone_number", profile.getPhone_number());
        }
    }
}


