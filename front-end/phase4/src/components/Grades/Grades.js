import React, {useEffect, useState} from 'react';
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import "./Grades.css";
import CourseService from "../services/CourseService";
import { jsPDF } from 'jspdf';
import autoTable from "jspdf-autotable";

function Grades(props) {

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    let count = 0;


    const [grades, setGrades] = useState([])

    useEffect(() => {
        CourseService.getRegisteredSections(user_id, token).then(response => {
            console.log(response.data);
            setGrades(response.data);
        })
    }, [user_id, token])

    function downloadTableAsPdf(){
        const doc = new jsPDF({ orientation: 'landscape' });

        // Example data with objects
        const data = grades

        // Extract column names from the first object in the array
        const columns = Object.keys(data[0]);

        // Extract data from objects
        const tableData = data.map((item) => Object.values(item));

        autoTable(doc, {
            head: [columns],
            body: tableData,
        });

        // Save the PDF
        doc.save('grades.pdf');
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid container_grades">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Course Registration</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/grades")}>Grades</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/transcript")}>Transcript</button>
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="table-div">
                            <h3>Grades</h3>
                            <table className="table table-striped table-hover">
                                <thead>
                                <tr>
                                    <th>Section</th>
                                    <th>Course Code</th>
                                    <th>Course Title</th>
                                    <th>ECTS</th>
                                    <th>Teacher</th>
                                    <th>Midterm Grade</th>
                                    <th>Project Grade</th>
                                    <th>Final Grade</th>
                                    <th>Letter Grade</th>
                                </tr>
                                </thead>
                                <tbody>
                                {grades.map((grade) => (
                                    <tr key={++count}>
                                        <td>{grade.section_id}</td>
                                        <td>{grade.code}</td>
                                        <td>{grade.title}</td>
                                        <td>{grade.ects}</td>
                                        <td>{grade.name + " " + grade.surname}</td>
                                        <td>{grade.midterm_grade !== 0 ? grade.midterm_grade : null}</td>
                                        <td>{grade.project_grade !== 0 ? grade.project_grade : null}</td>
                                        <td>{grade.final_grade !== 0 ? grade.final_grade : null}</td>
                                        <td>{grade.letter_grade}</td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                            <button className="download-button btn position-relative bottom-0 end-0 btn-success" onClick={downloadTableAsPdf}>Download Grades</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Grades;