package com.databaseLab.phase4.dto;

import lombok.Data;

@Data
public class GradesStatsDto {
    private double min_midterm_grade;
    private double max_midterm_grade;
    private double average_midterm_grade;

    private double min_project_grade;
    private double max_project_grade;
    private double average_project_grade;

    private double min_final_grade;
    private double max_final_grade;
    private double average_final_grade;
}
