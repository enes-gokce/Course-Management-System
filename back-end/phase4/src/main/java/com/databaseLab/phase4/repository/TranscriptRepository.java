package com.databaseLab.phase4.repository;

import com.databaseLab.phase4.entity.RegisteredSections;
import com.databaseLab.phase4.entity.Transcript;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.ResultSetExtractor;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class TranscriptRepository {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TranscriptRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Transcript> findTranscriptByStudentIdSemesterId(int student_id, int semester_id){
        String query = "SELECT * FROM student_semester_transcript WHERE student_id = ? AND semester_id = ?";
        return jdbcTemplate.query(query, new ResultSetExtractor<List<Transcript>>() {
            @Override
            public List<Transcript> extractData(ResultSet rs) throws SQLException, DataAccessException {
                List<Transcript> transcripts = new ArrayList<>();
                while (rs.next()) {
                    Transcript transcript = new Transcript();
                    transcript.setCode(rs.getString("code"));
                    transcript.setTitle(rs.getString("course_title"));
                    transcript.setEcts(rs.getInt("ects"));
                    transcript.setLetter_grade(rs.getString("letter_grade"));
                    transcripts.add(transcript);
                }
                return transcripts;
            }
        }, student_id, semester_id);
    }
}
