package com.databaseLab.phase4.service;
import com.databaseLab.phase4.entity.User;
import com.databaseLab.phase4.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {


    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
        User user = userRepository.findUserByUserId(Integer.parseInt(userId));
        return new org.springframework.security.core.userdetails.User(Integer.toString(user.getUser_id()), user.getPassword(), new ArrayList<>());
    }
}