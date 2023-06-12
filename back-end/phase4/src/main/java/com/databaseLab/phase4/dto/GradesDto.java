package com.databaseLab.phase4.dto;

import lombok.Data;

@Data
public class GradesDto {
    private int grades_id;
    private double midterm_grade;
    private double project_grade;
    private double final_grade;
    private String letter_grade;
}
