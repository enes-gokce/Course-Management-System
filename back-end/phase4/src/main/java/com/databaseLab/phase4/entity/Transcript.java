package com.databaseLab.phase4.entity;

import lombok.Data;

@Data
public class Transcript {
    private String code;
    private String title;
    private int ects;
    private String letter_grade;
}
