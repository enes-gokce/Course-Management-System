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

    public Faculty findFacultyById(int faculty_id){
        String query = "SELECT * FROM faculty WHERE faculty_id = " + faculty_id;
        return jdbcTemplate.queryForObject(query, new BeanPropertyRowMapper<>(Faculty.class));
    }

    public void insertFaculty(String faculty_name){
        String query = "CALL insert_faculty(?)";
        jdbcTemplate.update(query, faculty_name);
    }

    public void updateFacultyById(int faculty_id, String faculty_name){
        String query = "CALL update_faculty(?, ?)";
        jdbcTemplate.update(query, faculty_id, faculty_name);
    }

    public void deleteFacultyById(int faculty_id){
        String query = "CALL delete_faculty(?)";
        jdbcTemplate.update(query, faculty_id);
    }
}
