package com.databaseLab.phase4.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Registration {
    @Id
    private int registration_id;
    private int student_id;
    private int basket_id;
    private String registration_status;
    private String advisor_approval;
}
