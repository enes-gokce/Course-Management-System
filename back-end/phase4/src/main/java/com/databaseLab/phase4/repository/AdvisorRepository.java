package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class AdvisorRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdvisorRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public int getAdvisorIdByStudentId(int student_id){
        String query = "SELECT teacher_id FROM advisor WHERE student_id = " + student_id;
        return jdbcTemplate.queryForObject(query, Integer.class);
    }
}