// Registration.js
import React, {useEffect, useState} from "react";
import Navbar from "../Navbar/Navbar";
import {useNavigate} from "react-router-dom";
import "./Registration.css";
import CourseService from "../services/CourseService";
import {all} from "axios";

function Registration() {

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;
    const navigate = new useNavigate();

    const [allCourses, setAllCourses] = useState([]);
    const [basket, setBasket] = useState([]);
    const [year, setYear] = useState(1);
    const [totalECTS, setTotalECTS] = useState(11);
    const [numberOfCourses, setNumberOfCourses] = useState(11);
    const [statusDto, setStatusDto] = useState({registrationStatus:"", advisorApprovalStatus:""})

    useEffect(() => {
        CourseService.getCurrentSemesterCourses(year, token).then(response => {
            setAllCourses(response.data);
        })
        CourseService.getAddedSectionsInBasket(user_id, token).then(response => {
            setBasket(response.data);
        })
        CourseService.getBasketStatistics(user_id, token).then(response => {
            setTotalECTS(response.data.totalECTS);
            setNumberOfCourses(response.data.numberOfCourses);
        })
        CourseService.getRegistrationStatus(user_id, token).then(response => {
            console.log(response.data)
            setStatusDto({registrationStatus: response.data.registration_status, advisorApprovalStatus: response.data.advisor_approval});
        })
    }, [user_id, token, year])

    function handleRegisteredCourse(course){
        setNumberOfCourses(numberOfCourses + 1);
        setTotalECTS(totalECTS + course.ects);
        setBasket(prevBasket => {
            return [...prevBasket, course]
        });
        CourseService.insertSectionToBasket(user_id, course.section_id, token);
    }

    function handleDroppedCourse(section_id, ects){
        CourseService.deleteSectionFromBasket(user_id, section_id, token);
        setNumberOfCourses(numberOfCourses + (-1));
        setTotalECTS(totalECTS + (-ects));
        let tempBasket = basket.filter(course => course.section_id !== section_id);
        setBasket(tempBasket.sort((a, b) => a.section_id - b.section_id));
    }

    function isCourseRegistered(section_id){
        if(basket.some(course => course.section_id === section_id)){
            return true;
        }
        else{
            return false;
        }
    }

    function handleRegistration(){
        const status = {registration_status: "registered", advisor_approval: statusDto.advisorApprovalStatus};
        CourseService.updateRegistrationStatus(user_id, token, status);
        basket.map(course => CourseService.updateSectionQuota(course.section_id, "decrease", token));
        window.location.reload();
    }
    return (
        <div>
            <Navbar />
            <div className="container-fluid container_registration">
                <div className="row">
                    <div className="menu col-md-2">
                        <div className="buttons">
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/registration")}>Course Registration</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/grades")}>Grades</button>
                            <button type="button" className="btn btn-secondary" onClick={() => navigate("/transcript")}>Transcript</button>
                        </div>
                    </div>
                    <div className="main col-md-10">
                        <div className="inside-container">
                            <h3>Course Registration</h3>
                            <div className="courses mt-3 mb-2">
                                <h5>Courses / Year {year}</h5>
                                <div className="year-buttons mb-2">
                                    <button className="btn btn-sm btn-secondary btn-year me-2" onClick={() => setYear(1)}>Year 1</button>
                                    <button className="btn btn-sm btn-secondary btn-year me-2" onClick={() => setYear(2)}>Year 2</button>
                                    <button className="btn btn-sm btn-secondary btn-year me-2" onClick={() => setYear(3)}>Year 3</button>
                                    <button className="btn btn-sm btn-secondary btn-year me-2" onClick={() => setYear(4)}>Year 4</button>
                                </div>
                                <div className="courses-table">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Course Code</th>
                                            <th>Course Title</th>
                                            <th>ECTS</th>
                                            <th>Section</th>
                                            <th>Quota</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {allCourses.map((course) => (
                                            <tr key={course.section_id}>
                                                <td>{course.code}</td>
                                                <td>{course.title}</td>
                                                <td>{course.ects}</td>
                                                <td>{course.section_id}</td>
                                                <td>{course.quota}</td>
                                                <td>{!isCourseRegistered(course.section_id) && statusDto.registrationStatus === "not registered" && <button className="btn btn-sm btn-success" onClick={() => handleRegisteredCourse(course)}>Add</button>}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            <div className="basket">
                                <div className="basket-header">
                                    <h5>Basket</h5>
                                    {statusDto.registrationStatus === "not registered" && <button className="btn btn-secondary btn-register" onClick={handleRegistration}>Register</button>}
                                </div>
                                <div className="basket-table">
                                    <table className="table table-striped table-hover">
                                        <thead>
                                        <tr>
                                            <th>Course Code</th>
                                            <th>Course Title</th>
                                            <th>ECTS</th>
                                            <th>Section</th>
                                            <th>Quota</th>
                                            <th></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {basket.sort((a, b) => a.section_id - b.section_id).map((course) => (
                                            <tr key={course.section_id}>
                                                <td>{course.code}</td>
                                                <td>{course.title}</td>
                                                <td>{course.ects}</td>
                                                <td>{course.section_id}</td>
                                                <td>{course.quota}</td>
                                                <td>{statusDto.registrationStatus === "not registered" && <button className="btn btn-sm btn-danger" onClick={() => handleDroppedCourse(course.section_id, course.ects)}>Drop</button>}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                                <div className="info-container">
                                    <h6 className="info"><b>Total ECTS:</b> {totalECTS}</h6>
                                    <h6 className="info"><b>Number of Courses:</b> {numberOfCourses}</h6>
                                    <h6 className="info"><b>Registration Status:</b> {statusDto.registrationStatus}</h6>
                                    <h6 className="info"><b>Advisor Approval Status:</b> {statusDto.advisorApprovalStatus}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Registration;