package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.dto.StudentDto;
import com.databaseLab.phase4.entity.Course;
import com.databaseLab.phase4.entity.Faculty;
import com.databaseLab.phase4.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
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

    public StudentDto findStudentDetails(int student_id){
        String query = "SELECT user_id, starting_date FROM student where user_id = ?";
        return jdbcTemplate.queryForObject(query, new BeanPropertyRowMapper<>(StudentDto.class), student_id);
    }
}
