// Registration.js
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import "./Registration.css";
import CourseService from "../services/CourseService";
import {all} from "axios";
import Menu from "../Menu/Menu";
import UserService from "../services/UserService";
import ProfileService from "../services/ProfileService";
import AdminService from "../services/AdminService";
import TeacherService from "../services/TeacherService";

function Registration() {

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    const department_id = JSON.parse(sessionStorage.getItem('user')).dept_id;
    const navigate = new useNavigate();

    const [showCoursesAndBasket, setShowCoursesAndBasket] = useState(false);
    const [showAdvisingStudents, setShowAdvisingStudents] = useState(false);

    const [allCourses, setAllCourses] = useState([]);
    const [basket, setBasket] = useState([]);
    const [year, setYear] = useState(1);
    const [totalECTS, setTotalECTS] = useState(0);
    const [numberOfCourses, setNumberOfCourses] = useState(0);
    const [statusDto, setStatusDto] = useState({registrationStatus:"", advisorApprovalStatus:""})

    const [student_id, setStudent_id] = useState();
    const [studentNameSurname, setStudentNameSurname] = useState("");
    const [advisingStudents, setAdvisingStudents] = useState([]);

    const [role, setRole] = useState(sessionStorage.getItem('role'));

    useEffect(() => {
        CourseService.getCurrentSemesterCourses(year, token).then(response => {
            setAllCourses(response.data);
        })
        console.log(role);
        if(user_id > 4){
            CourseService.getAddedSectionsInBasket(user_id, token).then(response => {
                console.log(response.data);
                setBasket(response.data);
            })
            CourseService.getBasketStatistics(user_id, token).then(response => {
                setTotalECTS(response.data.totalECTS);
                setNumberOfCourses(response.data.numberOfCourses);
            })
            CourseService.getRegistrationStatus(user_id, token).then(response => {
                setStatusDto({registrationStatus: response.data.registration_status, advisorApprovalStatus: response.data.advisor_approval});
            })
            UserService.getRoleOfUser(user_id, token).then(response => {
                setRole(response.data);
            })
            setShowCoursesAndBasket(true);
        }

        else if (1 < user_id && user_id <= 4){
            TeacherService.getStudentRegistrations(user_id, token).then(response => {
                setAdvisingStudents(response.data);
                setShowAdvisingStudents(true);
            })
        }

        else if(user_id === 1){
            AdminService.getStudentRegistrations(department_id, token).then(response => {
                setAdvisingStudents(response.data);
            })
            setShowAdvisingStudents(true);
        }

    }, [user_id, token, year, role])

    function handleRegisteredCourse(course){
        setNumberOfCourses(numberOfCourses + 1);
        setTotalECTS(totalECTS + course.ects);
        setBasket(prevBasket => {
            return [...prevBasket, course]
        });
        if (user_id > 4){
            CourseService.insertSectionToBasket(user_id, course.section_id, token);
        }

        else if(user_id <= 4){
            CourseService.insertSectionToBasket(student_id, course.section_id, token);
            CourseService.updateSectionQuota(course.section_id, "decrease", token)
        }
    }

    function handleDroppedCourse(section_id, ects){
        if (user_id > 4){
            CourseService.deleteSectionFromBasket(user_id, section_id, token);
        }

        if(user_id <= 4){
            CourseService.deleteSectionFromBasket(student_id, section_id, token);
            CourseService.updateSectionQuota(section_id, "increase", token)
        }

        setNumberOfCourses(numberOfCourses + (-1));
        setTotalECTS(totalECTS + (-ects));
        let tempBasket = basket.filter(course => course.section_id !== section_id);
        setBasket(tempBasket.sort((a, b) => a.code - b.code));
    }

    function isCourseRegistered(section_id){
        if(basket.some(course => course.section_id === section_id)){
            return true;
        }
        else{
            return false;
        }
    }

    function handleRegistration(){
        const status = {registration_status: "registered", advisor_approval: statusDto.advisorApprovalStatus};
        CourseService.updateRegistrationStatus(user_id, token, status);
        basket.map(course => CourseService.updateSectionQuota(course.section_id, "decrease", token));
        window.location.reload();
    }

    function handleReleaseRegistration(){
        const status = {registration_status: "not registered", advisor_approval: "not approved"};
        CourseService.updateRegistrationStatus(student_id, token, status);
        setStatusDto({registrationStatus: "not registered", advisorApprovalStatus: "not approved"});
    }

    function handleApprove(){
        const status = {registration_status: "registered", advisor_approval: "approved"};
        CourseService.updateRegistrationStatus(student_id, token, status);
        setStatusDto({registrationStatus: "registered", advisorApprovalStatus: "approved"});
    }

    function handleRemoveApprove(){
        const status = {registration_status: "registered", advisor_approval: "not approved"};
        CourseService.updateRegistrationStatus(student_id, token, status);
        setStatusDto({registrationStatus: "registered", advisorApprovalStatus: "not approved"});
    }

    function viewCourseRegistrationOfStudent(student_id, name, surname){
        CourseService.getCurrentSemesterCourses(year, token).then(response => {
            setAllCourses(response.data);
        })
        CourseService.getAddedSectionsInBasket(student_id, token).then(response => {
            setBasket(response.data);
        })
        CourseService.getBasketStatistics(student_id, token).then(response => {
            setTotalECTS(response.data.totalECTS);
            setNumberOfCourses(response.data.numberOfCourses);
        })
        CourseService.getRegistrationStatus(student_id, token).then(response => {
            setStatusDto({registrationStatus: response.data.registration_status, advisorApprovalStatus: response.data.advisor_approval});
        })
        UserService.getRoleOfUser(student_id, token).then(response => {
            setRole(response.data);
        })
        setShowCoursesAndBasket(true);
        setStudent_id(student_id);
        setStudentNameSurname(name + " " + surname);
    }

    return (
        <div>
            <Navbar />
            <div className="container-fluid container_registration">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <Menu />
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="inside-container">
                            <h3>Course Registration - {studentNameSurname}</h3>
                            {showAdvisingStudents &&
                                <div className="table-div mt-2">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Student ID</th>
                                            <th>Student Name - Surname</th>
                                            <th>Registration Status</th>
                                            <th>Advisor Approval</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {advisingStudents.map((student) => (
                                            <tr key={student.student_id}>
                                                <td>{student.student_id}</td>
                                                <td>{student.name + " " + student.surname}</td>
                                                <td>{student.registration_status}</td>
                                                <td>{student.advisor_approval}</td>
                                                <td><button className="btn btn-sm btn-success" onClick={() => viewCourseRegistrationOfStudent(student.student_id, student.name, student.surname)}>Show Course Registration</button></td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                            </div> }
                            {showCoursesAndBasket &&
                            <div className="courses mt-3 mb-2">
                                <h5>Courses / Year {year}</h5>
                                <div className="year-buttons mb-2">
                                    <button className="btn btn-sm btn-secondary btn-year me-2" onClick={() => setYear(1)}>Year 1</button>
                                    <button className="btn btn-sm btn-secondary btn-year me-2" onClick={() => setYear(2)}>Year 2</button>
                                    <button className="btn btn-sm btn-secondary btn-year me-2" onClick={() => setYear(3)}>Year 3</button>
                                    <button className="btn btn-sm btn-secondary btn-year me-2" onClick={() => setYear(4)}>Year 4</button>
                                </div>
                                <div className="courses-table">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Course Code</th>
                                            <th>Course Title</th>
                                            <th>ECTS</th>
                                            <th>Section</th>
                                            <th>Quota</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {allCourses.map((course) => (
                                            <tr key={course.section_id}>
                                                <td>{course.code}</td>
                                                <td>{course.title}</td>
                                                <td>{course.ects}</td>
                                                <td>{course.section_id}</td>
                                                <td>{course.quota}</td>
                                                <td>{(!isCourseRegistered(course.section_id) && statusDto.registrationStatus === "not registered" && <button className="btn btn-sm btn-success" onClick={() => handleRegisteredCourse(course)}>Add</button>) ||
                                                    (!isCourseRegistered(course.section_id) && statusDto.advisorApprovalStatus === "not approved" && user_id <= 4 && <button className="btn btn-sm btn-success" onClick={() => handleRegisteredCourse(course)}>Add</button>)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>}

                            {showCoursesAndBasket &&
                            <div className="basket">
                                <div className="basket-header">
                                    <h5>Basket</h5>
                                    {statusDto.registrationStatus === "not registered" && user_id > 4 && <button className="btn btn-secondary btn-register" onClick={handleRegistration}>Register</button>}
                                    {user_id <= 4 &&
                                        <div className="div-approval">
                                            {statusDto.advisorApprovalStatus === "not approved" && statusDto.registrationStatus === "registered" && <button className="btn btn-danger btn-sm me-2" onClick={handleReleaseRegistration}>Release Registration</button>}
                                            {statusDto.advisorApprovalStatus === "not approved" && <button className="btn btn-success btn-sm" onClick={handleApprove}>Approve</button>}
                                            {statusDto.advisorApprovalStatus === "approved" && <button className="btn btn-danger btn-sm" onClick={handleRemoveApprove}>Remove Approve</button>}
                                        </div>}
                                </div>
                                <div className="basket-table">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Course Code</th>
                                            <th>Course Title</th>
                                            <th>ECTS</th>
                                            <th>Section</th>
                                            <th>Quota</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {basket.sort((a, b) => a.code - b.code).map((course) => (
                                            <tr key={course.section_id}>
                                                <td>{course.code}</td>
                                                <td>{course.title}</td>
                                                <td>{course.ects}</td>
                                                <td>{course.section_id}</td>
                                                <td>{course.quota}</td>
                                                <td>{(statusDto.registrationStatus === "not registered" && <button className="btn btn-sm btn-danger" onClick={() => handleDroppedCourse(course.section_id, course.ects)}>Drop</button>) || (statusDto.advisorApprovalStatus === "not approved" && user_id <= 4 &&  <button className="btn btn-sm btn-danger" onClick={() => handleDroppedCourse(course.section_id, course.ects)}>Drop</button>)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="info-container">
                                    <h6 className="info"><b>Total ECTS:</b> {totalECTS}</h6>
                                    <h6 className="info"><b>Number of Courses:</b> {numberOfCourses}</h6>
                                    <h6 className="info"><b>Registration Status:</b> {statusDto.registrationStatus}</h6>
                                    <h6 className="info"><b>Advisor Approval Status:</b> {statusDto.advisorApprovalStatus}</h6>
                                </div>
                            </div> }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;