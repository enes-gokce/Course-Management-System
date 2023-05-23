package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.dto.AuthDto;
import com.databaseLab.phase4.entity.User;
import com.databaseLab.phase4.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;

    @Autowired
    public AuthController(UserService userService) {
        this.userService = userService;
    }



    @GetMapping("/{user_id}")
    public User getUserById(@PathVariable int user_id){
        return userService.getUserById(user_id);
    }

    @PutMapping("/updatePassword")
    public void updatePassword(@RequestBody User user){
        userService.updatePassword(user);
    }

    @PostMapping("/login")
    public Object login(@RequestBody AuthDto authDto) throws Exception {
        return userService.login(authDto);
    }
}
