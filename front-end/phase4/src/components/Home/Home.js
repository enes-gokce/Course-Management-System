// Home.js
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import {useNavigate} from "react-router-dom";
import UserService from "../services/UserService";
import ProfileService from "../services/ProfileService";
import Menu from "../Menu/Menu";

function Home(){

    const [advisor, setAdvisor] = useState({name:"", surname:"", email:""})

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    const [role, setRole] = useState("");
    const [numberOfAdvisingStudents, setNumberOfAdvisingStudents] = useState(0);

    useEffect(() => {
        UserService.getRoleOfUser(user_id, token).then(response => {
            setRole(response.data);
            if(role === "Student"){
                ProfileService.getAdvisorProfileByStudentId(user_id, token).then(response => {
                    setAdvisor({name: response.data.name, surname: response.data.surname, email: response.data.email})
                })
            }
            if(role === "Teacher"){
                ProfileService.getAdvisingStudentsProfiles(user_id, token).then(response => {
                    setNumberOfAdvisingStudents(response.data.length);
                })
            }
        })
    }, [token, user_id, role])

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
                                <p>Date of registration: 06.09.2022</p>
                                <p>CGPA: 3.36</p>
                            </div>}
                            {role === "Teacher" && <div className="box">
                                <h1>Course Information</h1>
                                <hr/>
                                <p>Number of Course You Teach: </p>
                            </div>}
                            {role === "Teacher" && <div className="box">
                                <h1>Student Information</h1>
                                <hr/>
                                <p>Number of Advising Students: {numberOfAdvisingStudents}</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;