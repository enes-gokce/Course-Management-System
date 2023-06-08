package com.databaseLab.phase4.controller;

import com.databaseLab.phase4.entity.Transcript;
import com.databaseLab.phase4.entity.TranscriptInfo;
import com.databaseLab.phase4.service.TranscriptService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/transcript")
public class TranscriptController {


    private final TranscriptService transcriptService;

    public TranscriptController(TranscriptService transcriptService) {
        this.transcriptService = transcriptService;
    }

    @GetMapping("/get/{student_id}")
    public List<List<Transcript>> getTranscriptByStudentId(@PathVariable int student_id){
        return transcriptService.getTranscriptsByStudentId(student_id);
    }

    @GetMapping("/get/infos/{student_id}")
    public List<TranscriptInfo> getTranscriptInfos(@PathVariable int student_id){
        return transcriptService.getTranscriptInfos(student_id);
    }
}
