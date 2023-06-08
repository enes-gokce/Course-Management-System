package com.databaseLab.phase4.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
public class Semester {
    @Id
    private int semester_id;
    private Date start_date;
    private Date end_date;
    private String year;
    private String period;
}
