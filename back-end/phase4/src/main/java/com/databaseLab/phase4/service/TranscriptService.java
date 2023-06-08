package com.databaseLab.phase4.service;

import com.databaseLab.phase4.entity.Semester;
import com.databaseLab.phase4.entity.Transcript;
import com.databaseLab.phase4.entity.TranscriptInfo;
import com.databaseLab.phase4.repository.TranscriptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TranscriptService {

    private final TranscriptRepository transcriptRepository;
    private final SemesterService semesterService;

    @Autowired
    public TranscriptService(TranscriptRepository transcriptRepository, SemesterService semesterService) {

        this.transcriptRepository = transcriptRepository;
        this.semesterService = semesterService;
    }


    public Map<String, Double> getLetterGradeDictionary(){
        Map<String, Double> letterGradeDictionary = new HashMap<>();

        letterGradeDictionary.put("A1", 4.00);
        letterGradeDictionary.put("A2", 3.75);
        letterGradeDictionary.put("A3", 3.50);

        letterGradeDictionary.put("B1", 3.25);
        letterGradeDictionary.put("B2", 3.00);
        letterGradeDictionary.put("B3", 2.75);

        letterGradeDictionary.put("C1", 2.50);
        letterGradeDictionary.put("C2", 2.25);
        letterGradeDictionary.put("C3", 2.00);

        letterGradeDictionary.put("D", 1.75);

        letterGradeDictionary.put("F1", 0.00);
        letterGradeDictionary.put("F2", 0.00);
        letterGradeDictionary.put("F3", 0.00);

        return letterGradeDictionary;
    }

    public List<List<Transcript>> getTranscriptsByStudentId(int student_id){
        List<Semester> semesters = semesterService.getSemestersOfStudent(student_id);
        List<List<Transcript>> allTranscripts = new ArrayList<>();
        for(Semester semester : semesters){
            allTranscripts.add(transcriptRepository.findTranscriptByStudentIdSemesterId(student_id, semester.getSemester_id()));
        }
        return allTranscripts;
    }

    public List<TranscriptInfo> getTranscriptInfos(int student_id){
        List<TranscriptInfo> transcriptInfos = new ArrayList<>();
        List<List<Transcript>> transcripts = getTranscriptsByStudentId(student_id);

        TranscriptInfo transcriptInfo = new TranscriptInfo();
        double total_grade = 0.00;
        Map<String, Double> letterGradeDictionary = getLetterGradeDictionary();
        for(Transcript transcript : transcripts.get(0)){
            transcriptInfo.setSemester_ects(transcriptInfo.getSemester_ects()+transcript.getEcts());
            total_grade += letterGradeDictionary.get(transcript.getLetter_grade()) * transcript.getEcts();
        }
        transcriptInfo.setTotal_ects(transcriptInfo.getSemester_ects());
        transcriptInfo.setGpa(total_grade/transcriptInfo.getSemester_ects());
        transcriptInfo.setCgpa(transcriptInfo.getGpa());

        transcriptInfos.add(transcriptInfo);

        for(int i = 1; i<transcripts.size(); i++){
            TranscriptInfo tempTranscriptInfo = new TranscriptInfo();
            total_grade = 0.00;
            for(Transcript transcript : transcripts.get(i)){
                tempTranscriptInfo.setSemester_ects(tempTranscriptInfo.getSemester_ects()+transcript.getEcts());
                total_grade += letterGradeDictionary.get(transcript.getLetter_grade()) * transcript.getEcts();
            }
            tempTranscriptInfo.setTotal_ects(transcriptInfos.get(i-1).getTotal_ects() + tempTranscriptInfo.getSemester_ects());
            tempTranscriptInfo.setGpa(total_grade/tempTranscriptInfo.getSemester_ects());

            int prevTotalEcts = transcriptInfos.get(i-1).getTotal_ects();
            double prevCgpa = transcriptInfos.get(i-1).getCgpa();

            tempTranscriptInfo.setCgpa((prevTotalEcts*prevCgpa + tempTranscriptInfo.getSemester_ects() * tempTranscriptInfo.getGpa()) / tempTranscriptInfo.getTotal_ects());

            transcriptInfos.add(tempTranscriptInfo);
        }

        return transcriptInfos;
    }
}
