package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class CourseRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CourseRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<RegisteredSections> findRegisteredSections(int user_id) {
        String query = "SELECT * FROM registered_sections WHERE student_id = " + user_id;
        return jdbcTemplate.query(query, new ResultSetExtractor<List<RegisteredSections>>() {
            @Override
            public List<RegisteredSections> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<RegisteredSections> sections = new ArrayList<>();
                while (rs.next()) {
                    RegisteredSections section = new RegisteredSections();
                    section.setSection_id(rs.getInt("section_id"));
                    section.setTitle(rs.getString("title"));
                    section.setEcts(rs.getInt("ects"));
                    section.setName(rs.getString("name"));
                    section.setSurname(rs.getString("surname"));
                    // Handle null values for float properties
                    section.setMidterm_grade(rs.getFloat("midterm_grade") != 0 ? rs.getFloat("midterm_grade") : 0);
                    section.setProject_grade(rs.getFloat("project_grade") != 0 ? rs.getFloat("project_grade") : 0);
                    section.setFinal_grade(rs.getFloat("final_grade") != 0 ? rs.getFloat("final_grade") : 0);
                    section.setLetter_grade(rs.getString("letter_grade"));
                    sections.add(section);
                }
                return sections;
            }
        });
    }
}
