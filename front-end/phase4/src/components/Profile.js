// Profile.js
import React, {useState} from "react";
import Navbar from "./Navbar";
import {useNavigate} from "react-router-dom";
import "./Profile.css"

function Profile(){

    const [formData, setFormData] = useState({
        name: '',
        surname: '',
        email: '',
        phoneNumber: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        picture: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
    });

    const navigate = new useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handlePictureChange = (event) => {
        const file = event.target.files[0];
        const objectURL = URL.createObjectURL(file);
        setFormData((prevData) => ({
            ...prevData,
            picture: objectURL,
        }));
        console.log(objectURL);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g. send data to server
        console.log(formData);
    };


    return (
        <div>
            <Navbar imgSource={formData.picture}/>
            <div className="container-fluid container_profile">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Ders Kayıt</button>
                            <button type="button" className="btn btn-secondary">Not Listesi</button>
                            <button type="button" className="btn btn-secondary">Transcript</button>
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="fields">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="menu col-md-4">
                                    <div className="picture-field text-center">
                                        <img className="profile-picture" alt="profile_picture" src={formData.picture}/>
                                        <input className="m-auto" type="file" name="picture" onChange={handlePictureChange} />
                                        <button onClick={() => handlePictureChange}>Submit</button>
                                        <br />
                                    </div>
                                </div>
                                <div className="col-md-1"></div>
                                <div className="main col-md-5">
                                    <div className="data-field">
                                        <form onSubmit={handleSubmit}>
                                            <div className="input-group">
                                                <label> Email: </label>
                                                <input
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label> Phone Number: </label>
                                                <input
                                                    type="tel"
                                                    name="phoneNumber"
                                                    value={formData.phoneNumber}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label> Current Password: </label>
                                                <input
                                                    type="password"
                                                    name="currentPassword"
                                                    value={formData.currentPassword}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label> New Password: </label>
                                                <input
                                                    type="password"
                                                    name="newPassword"
                                                    value={formData.newPassword}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <div className="input-group">
                                                <label> Confirm New Password: </label>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                />
                                            </div>
                                            <button type="submit">Submit</button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;