package com.databaseLab.phase4.dto;

import lombok.Data;

@Data
public class PasswordDto {
    private String current_password;
    private String new_password;
}
