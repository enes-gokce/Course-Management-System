import React, {useEffect, useState} from 'react';
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import CourseService from "../services/CourseService";
import {jsPDF} from "jspdf";
import autoTable from "jspdf-autotable";

function Transcript() {

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    let count = 0;
    let semesterCount = -1;
    const semester = ["2022-2023 Fall", "2022-2023 Spring"]

    const [ects] = useState([{semester: 23, total: 23}, {semester: 22, total: 45}]);
    const [gpa] = useState([{gpa: 3.43, cgpa: 3.43}, {gpa: 3.26, cgpa: 3.36}]);

    const [grades1, setGrades1] = useState([
        {code:"MAT123", title:"Calculus I", ects:5, letterGrade:"B1"},
        {code:"BBM101", title:"Programming I", ects:6, letterGrade:"B2"},
        {code:"FIZ137", title:"Physics I", ects:5, letterGrade:"A3"},
        {code:"BBM102", title:"Programming Lab I", ects:4, letterGrade:"A1"},
        {code:"TKD103", title:"Turkish Language I", ects:3, letterGrade:"A2"}
    ])

    const [grades2, setGrades2] = useState([
        {code:"MAT124", title:"Calculus II", ects:5, letterGrade:"B3"},
        {code:"BBM102", title:"Programming II", ects:6, letterGrade:"B1"},
        {code:"FIZ138", title:"Physics II", ects:5, letterGrade:"A3"},
        {code:"BBM104", title:"Programming Lab II", ects:4, letterGrade:"A2"},
        {code:"FIZ139", title:"Physics Lab", ects:2, letterGrade:"B2"}
    ])

    const [allGrades, setAllGrades] = useState([grades1, grades2]);

    function downloadTableAsPdf() {

        let tempAllGrades = allGrades;
        tempAllGrades[0].push({});
        tempAllGrades[0].push({
            totalEcts: "",
            cgpa: "",
            semesterEcts: "Semester ECTS: " +ects[0].semester,
            gpa: "GPA: " + gpa[0].gpa,
        });
        tempAllGrades[0].push({
            semesterEcts: "",
            gpa: "",
            totalEcts: "Total ECTS: " + ects[0].total,
            cgpa: "CGPA: " + gpa[0].cgpa
        });

        tempAllGrades[1].push({});
        tempAllGrades[1].push({
            totalEcts: "",
            cgpa: "",
            semesterEcts: "Semester ECTS: " +ects[1].semester,
            gpa: "GPA: " + gpa[1].gpa,
        })
        tempAllGrades[1].push({
            semesterEcts: "",
            gpa: "",
            totalEcts: "Total ECTS: " + ects[1].total,
            cgpa: "CGPA: " + gpa[1].cgpa
        })

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
                            {allGrades.map((grades) => (
                                <div>
                                    <br/>
                                    <h5>{semester[++semesterCount]}</h5>
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
                                                <td>{grade.letterGrade}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                    <div className="info-container">
                                        <h6 className="info"><b>Semester ECTS:</b> {ects[semesterCount].semester}</h6>
                                        <h6 className="info"><b>GPA:</b> {gpa[semesterCount].gpa}</h6>
                                        <h6 className="info"><b>Total ECTS:</b> {ects[semesterCount].total}</h6>
                                        <h6 className="info"><b>CGPA:</b> {gpa[semesterCount].cgpa}</h6>
                                    </div>
                                    <br/>
                                    <hr/>
                                </div>
                            ))}
                        </div>
                        <button className="download-button btn position-relative bottom-0 end-0 btn-success mt-2" onClick={downloadTableAsPdf}>Download Transcript</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Transcript;