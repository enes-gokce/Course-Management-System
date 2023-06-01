import React, {useState} from "react";
import './Login.css';
import UserService from "../services/UserService";
import {useNavigate} from "react-router-dom";

function Login(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    async function handleLogin(e) {
        try {
            e.preventDefault();
            const response1 = await UserService.login(email, password);
            const token = response1.data.token;

            if (token !== "*" && token !== "null"){
                const response2 = await UserService.getUserByEmail(email, token);
                const userData = {
                    user_id: response2.data.user_id,
                    dept_id: response2.data.dept_id,
                    profile_id: response2.data.profile_id,
                };

                sessionStorage.setItem("token", token);
                sessionStorage.setItem("user", JSON.stringify(userData));
                navigate("/home");
            }
        } catch (error) {
            // Handle any errors
        }
    }
    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h3>Welcome to The Course Management System <br/> <br/> Login</h3>
                <input
                    type="text"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;