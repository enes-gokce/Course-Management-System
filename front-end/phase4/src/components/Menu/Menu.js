import React, {useState} from 'react';
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";

function Menu(props) {

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    const navigate = useNavigate();

    const [role, setRole] = useState("");
    UserService.getRoleOfUser(user_id, token).then(response => {
        setRole(response.data);
    })

    return (
        <div>
            {role === "Student" &&
                <span>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Course Registration</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/grades")}>Grades</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/transcript")}>Transcript</button>
                </span>}
            {role === "Teacher" &&
                <span>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Course Registration</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/courses")}>Courses</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/advising-students")}>Consulting Students</button>
                </span>}
            {role === "Admin" &&
                <span>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Course Registration</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/courses")}>Courses</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/teachers")}>Teachers</button>
                    <button type="button" className="btn btn-secondary" onClick={() => navigate("/students")}>Students</button>
                </span>}
        </div>
    );
}

export default Menu;