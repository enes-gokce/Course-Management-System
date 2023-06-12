package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.Course;
import com.databaseLab.phase4.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class StudentRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StudentRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Student> findStudentsBySectionId(int section_id){
        String query = "SELECT * FROM section_students_grades WHERE section_id = ? ORDER BY student_id ASC";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Student.class), section_id);
    }

}
