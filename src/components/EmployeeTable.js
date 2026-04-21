import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeTable() {

    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(5);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");

    // Load data whenever page or size changes
    useEffect(() => {
        loadEmployees();
    }, [page, size]);

    const loadEmployees = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/employees`,
                {
                    params: {
                        search: search,
                        page: page,
                        size: size
                    }
                }
            );

            setEmployees(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log("Error fetching employees", error);
        }
    };

    // Search button
    const handleSearch = () => {
        setPage(0);
        loadEmployees();
    };

    // Page size change
    const handleSizeChange = (e) => {
        setSize(Number(e.target.value));
        setPage(0);
    };

    return (
        <div style={{ width: "85%", margin: "40px auto", fontFamily: "Arial" }}>

            <h2>Employee Management</h2>

            {/* SEARCH SECTION */}
            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="Search employee name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "8px", width: "250px" }}
                />

                <button
                    onClick={handleSearch}
                    style={{ marginLeft: "10px", padding: "8px" }}
                >
                    Search
                </button>
            </div>

            {/* PAGE SIZE DROPDOWN */}
            <div style={{ marginBottom: "15px" }}>
                <label style={{ marginRight: "10px" }}>Page Size:</label>

                <select
                    value={size}
                    onChange={handleSizeChange}
                    style={{ padding: "6px" }}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                </select>
            </div>

            {/* TABLE */}
            <table border="1" width="100%" cellPadding="10">
                <thead style={{ backgroundColor: "#f2f2f2" }}>
                <tr>
                    <th>ID</th>
                    <th>Employee Name</th>
                    <th>Designation</th>
                    <th>Department</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {employees.length > 0 ? (
                    employees.map((emp) => (
                        <tr key={emp.employeeId}>
                            <td>{emp.employeeId}</td>
                            <td>{emp.employeeName}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.department?.departmentName}</td>
                            <td>{emp.status}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5" style={{ textAlign: "center" }}>
                            No Data Found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* PAGINATION CONTROLS */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>

                <button
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 0}
                    style={{ padding: "6px 12px", marginRight: "10px" }}
                >
                    ⬅ Prev
                </button>

                <span>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page + 1 >= totalPages}
                    style={{ padding: "6px 12px", marginLeft: "10px" }}
                >
                    Next ➡
                </button>

            </div>

        </div>
    );
}

export default EmployeeTable;