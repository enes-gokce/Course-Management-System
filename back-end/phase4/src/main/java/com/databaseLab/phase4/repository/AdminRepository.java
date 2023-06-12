package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.dto.RegistrationDto;
import com.databaseLab.phase4.entity.Course;
import com.databaseLab.phase4.entity.Faculty;
import com.databaseLab.phase4.entity.Profile;
import com.databaseLab.phase4.entity.RegisteredSections;
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
public class AdminRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public AdminRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<RegisteredSections> findSectionsInDepartment(int department_id){
        String query = "SELECT * FROM teacher_current_semester_sections ORDER BY code ASC";
        return jdbcTemplate.query(query, new ResultSetExtractor<List<RegisteredSections>>() {
            @Override
            public List<RegisteredSections> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<RegisteredSections> sections = new ArrayList<>();
                while (rs.next()) {
                    RegisteredSections section = new RegisteredSections();
                    section.setSection_id(rs.getInt("section_id"));
                    section.setCode(rs.getString("code"));
                    section.setTitle(rs.getString("course_title"));
                    sections.add(section);
                }
                return sections;
            }
        });
    }

    public List<RegistrationDto> findStudentsRegistrations(int department_id){
        String query = "SELECT student_id, name, surname, registration_status, advisor_approval FROM student_registrations ORDER BY student_id ASC";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(RegistrationDto.class));
    }

    public List<Profile> findStudentProfiles(int department_id){
        String query = "SELECT * FROM student_profiles";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Profile.class));
    }

    public List<Profile> findTeacherProfiles(int department_id){
        String query = "SELECT * FROM teacher_profiles";
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(Profile.class));
    }
}
