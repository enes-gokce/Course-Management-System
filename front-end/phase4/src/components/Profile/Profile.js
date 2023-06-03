// Profile.js
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import "./Profile.css"
import ProfileService from "../services/ProfileService";

function Profile(){

    const token = sessionStorage.getItem('token');
    const profile_id = JSON.parse(sessionStorage.getItem('user')).profile_id;

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
        ProfileService.getProfilePicture(profile_id, token).then(response => {
            const pictureBlob = new Blob([response.data], { type: 'image/jpeg' });
            setPictureURL(URL.createObjectURL(pictureBlob));
        })

    }, [token, profile_id])

    useEffect(() => {
        ProfileService.getProfileById(profile_id, token).then(response => {
            setFormData({
                ...formData,
                email: response.data.email,
                phoneNumber: response.data.phone_number
            })
        })
    }, [token, profile_id])


    /*function handleChange(event){
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };*/

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    function handlePictureChange(event){
        const file = event.target.files[0];
        setFile(file);
        setPictureURL(URL.createObjectURL(file));
    }

    const  handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission here, e.g. send data to server

        const { currentPassword, newPassword, confirmPassword } = formData;

        if (currentPassword === 'passwordFromProfile') { // Replace 'passwordFromProfile' with the actual password from the profile
            // Check if new password and confirm new password are not empty and match
            if (newPassword.trim() !== '' && newPassword === confirmPassword) {
                // Update password in the database
                updatePasswordInDatabase(newPassword);
            }
        }


        if (currentPassword === 'passwordFromProfile') { // Replace 'passwordFromProfile' with the actual password from the profile
            // Filter out empty values from formData
            const updatedData = Object.fromEntries(
                Object.entries(formData).filter(([key, value]) => value.trim() !== '' && key !== 'currentPassword')
            );

        updateProfileInDatabase(updatedData);
    };

    const updateProfileInDatabase = (updatedData) => {
        // Perform your API call or database update here to save the updated profile data
        // You can use libraries like Axios or fetch to make the HTTP request
        // Pass the updatedData object to the API endpoint or database update function

        console.log(updatedData); // Just for testing, you can remove this line
    };

    const updatePasswordInDatabase = (newPassword) => {
        // Perform your API call or database update here to update the password
        // Pass the newPassword to the API endpoint or database update function
        console.log('Updating password:', newPassword); // Just for testing, you can remove this line
    };

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
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Ders Kayıt</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/grades")}>Not Listesi</button>
                            <button type="button" className="btn btn-secondary">Transcript</button>
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
}

export default Profile;