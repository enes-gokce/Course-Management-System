package com.databaseLab.phase4.entity;

import lombok.Data;

@Data
public class TranscriptInfo {
    private int semester_ects = 0;
    private int total_ects = 0;
    private double gpa = 0.00;
    private double cgpa = 0.00;
}
