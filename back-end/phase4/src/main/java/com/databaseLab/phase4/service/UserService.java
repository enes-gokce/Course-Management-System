package com.databaseLab.phase4.service;

import com.databaseLab.phase4.config.JwtUtil;
import com.databaseLab.phase4.dto.AuthDto;
import com.databaseLab.phase4.dto.JwtDto;
import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.entity.User;
import com.databaseLab.phase4.repository.AdvisorRepository;
import com.databaseLab.phase4.repository.ProfileRepository;
import com.databaseLab.phase4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final ProfileRepository profileRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, ProfileRepository profileRepository, AdvisorRepository advisorRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
    }

    public User getUserById(int user_id){
        System.out.println(user_id);
        return userRepository.findUserByUserId(user_id);
    }

    public User getUserByEmail(String email){
        Profile profile = profileRepository.findProfileByEmail(email);
        return userRepository.findUserByProfileId(profile.getProfile_id());
    }

    public String getRoleOfUser(int user_id){
        return userRepository.findRoleOfUser(user_id);
    }

    public void encodeAllPasswords(){
        List<User> allUsers = userRepository.findAllUsers();
        for(User user : allUsers) {
            String password = passwordEncoder.encode(user.getPassword());
            userRepository.updateUser(user.getUser_id(), user.getDept_id(), password, user.getProfile_id());
        }
    }

    public JwtDto login(AuthDto authDto) throws Exception {

        try {
            System.out.println("entered");
            Profile profile = profileRepository.findProfileByEmail(authDto.getEmail());
            User user = userRepository.findUserByProfileId(profile.getProfile_id());
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUser_id(), authDto.getPassword()));
            System.out.println("success");
            String token = jwtUtil.generateToken(String.valueOf(user.getUser_id()));
            JwtDto jwtDto = new JwtDto();
            jwtDto.setToken(token);
            return jwtDto;
        } catch (Exception e) {
            JwtDto jwtDto = new JwtDto();
            jwtDto.setToken("null");
            return jwtDto;
        }
    }
}
