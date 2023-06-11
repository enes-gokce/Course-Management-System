import React, {useEffect, useState} from 'react';
import Navbar from "../Navbar/Navbar";
import Menu from "../Menu/Menu";
import "./AdvisingStudents.css";
import ProfileService from "../services/ProfileService";

function AdvisingStudents(props) {

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;

    const [students, setStudents] = useState([]);

    useEffect(() => {
        ProfileService.getAdvisingStudentsProfiles(user_id, token).then(response => {
            setStudents(response.data);
        })
    }, [user_id, token])

    function handleSendEmail(email){
        window.location.href = `mailto:${email}`;
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
                        <div className="students">
                            <h3>Advising Students</h3>
                            <div className="table-div mt-2">
                                <table className="table table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>Student ID</th>
                                        <th>Student Name - Surname</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {students.map((student) => (
                                        <tr key={student.profile_id}>
                                            <td>{student.profile_id}</td>
                                            <td>{student.name + " " + student.surname}</td>
                                            <td>{student.email}</td>
                                            <td>{student.phone_number}</td>
                                            <td><button className="btn btn-sm btn-success" onClick={() => handleSendEmail(student.email)}>Send Email</button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdvisingStudents;