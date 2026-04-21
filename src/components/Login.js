import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

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
                {
                    username,
                    password,
                }
            );

            localStorage.setItem("token", response.data.token);
            navigate("/employees");
        } catch (err) {
            setError("Invalid username or password");
        }
    };

    return (
        <div
            style={{
                width: "350px",
                margin: "100px auto",
                padding: "30px",
                borderRadius: "12px",
                boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
                backgroundColor: "#fff",
                fontFamily: "Arial, sans-serif",
            }}
        >
            <h2
                style={{
                    textAlign: "center",
                    marginBottom: "25px",
                    color: "#333",
                }}
            >
                Login
            </h2>

            <form onSubmit={handleLogin}>
                {/* Username */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "10px",
                        marginBottom: "15px",
                    }}
                >
                    <FaUser style={{ marginRight: "10px", color: "#555" }} />
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                            fontSize: "14px",
                        }}
                    />
                </div>

                {/* Password */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "10px",
                        marginBottom: "20px",
                    }}
                >
                    <FaLock style={{ marginRight: "10px", color: "#555" }} />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{
                            border: "none",
                            outline: "none",
                            width: "100%",
                            fontSize: "14px",
                        }}
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "16px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <FaSignInAlt />
                    Login
                </button>
            </form>

            {error && (
                <p
                    style={{
                        color: "red",
                        marginTop: "15px",
                        textAlign: "center",
                    }}
                >
                    {error}
                </p>
            )}
            <p style={{ marginTop: "15px" }}>
                New user?{" "}
                <Link to="/signup" style={{ color: "green", fontWeight: "bold" }}>
                    Create User
                </Link>
            </p>
        </div>
    );
}

export default Login;