package com.databaseLab.phase4.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Student {
    @Id
    private int student_id;
    private String name;
    private String surname;
    private int grades_id;
    private double midterm_grade;
    private double project_grade;
    private double final_grade;
    private String letter_grade;
}
