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
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Ders Kayıt</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/grades")}>Not Listesi</button>
                            <button type="button" className="btn btn-secondary">Transcript</button>
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="boxes">
                            <div className="box">
                                <h1>Aktif Dönem</h1>
                                <hr/>
                                <p>2022-2023 Spring</p>
                            </div>
                            <div className="box">
                                <h1>Danışman</h1>
                                <hr/>
                                <p>{`${advisor.name} ${advisor.surname}`} <br/> {advisor.email} </p>
                            </div>
                            <div className="box">
                                <h1>Öğrenim Bilgileri</h1>
                                <hr/>
                                <p>Mühendislik Fakültesi / Bilgisayar Mühendisliği</p>
                            </div>
                            <div className="box">
                                <h1>Öğrenci Bilgileri</h1>
                                <hr/>
                                <p>Mühendislik Fakültesi / Bilgisayar Mühendisliği</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;