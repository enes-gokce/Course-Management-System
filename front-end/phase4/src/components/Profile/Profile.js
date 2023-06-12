// Profile.js
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import "./Profile.css"
import ProfileService from "../services/ProfileService";
import Menu from "../Menu/Menu";
import UserService from "../services/UserService";

function Profile(){

    const token = sessionStorage.getItem('token');
    const profile_id = JSON.parse(sessionStorage.getItem('user')).profile_id;
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;

    const [file, setFile] = useState();
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
    const [pictureURL, setPictureURL] = useState("");

    const navigate = new useNavigate();

    useEffect(() => {
        ProfileService.getProfileById(profile_id, token).then(response => {
            setFormData({
                ...formData,
                email: response.data.email,
                phoneNumber: response.data.phone_number
            })
        })
        ProfileService.getProfilePicture(profile_id, token).then(response => {
            const pictureBlob = new Blob([response.data], { type: 'image/jpeg' });
            setPictureURL(URL.createObjectURL(pictureBlob));
        })
    }, [token, profile_id])

    function handleChange(event){
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    function handlePictureChange(event){
        const file = event.target.files[0];
        setFile(file);
        setPictureURL(URL.createObjectURL(file));
    }

    function handleSubmit(event){
        event.preventDefault();
        // Handle form submission here, e.g. send data to server
        console.log(formData);
        const buttonClicked = event.nativeEvent.submitter;

        if(buttonClicked.id === "btn-password"){
            if(formData.newPassword === formData.confirmPassword){
                let passwordDto = {current_password: formData.currentPassword, new_password: formData.newPassword}
                UserService.updatePassword(user_id, token, passwordDto).then(response => {
                    if(response.data.token === "success"){
                        window.location.reload();
                    }
                    else{
                        alert("Your current password is wrong. Please control it!")
                    }
                });
            }
            else{
                alert("New password and confirm new password does not match. Please control them!")
            }
        }
        else if(buttonClicked.id === "btn-email-phone"){
            let email_phoneDto = {email: formData.email, phone_number: formData.phoneNumber}
            ProfileService.updateProfile(token, profile_id, email_phoneDto);
            window.location.reload();
        }
    }

    function handleUpload(){
        const pictureFormData = new FormData();
        pictureFormData.append('file', file);
        ProfileService.uploadProfilePicture(token, profile_id, pictureFormData)
        window.location.reload();
    }

    return (
        <div>
            <Navbar imgSource={formData.picture}/>
            <div className="container-fluid container_profile">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <Menu />
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="fields">
                            <div className="row">
                                <div className="col-md-1"></div>
                                <div className="menu col-md-4">
                                    <div className="picture-field text-center">
                                        <img className="profile-picture" alt="profile_picture" src={pictureURL}/>
                                        <input className="m-auto" type="file" name="picture" onChange={handlePictureChange} />
                                        <br />
                                        <br />
                                        <button className="btn btn btn-secondary btn-sm" onClick={() => handleUpload()}>Upload</button>
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
                                            <button id="btn-email-phone" className="btn btn-sm btn-success me-2" type="submit">Update Email / Phone Number</button>
                                            <button id="btn-password" className="btn btn-sm btn-success" type="submit">Update Password</button>
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