package com.databaseLab.phase4.service;

import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.repository.AdvisorRepository;
import com.databaseLab.phase4.repository.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final AdvisorRepository advisorRepository;

    @Autowired
    public ProfileService(ProfileRepository profileRepository, AdvisorRepository advisorRepository) {
        this.profileRepository = profileRepository;
        this.advisorRepository = advisorRepository;
    }

    public Profile getProfileById(int profile_id){
        return profileRepository.findProfileById(profile_id);
    }

    public Profile getAdvisorProfileByStudentId(int student_id){
        return getProfileById(advisorRepository.getAdvisorIdByStudentId(student_id));
    }
}


