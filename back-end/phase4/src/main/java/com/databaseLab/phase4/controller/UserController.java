package com.databaseLab.phase4.controller;

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
}
