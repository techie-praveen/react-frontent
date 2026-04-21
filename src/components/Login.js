import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";
import "../styles/Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8080/api/login",
                { username, password }
            );

            localStorage.setItem("token", response.data.token);
            navigate("/employees");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div className="login-container">

            <h2 className="login-title">Login</h2>

            <form onSubmit={handleLogin}>

                {/* Username */}
                <div className="input-box">
                    <FaUser className="icon" />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                {/* Password */}
                <div className="input-box">
                    <FaLock className="icon" />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Button */}
                <button type="submit" className="login-button">
                    <FaSignInAlt />
                    Login
                </button>

            </form>

            {/* ERROR */}
            {error && <p className="error-text">{error}</p>}

            {/* SIGNUP */}
            <p className="signup-text">
                New user? <Link to="/signup">Create User</Link>
            </p>

        </div>
    );
}

export default Login;