package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.Faculty;
import com.databaseLab.phase4.entity.Profile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

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
        System.out.println(email);
        email = "'" + email + "'";
        String query = "SELECT * FROM profile WHERE email = " + email;
        System.out.println(query);
        return jdbcTemplate.queryForObject(query, new BeanPropertyRowMapper<>(Profile.class));
    }
}
