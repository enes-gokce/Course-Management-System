import React from 'react';
import {Link, useNavigate} from 'react-router-dom';

function Navbar(props){

    const navigate = useNavigate();

    function logOut(){
        sessionStorage.setItem('token', null);
        sessionStorage.setItem('user', null);
        navigate("/");
    }

    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/contact">Contact</Link>
                </li>
                <li>
                    <button onClick={logOut} className="btn btn-danger">Log out</button>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
