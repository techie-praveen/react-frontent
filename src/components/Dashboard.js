import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
    const [data, setData] = useState({});

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/dashboard")
            .then((response) => setData(response.data));
    }, []);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Dashboard</h1>
            <p>Total Employees: {data.totalEmployees}</p>
            <p>Active Departments: {data.activeDepartments}</p>
            <p>Pending Tasks: {data.pendingTasks}</p>
            <p>Monthly Revenue: {data.monthlyRevenue}</p>
        </div>
    );
}

export default Dashboard;