package com.databaseLab.phase4.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Course {
    private String code;
    private String title;
    private int ects;
    private int year;
    @Id
    private int section_id;
    private int quota;
}
