import React, {useEffect, useState} from 'react';
import ProfileService from "../services/ProfileService";
import Navbar from "../Navbar/Navbar";
import Menu from "../Menu/Menu";
import AdminService from "../services/AdminService";

function Teachers(props) {
    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    const department_id = JSON.parse(sessionStorage.getItem('user')).dept_id;

    const [teachers, setTeachers] = useState([]);

    useEffect(() => {
        AdminService.getTeacherProfiles(department_id, token).then(response => {
            setTeachers(response.data);
        })
    }, [department_id, token])

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
                            <h3>Teachers</h3>
                            <div className="table-div mt-2">
                                <table className="table table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>Teacher ID</th>
                                        <th>Teacher Name - Surname</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {teachers.map((teacher) => (
                                        <tr key={teacher.profile_id}>
                                            <td>{teacher.profile_id}</td>
                                            <td>{teacher.name + " " + teacher.surname}</td>
                                            <td>{teacher.email}</td>
                                            <td>{teacher.phone_number}</td>
                                            <td><button className="btn btn-sm btn-success" onClick={() => handleSendEmail(teacher.email)}>Send Email</button></td>
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

export default Teachers;