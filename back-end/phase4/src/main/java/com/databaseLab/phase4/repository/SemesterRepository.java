package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.Semester;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SemesterRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public SemesterRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Semester> findSemestersOfStudent(int student_id){
        String query = "SELECT DISTINCT(semester_id), start_date, end_date, year, period FROM student_semesters WHERE student_id = ? ORDER BY semester_id ASC";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Semester.class), student_id);
    }
}
