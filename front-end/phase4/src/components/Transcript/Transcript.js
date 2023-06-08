import React, {useEffect, useState} from 'react';
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import CourseService from "../services/CourseService";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";
import TranscriptService from "../services/TranscriptService";
import grades from "../Grades/Grades";
import SemesterService from "../services/SemesterService";
import "./Transcript.css";

function Transcript() {

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    let count = 0;

    const [semesters, setSemesters] = useState([]);
    const [allGrades, setAllGrades] = useState([]);
    const [transcriptInfos, setTranscriptInfos] = useState([]);

    useEffect(() => {
        TranscriptService.getTranscriptByStudentId(user_id, token).then(response => {
            setAllGrades(response.data);
        })

        TranscriptService.getTranscriptInfos(user_id, token).then(response => {
            setTranscriptInfos(response.data);
        })

        SemesterService.getSemestersOfStudent(user_id, token).then(response => {
            setSemesters(response.data);
        })
    }, [user_id, token])

    function downloadTableAsPdf() {

        let tempAllGrades = allGrades;
        for(let i = 0; i<tempAllGrades.length; i++){
            tempAllGrades[i].push({});
            tempAllGrades[i].push({
                totalEcts: "",
                cgpa: "",
                semesterEcts: "Semester ECTS: " +transcriptInfos[i].semester_ects,
                gpa: "GPA: " + transcriptInfos[i].gpa.toFixed(2)
            });
            tempAllGrades[i].push({
                semesterEcts: "",
                gpa: "",
                totalEcts: "Total ECTS: " + transcriptInfos[i].total_ects,
                cgpa: "CGPA: " + transcriptInfos[i].cgpa.toFixed(2)
            });
        }

        const doc = new jsPDF({ orientation: 'landscape' });

        tempAllGrades.forEach((grades, index) => {
            const data = grades;
            const columns = ['Course Code', 'Course Title', 'ECTS', 'Letter Grade'];
            const tableData = data.map((item) => Object.values(item));

            doc.setFontSize(12);

            autoTable(doc, {
                head: [columns],
                body: tableData
            });
        });

        doc.save('transcript.pdf');
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid container_registration">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Course Registration</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/grades")}>Grades</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/transcript")}>Transcript</button>
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <h3>Transcript</h3>
                        <div className="table-div mt-2">
                            {allGrades.map((grades, index) => (
                                <div key={++count}>
                                    <br/>
                                    <h5>{semesters[index].year + " " + semesters[index].period}</h5>
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Course Code</th>
                                            <th>Course Title</th>
                                            <th>ECTS</th>
                                            <th>Letter Grade</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {grades.map((grade) => (
                                            <tr key={++count}>
                                                <td>{grade.code}</td>
                                                <td>{grade.title}</td>
                                                <td>{grade.ects}</td>
                                                <td>{grade.letter_grade}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <div className="info-container">
                                        <h6 className="info"><b>Semester ECTS:</b> {transcriptInfos[index].semester_ects}</h6>
                                        <h6 className="info"><b>GPA:</b> {transcriptInfos[index].gpa.toFixed(2)}</h6>
                                        <h6 className="info"><b>Total ECTS:</b> {transcriptInfos[index].total_ects}</h6>
                                        <h6 className="info"><b>CGPA:</b> {transcriptInfos[index].cgpa.toFixed(2)}</h6>
                                    </div>
                                    <br/>
                                    <hr/>
                                </div>
                            ))}
                            <button className="download-transcript-button btn position-relative bottom-0 end-0 btn-success mt-2" onClick={downloadTableAsPdf}>Download Transcript</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transcript;