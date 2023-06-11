import React, {useEffect, useState} from 'react';
import Navbar from '../Navbar/Navbar';
import Menu from '../Menu/Menu';
import './Courses.css';

function Courses() {

    const token = sessionStorage.getItem('token');
    const user_id = JSON.parse(sessionStorage.getItem('user')).user_id;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enteredInfo, setEnteredInfo] = useState('');
    const [showStudents, setShowStudents] = useState(false);

    const [courses, setCourses] = useState([]);
    const [students, setStudents] = useState([]);

    const [sectionId, setSectionId] = useState();

    useEffect(() => {

    }, [user_id, token, sectionId, showStudents])

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleInputChange(event) {
        setEnteredInfo(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        console.log('Entered information:', enteredInfo);
        closeModal();
    }

    function handleShowStudents(section_id){
        setSectionId(section_id);
        setShowStudents(true);
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
                        <div className="courses">
                            <h3>Courses</h3>
                            <div>
                                <table className="table table-striped table-hover">
                                    <thead>
                                    <tr>
                                        <th>Section ID</th>
                                        <th>Course Code</th>
                                        <th>Course Title</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {courses.map((course) => (
                                        <tr key={course.section_id}>
                                            <td>{course.code}</td>
                                            <td>{course.title}</td>
                                            <td><button onClick={() => handleShowStudents(course.section_id)}>Show Students</button></td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                                <button className="btn btn-danger btn-modal" onClick={openModal}>
                                    Open Information Box
                                </button>
                                {isModalOpen && (
                                    <div className="mdl-overlay">
                                        <div className="mdl">
                                            <h2>Information Box</h2>
                                            <form onSubmit={handleSubmit}>
                                                <input type="text" value={enteredInfo} onChange={handleInputChange} />
                                                <div className="modal-buttons">
                                                    <button type="submit">Submit</button>
                                                    <button onClick={closeModal}>Close</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Courses;