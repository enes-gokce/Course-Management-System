package com.databaseLab.phase4;

import com.databaseLab.phase4.repository.FacultyRepository;
import com.databaseLab.phase4.service.FacultyService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.jdbc.core.JdbcTemplate;

@SpringBootApplication
public class Phase4Application {

	public static void main(String[] args) {
		SpringApplication.run(Phase4Application.class, args);
	}
}
