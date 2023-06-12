// Home.js
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import {useNavigate} from "react-router-dom";
import UserService from "../services/UserService";
import ProfileService from "../services/ProfileService";
import Menu from "../Menu/Menu";
import TeacherService from "../services/TeacherService";
import AdminService from "../services/AdminService";

function Home(){

    const [advisor, setAdvisor] = useState({name:"", surname:"", email:""})

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    const department_id = JSON.parse(sessionStorage.getItem('user')).dept_id;

    const [role, setRole] = useState("");
    const [numberOfAdvisingStudents, setNumberOfAdvisingStudents] = useState(0);
    const [studentDetails, setStudentDetails] = useState({user_id:"", starting_date:""});
    const [numberOfCourses, setNumberOfCourses] = useState();
    const [numberOfStudents, setNumberOfStudents] = useState();

    useEffect(() => {
        UserService.getRoleOfUser(user_id, token).then(response => {
            setRole(response.data);
            sessionStorage.setItem('role', role);
            console.log(role);
            if(response.data === "Student"){
                ProfileService.getAdvisorProfileByStudentId(user_id, token).then(response => {
                    setAdvisor({name: response.data.name, surname: response.data.surname, email: response.data.email})
                })
                UserService.getStudentDetails(user_id, token).then(response => {
                    setStudentDetails(response.data);
                })
            }
            if(response.data === "Teacher"){
                ProfileService.getAdvisingStudentsProfiles(user_id, token).then(response => {
                    setNumberOfAdvisingStudents(response.data.length);
                })
                TeacherService.getSectionsByTeacherId(user_id, token).then(response => {
                    setNumberOfCourses(response.data.length);
                })
            }
            if(response.data === "Admin"){
                AdminService.getSectionsInDepartment(department_id, token).then(response => {
                    setNumberOfCourses(response.data.length);
                })
                AdminService.getStudentProfiles(department_id, token).then(response => {
                    setNumberOfStudents(response.data.length);
                })
            }
        })
    }, [token, user_id, role, department_id])

    return (
        <div>
            <Navbar />
            <div className="container-fluid home">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <Menu />
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="boxes">
                            <div className="box">
                                <h1>Current Semester</h1>
                                <hr/>
                                <p>2022-2023 Spring</p>
                            </div>
                            {role === "Student" && <div className="box">
                                <h1>Advisor</h1>
                                <hr/>
                                <p>{`${advisor.name} ${advisor.surname}`} <br/> {advisor.email} </p>
                            </div>}
                            <div className="box">
                                <h1>{role === "Student" ? "Education Information" : "Faculty / Department Information" }</h1>
                                <hr/>
                                <p>Engineering Faculty / Computer Engineering</p>
                            </div>
                            {role === "Student" && <div className="box">
                                <h1>Student Information</h1>
                                <hr/>
                                <p>Student ID: {studentDetails.user_id}</p>
                                <p>Date of registration:<br/> {studentDetails.starting_date.slice(0, 10)}</p>
                            </div>}
                            {role === "Teacher" && <div className="box">
                                <h1>Course Information</h1>
                                <hr/>
                                <p>Number of Course You Teach: {numberOfCourses}</p>
                            </div>}
                            {role === "Teacher" && <div className="box">
                                <h1>Student Information</h1>
                                <hr/>
                                <p>Number of Advising Students: {numberOfAdvisingStudents}</p>
                            </div>}
                            {role === "Admin" && <div className="box">
                                <h1>Course Information</h1>
                                <hr/>
                                <p>Number of Courses: {numberOfCourses}</p>
                            </div>}
                            {role === "Admin" && <div className="box">
                                <h1>Student Information</h1>
                                <hr/>
                                <p>Number of Students: {numberOfStudents}</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;