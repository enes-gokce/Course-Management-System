// Home.js
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import {useNavigate} from "react-router-dom";
import UserService from "../services/UserService";
import ProfileService from "../services/ProfileService";

function Home(){

    const navigate = useNavigate();
    const [advisor, setAdvisor] = useState({name:"", surname:"", email:""})

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;

    useEffect(() => {
        ProfileService.getAdvisorProfileByStudentId(user_id, token).then(response => {
            setAdvisor({name: response.data.name, surname: response.data.surname, email: response.data.email})
        })
    }, [token, user_id])

    return (
        <div>
            <Navbar />
            <div className="container-fluid home">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Course Registration</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/grades")}>Grades</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/transcript")}>Transcript</button>
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="boxes">
                            <div className="box">
                                <h1>Current Semester</h1>
                                <hr/>
                                <p>2022-2023 Spring</p>
                            </div>
                            <div className="box">
                                <h1>Advisor</h1>
                                <hr/>
                                <p>{`${advisor.name} ${advisor.surname}`} <br/> {advisor.email} </p>
                            </div>
                            <div className="box">
                                <h1>Education Information</h1>
                                <hr/>
                                <p>Engineering Faculty / Computer Engineering</p>
                            </div>
                            <div className="box">
                                <h1>Student Information</h1>
                                <hr/>
                                <p>Date of registration: 06.09.2022</p>
                                <p>CGPA: 3.36</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;