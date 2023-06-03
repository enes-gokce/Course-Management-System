package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.Faculty;
import com.databaseLab.phase4.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.Arrays;

@Repository
public class ProfileRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public ProfileRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Profile findProfileById(int profile_id){
        String query = "SELECT * FROM profile WHERE profile_id = " + profile_id;
        return jdbcTemplate.queryForObject(query, new BeanPropertyRowMapper<>(Profile.class));
    }

    public Profile findProfileByEmail(String email){
        email = "'" + email + "'";
        String query = "SELECT * FROM profile WHERE email = " + email;
        return jdbcTemplate.queryForObject(query, new BeanPropertyRowMapper<>(Profile.class));
    }

    public void uploadPicture(int profile_id, byte[] file){
        String query = "UPDATE profile SET profile_picture = ? WHERE profile_id = ?";
        jdbcTemplate.update(query, file, profile_id);
    }

    public void updateValue(int profile_id, String value_to_change, String value){
        String query = "UPDATE profile SET " + value_to_change + " = ? WHERE profile_id = ?";
        jdbcTemplate.update(query, value, profile_id);
    }

    public void updatePassword(int profile_id, String password){
        String query = "UPDATE profile SET password = ? WHERE profile_id = ?";
        jdbcTemplate.update(query, password, profile_id);
    }

    public byte[] findPictureById(int profile_id){
        String query = "SELECT profile_picture FROM profile WHERE profile_id = ?";
        return jdbcTemplate.queryForObject(query, new Object[]{profile_id}, byte[].class);
    }
}
