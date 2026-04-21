import React, { useState } from "react";
import axios from "axios";

function CreateUser() {

    const [form, setForm] = useState({
        username: "",
        password: "",
        role: "USER"
    });

    const [msg, setMsg] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("http://localhost:8080/api/users", form);
            setMsg(res.data.message);
        } catch (error) {
            setMsg("Error inserting user");
        }
    };

    return (
        <div style={{ width: "300px", margin: "100px auto" }}>
            <h2>Create User</h2>

            <form onSubmit={handleSubmit}>
                <input
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    required
                />
                <br /><br />

                <select name="role" onChange={handleChange}>
                    <option value="USER">USER</option>
                    <option value="ADMIN">ADMIN</option>
                    <option value="HR">HR</option>
                </select>

                <br /><br />

                <button type="submit">Create User</button>
            </form>

            <p>{msg}</p>
        </div>
    );
}

export default CreateUser;