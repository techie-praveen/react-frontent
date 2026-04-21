import React, { useEffect, useState } from "react";
import axios from "axios";

function UsersTable() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/users");
            setUsers(res.data);
        } catch (error) {
            console.log("Error fetching users");
        }
    };

    return (
        <div style={{ width: "80%", margin: "50px auto" }}>
            <h2>Users List</h2>

            <table border="1" width="100%" cellPadding="10">
                <thead style={{ background: "#f2f2f2" }}>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                    </tr>
                </thead>

                <tbody>
                    {users.map((user) => (
                        <tr key={user.userId}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>{user.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UsersTable;