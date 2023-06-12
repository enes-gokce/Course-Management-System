package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.dto.JwtDto;
import com.databaseLab.phase4.dto.PasswordDto;
import com.databaseLab.phase4.dto.StudentDto;
import com.databaseLab.phase4.entity.User;
import com.databaseLab.phase4.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email){
        System.out.println(userService.getUserByEmail(email));
        return userService.getUserByEmail(email);
    }

    @GetMapping("/role/{user_id}")
    public String getUserByEmail(@PathVariable int user_id){
        return userService.getRoleOfUser(user_id);
    }

    @GetMapping("/student/details/{student_id}")
    public StudentDto getStudentDetails(@PathVariable int student_id){
        return userService.getStudentDetails(student_id);
    }

    @PutMapping("update/password/{user_id}")
    public JwtDto updatePassword(@RequestBody PasswordDto passwordDto, @PathVariable int user_id){
        return userService.updatePassword(passwordDto.getCurrent_password(), passwordDto.getNew_password(), user_id);
    }
}
