import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import ProfileService from "./services/ProfileService";
import UserService from "./services/UserService";
import "./Navbar.css"

function Navbar(props){

    const navigate = useNavigate();
    const [profile, setProfile] =
        useState({profile_id:"", name:"", surname:"", phone_number:"", email:"", address_id:""});
    const [role, setRole] = useState("");

    const token = sessionStorage.getItem('token');
    const profile_id = JSON.parse(sessionStorage.getItem('user')).profile_id;
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;

    useEffect(() => {
        ProfileService.getProfileById(profile_id, token).then(response => {
            setProfile(response.data);
        });
        UserService.getRoleOfUser(user_id, token).then(response => {
            setRole(response.data);
        })

    }, [user_id, profile_id, token])

    function logOut(){
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('user', null);
        navigate("/");
    }

    return (
        <div>
            <nav className="navbar bg-light">
                <div className="container-fluid navbar">
                    <h5 className="navbar-brand">Course Management System / {role}</h5>
                    <div className={"navbar-right d-flex align-items-center"}>
                        <button className="profile btn btn-light" onClick={() => navigate("/profile")}>
                            <div className="d-flex text-center">
                                <img alt="profile_picture" src={props.imgSource}/>
                                <h5 className="nameSurname navbar-text">{`${profile.name} ${profile.surname}`}</h5>
                            </div>
                        </button>
                        <h4 className="ms-auto pe-2 ps-2">
                            <Link to={"/home"}>🏠</Link>
                        </h4>
                        <button onClick={logOut} className="btn-logout btn btn-sm btn-outline-danger">Log out</button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Navbar;
