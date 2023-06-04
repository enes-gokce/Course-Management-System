package com.databaseLab.phase4.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class Section {
    @Id
    private int section_id;
    private int teacher_id;
    private int classroom_id;
    private int course_id;
    private int quota;
}
