import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import DepartmentTable from "./components/DepartmentTable";
import EmployeeTable from "./components/EmployeeTable.js";
import UsersTable from "./components/UsersTable";
function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/users" element={<UsersTable />} />
                <Route path="/departments" element={<DepartmentTable />} />
                <Route path="/employees" element={<EmployeeTable />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </Router>
    );
}

export default App;