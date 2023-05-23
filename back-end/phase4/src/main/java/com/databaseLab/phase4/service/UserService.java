package com.databaseLab.phase4.service;

import com.databaseLab.phase4.config.JwtUtil;
import com.databaseLab.phase4.dto.AuthDto;
import com.databaseLab.phase4.dto.JwtDto;
import com.databaseLab.phase4.entity.User;
import com.databaseLab.phase4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

@Service
public class UserService {

    private final UserRepository userRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User getUserById(int user_id){
        System.out.println(user_id);
        return userRepository.findUserById(user_id);
    }

    public void updatePassword(User user){
     String password = passwordEncoder.encode(user.getPassword());
     userRepository.updateUser(user.getUser_id(), user.getDept_id(), password, user.getProfile_id());
    }

    public JwtDto login(AuthDto authDto) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authDto.getUser_id(), authDto.getPassword()));
            System.out.println("success");
        } catch (BadCredentialsException e) {
            JwtDto jwtDto = new JwtDto();
            jwtDto.setToken("null");
            return jwtDto;
        }

        String token = jwtUtil.generateToken(String.valueOf(authDto.getUser_id()));
        JwtDto jwtDto = new JwtDto();
        jwtDto.setToken(token);
        return jwtDto;
    }

}
