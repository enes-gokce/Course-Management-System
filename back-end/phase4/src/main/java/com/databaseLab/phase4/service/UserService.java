package com.databaseLab.phase4.service;

import com.databaseLab.phase4.config.JwtUtil;
import com.databaseLab.phase4.dto.AuthDto;
import com.databaseLab.phase4.dto.JwtDto;
import com.databaseLab.phase4.dto.StudentDto;
import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.entity.User;
import com.databaseLab.phase4.repository.AdvisorRepository;
import com.databaseLab.phase4.repository.ProfileRepository;
import com.databaseLab.phase4.repository.StudentRepository;
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
    private final AdvisorRepository advisorRepository;
    private final StudentRepository studentRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository, ProfileRepository profileRepository, AdvisorRepository advisorRepository, StudentRepository studentRepository) {
        this.userRepository = userRepository;
        this.profileRepository = profileRepository;
        this.advisorRepository = advisorRepository;
        this.studentRepository = studentRepository;
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

    public StudentDto getStudentDetails(int user_id){
        return studentRepository.findStudentDetails(user_id);
    }

    public void encodeAllPasswords(){
        List<User> allUsers = userRepository.findAllUsers();
        for(User user : allUsers) {
            String password = passwordEncoder.encode(user.getPassword());
            userRepository.updateUser(user.getUser_id(), user.getDept_id(), password, user.getProfile_id());
        }
    }

    public JwtDto updatePassword(String current_password, String new_password, int user_id){
        User currentUser = userRepository.findUserByUserId(user_id);
        User tempUser = new User();
        JwtDto jwtDto = new JwtDto();
        if(passwordEncoder.matches(current_password, userRepository.findUserByUserId(user_id).getPassword())){
            tempUser.setUser_id(currentUser.getUser_id());
            tempUser.setDept_id(currentUser.getDept_id());
            tempUser.setPassword(passwordEncoder.encode(new_password));
            tempUser.setProfile_id(currentUser.getProfile_id());
            userRepository.updateUser(tempUser.getUser_id(), tempUser.getDept_id(), tempUser.getPassword(), tempUser.getProfile_id());
            jwtDto.setToken("success");
        }

        else{
            jwtDto.setToken("fail");
        }
        return jwtDto;
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
