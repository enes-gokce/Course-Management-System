package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.dto.BasketStatistics;
import com.databaseLab.phase4.entity.Course;
import com.databaseLab.phase4.entity.RegisteredSections;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.jdbc.core.RowMapper;
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

    public List<Course> findCurrentSemesterCourses(int year){
        String query = "SELECT * FROM current_semester_sections WHERE year = " + year;
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Course.class));
    }

    public List<Course> findAddedSectionsInBasket(int basket_id){
        String query = "SELECT * FROM added_sections_in_basket WHERE basket_id = " + basket_id;
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Course.class));
    }

    public void insertSectionToBasket(int section_id, int basket_id){
        String query = "CALL insert_basket_section(?, ?)";
        jdbcTemplate.update(query, section_id, basket_id);
    }

    public void deleteSectionFromBasket(int section_id, int basket_id){
        String query = "CALL delete_basket_section(?, ?)";
        jdbcTemplate.update(query, section_id, basket_id);
    }

    public BasketStatistics findBasketStatistics(int basket_id){
        String query = "SELECT number_of_courses, total_ects FROM basket_statistics WHERE basket_id = ?";
        List<BasketStatistics> results = jdbcTemplate.query(query, new RowMapper<BasketStatistics>() {
            @Override
            public BasketStatistics mapRow(ResultSet rs, int rowNum) throws SQLException {
                BasketStatistics basketStatistics = new BasketStatistics();
                basketStatistics.setNumberOfCourses(rs.getInt("number_of_courses"));
                basketStatistics.setTotalECTS(rs.getInt("total_ects"));
                return basketStatistics;
            }
        }, basket_id);

        if (results.isEmpty()) {
            // Handle the case when the query returns no result
            return new BasketStatistics(); // or return a default value, throw an exception, etc.
        } else {
            return results.get(0);
        }
    }
}
