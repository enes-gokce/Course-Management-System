package com.databaseLab.phase4.entity;

import lombok.Data;

@Data
public class RegisteredSections {
    private int section_id;
    private String code;
    private String title;
    private int ects;
    private String name;
    private String surname;
    private float midterm_grade = 0;
    private float project_grade = 0;
    private float final_grade = 0;
    private String letter_grade;
}
