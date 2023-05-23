package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.Faculty;
import com.databaseLab.phase4.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    String tableName = "\"User\"";

    public User findUserById(int user_id){
        System.out.println(user_id);
        String query = "SELECT * FROM " + tableName + " WHERE user_id = " + user_id;
        System.out.println(query);
        return jdbcTemplate.queryForObject(query, new BeanPropertyRowMapper<>(User.class));
    }

    public void updateUser(int user_id, int dept_id, String password, int profile_id){
        String query = "CALL update_user(?, ?, ?, ?)";
        jdbcTemplate.update(query, user_id, dept_id, password, profile_id);
    }
}
