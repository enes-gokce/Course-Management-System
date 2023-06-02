package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    String tableName = "\"User\"";

    public User findUserByUserId(int user_id){
        String query = "SELECT * FROM " + tableName + " WHERE user_id = " + user_id;
        return jdbcTemplate.queryForObject(query, new BeanPropertyRowMapper<>(User.class));
    }

    public User findUserByProfileId(int profile_id){
        String query = "SELECT * FROM " + tableName + " WHERE profile_id = " + profile_id;
        return jdbcTemplate.queryForObject(query, new BeanPropertyRowMapper<>(User.class));
    }

    public void updateUser(int user_id, int dept_id, String password, int profile_id){
        String query = "CALL update_user(?, ?, ?, ?)";
        jdbcTemplate.update(query, user_id, dept_id, password, profile_id);
    }

    public String getRoleOfUser(int user_id){
        String[] tableNames = {"Admin", "Teacher", "Student"};
        String role = "";
        for(String tableName : tableNames){
            String query = "SELECT COUNT(*) FROM " + tableName + " WHERE user_id = " + user_id;
            int count =  jdbcTemplate.queryForObject(query, Integer.class);
            if(count > 0 ){
                role = tableName;
            }
        }
        return role;
    }

    public List<User> findAllUsers(){
        String query = "SELECT * FROM " + tableName;
        return jdbcTemplate.query(query, new BeanPropertyRowMapper<>(User.class));
    }
}
