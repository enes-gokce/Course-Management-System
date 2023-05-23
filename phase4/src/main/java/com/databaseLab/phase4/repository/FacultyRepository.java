package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.Faculty;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class FacultyRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public FacultyRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Faculty> findAll(){
        String query = "SELECT * FROM faculty";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Faculty.class));
    }
}
