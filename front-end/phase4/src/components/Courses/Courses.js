import React, {useEffect, useState} from 'react';
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import './Courses.css';
import TeacherService from "../services/TeacherService";
import GradeDistributionChart from "./GradeDistributionChart";
import AdminService from "../services/AdminService";

function Courses() {

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    const department_id = JSON.parse(sessionStorage.getItem('user')).dept_id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showStudents, setShowStudents] = useState(false);
    const [showStatistics, setShowStatistics] = useState(false);

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);
    const [grades, setGrades] = useState({grades_id: 0, midterm_grade: 0, project_grade: 0, final_grade: 0, letter_grade: ""})
    const [allGrades, setAllGrades] = useState([]);
    const [gradesStatistics, setGradesStatistics] = useState({min: "", max: "", average: ""});
    const [allGradesStatistics, setAllGradesStatistics] = useState({});

    const [title, setTitle] = useState("");
    const [sectionId, setSectionId] = useState();
    const [buttonColors, setButtonColors] = useState({midterm: 'dark', project: 'dark', final: 'dark'})

    useEffect(() => {
        if(user_id > 1 && user_id <= 4 )
            TeacherService.getSectionsByTeacherId(user_id, token).then(response => {
                setCourses(response.data);
        })
        else if (user_id === 1){
            AdminService.getSectionsInDepartment(department_id, token).then(response => {
                setCourses(response.data);
            })
        }
    }, [user_id, token])

    function openModal(student) {
        setIsModalOpen(true);
        setGrades({grades_id: student.grades_id, midterm_grade: student.midterm_grade, project_grade: student.project_grade, final_grade: student.final_grade, letter_grade: student.letter_grade})
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleInputChange(event) {
        const { id, value } = event.target;
        setGrades((prevGrades) => ({
            ...prevGrades,
            [id]: value,
        }));
    }

    function handleSubmit(event) {
        event.preventDefault();
        TeacherService.enterGrade(grades, token)
            .then(() => {
                closeModal();
                TeacherService.getStudentsBySectionId(sectionId, token)
                    .then((response) => {
                        setStudents(response.data);
                    })
                    .catch((error) => {
                    });
                TeacherService.getSectionGradesStats(sectionId, token)
                    .then((response) => {
                        setAllGradesStatistics(response.data);
                    })
                    .catch((error) => {
                    });
            })
            .catch((error) => {
            });
    }

    function handleShowStudents(section_id, course_title){
        setSectionId(section_id);
        TeacherService.getStudentsBySectionId(section_id,token).then(response => {
            setStudents(response.data);
        })
        TeacherService.getSectionGradesStats(section_id, token).then((response) => {
            setAllGradesStatistics(response.data);
        })
        setTitle(course_title);
        setShowStudents(true);
        handleCloseStatistics();
    }

    function handleGradeStatistics(gradeType) {
        setShowStatistics(true);
        let tempAllGrades = [];
        let tempButtonColors = {midterm: 'dark', project: 'dark', final: 'dark'}
        if(gradeType === "midterm"){
            tempAllGrades = students.filter(student => student.midterm_grade > 0).map(student => student.midterm_grade);
            tempButtonColors.midterm = 'warning';
            setButtonColors(tempButtonColors);
            setGradesStatistics({min: allGradesStatistics.min_midterm_grade, max: allGradesStatistics.max_midterm_grade, average: allGradesStatistics.average_midterm_grade})
        }
        else if(gradeType === "project"){
            tempAllGrades = students.filter(student => student.project_grade > 0).map(student => student.project_grade);
            tempButtonColors.project = 'warning';
            setButtonColors(tempButtonColors);
            setGradesStatistics({min: allGradesStatistics.min_project_grade, max: allGradesStatistics.max_project_grade, average: allGradesStatistics.average_project_grade})

        }
        else if(gradeType === "final"){
            tempAllGrades = students.filter(student => student.final_grade > 0).map(student => student.final_grade);
            tempButtonColors.final = 'warning';
            setButtonColors(tempButtonColors);
            setGradesStatistics({min: allGradesStatistics.min_final_grade, max: allGradesStatistics.max_final_grade, average: allGradesStatistics.average_final_grade})
        }
        setAllGrades(tempAllGrades);
    }

    function handleCloseStatistics(){
        setShowStatistics(false)
        setButtonColors({midterm: 'dark', project: 'dark', final: 'dark'})
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid container_advising-students">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <Menu />
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="courses">
                            <h3>Courses</h3>
                            <div className="courses-table">
                                <table className="table table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>Section ID</th>
                                        <th>Course Code</th>
                                        <th>Course Title</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {courses.map((course) => (
                                        <tr key={course.section_id}>
                                            <td>{course.section_id}</td>
                                            <td>{course.code}</td>
                                            <td>{course.title}</td>
                                            <td><button className="btn btn-sm btn-outline-primary" onClick={() => handleShowStudents(course.section_id, course.title)}>Show Students</button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            {showStudents &&
                            <div className="students">
                                <h4>{"Students of Course: " + title}</h4>
                                <table className="table table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Name - Surname</th>
                                        <th>Midterm Grade</th>
                                        <th>Project Grade</th>
                                        <th>Final Grade</th>
                                        <th>Letter Grade</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((student) => (
                                        <tr key={student.student_id}>
                                            <td>{student.student_id}</td>
                                            <td>{student.name + " " + student.surname}</td>
                                            <td>{student.midterm_grade !== 0 ? student.midterm_grade : ""}</td>
                                            <td>{student.project_grade !== 0 ? student.project_grade : ""}</td>
                                            <td>{student.final_grade !== 0 ? student.final_grade : ""}</td>
                                            <td>{student.letter_grade !== " " ? student.letter_grade : ""}</td>
                                            <td><button className="btn btn-outline-primary btn-sm btn-modal" onClick={() => openModal(student)}>Enter Grade</button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                {isModalOpen && (
                                    <div className="mdl-overlay">
                                        <div className="mdl">
                                            <h2>Enter Grade</h2>
                                            <form onSubmit={handleSubmit}>
                                                <div>
                                                    <label htmlFor="midterm_grade">Midterm Grade:</label>
                                                    <input
                                                        type="text"
                                                        id="midterm_grade"
                                                        value={grades.midterm_grade}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="project_grade">Project Grade:</label>
                                                    <input
                                                        type="text"
                                                        id="project_grade"
                                                        value={grades.project_grade}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="final_grade">Final Grade:</label>
                                                    <input
                                                        type="text"
                                                        id="final_grade"
                                                        value={grades.final_grade}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="letter_grade">Letter Grade:</label>
                                                    <input
                                                        type="text"
                                                        id="letter_grade"
                                                        value={grades.letter_grade}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                                <div className="modal-buttons">
                                                    <button className="btn btn-success btn-sm me-2" type="submit">Submit</button>
                                                    <button className="btn btn-danger btn-sm" onClick={closeModal}>Close</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                                <div className="text-center">
                                    <button className={"btn btn-ml btn-" + buttonColors.midterm + " me-5"} onClick={() => handleGradeStatistics("midterm")}>Midterm Grade Statistics</button>
                                    <button className={"btn btn-ml btn-" + buttonColors.project + " me-5"} onClick={() => handleGradeStatistics("project")}>Project Grade Statistics</button>
                                    <button className={"btn btn-ml btn-" + buttonColors.final + " me-5"} onClick={() => handleGradeStatistics("final")}>Final Grade Statistics</button>
                                    {showStatistics && <button className="btn btn-ml btn-dark me-5" onClick={handleCloseStatistics}>Close Statistics</button>}
                                </div>
                                {showStatistics &&
                                <div className="div-statistics text-center">
                                    <div className="text-center d-flex mt-4">
                                        <div className="col">
                                            <h5 className="me-5 ms-5">Min: {gradesStatistics.min}</h5>
                                        </div>
                                        <div className="col">
                                            <h5 className="me-5 ms-5">Max: {gradesStatistics.max}</h5>
                                        </div>
                                        <div className="col">
                                            <h5 className="me-5 ms-5">Average: {gradesStatistics.average.toFixed(2)}</h5>
                                        </div>
                                    </div>
                                    <GradeDistributionChart grades={allGrades} />
                                </div>
                                }
                            </div> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;