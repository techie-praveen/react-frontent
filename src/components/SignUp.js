import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignUp() {
    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "USER",
    });

    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        setError("");

        try {
            const res = await axios.post("http://localhost:8080/api/signup", form);

            setMessage(res.data.message);

            // redirect to login after success
            setTimeout(() => {
                navigate("/");
            }, 1500);
        } catch (err) {
            setError("Signup failed. Try again.");
        }
    };

    return (
        <div
            style={{
                width: "320px",
                margin: "100px auto",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                textAlign: "center",
            }}
        >
            <h2>Sign Up</h2>

            <form onSubmit={handleSubmit}>
                {/* USERNAME */}
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    required
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                    required
                />

                {/* ROLE */}
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
                >
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="HR">HR</option>
                </select>

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "10px",
                        background: "green",
                        color: "white",
                        border: "none",
                        cursor: "pointer",
                    }}
                >
                    Sign Up
                </button>
            </form>

            {/* SUCCESS MESSAGE */}
            {message && <p style={{ color: "green" }}>{message}</p>}

            {/* ERROR MESSAGE */}
            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* BACK TO LOGIN */}
            <p style={{ marginTop: "15px" }}>
                Already have an account?{" "}
                <Link to="/" style={{ color: "blue", fontWeight: "bold" }}>
                    Login
                </Link>
            </p>
        </div>
    );
}

export default SignUp;