package com.databaseLab.phase4.dto;

import lombok.Data;

@Data
public class RegistrationDto {
    private int student_id;
    private String name;
    private String surname;
    private String registration_status;
    private String advisor_approval;
}
