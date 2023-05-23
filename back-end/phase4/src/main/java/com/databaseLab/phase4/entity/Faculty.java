package com.databaseLab.phase4.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Faculty {

    @Id
    private int faculty_id;
    private String faculty_name;
}
