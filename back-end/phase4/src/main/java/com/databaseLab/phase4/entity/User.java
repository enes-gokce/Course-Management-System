package com.databaseLab.phase4.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class User {

    @Id
    private int user_id;
    private int dept_id;
    private String password;
    private int profile_id;
}
