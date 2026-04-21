import React, { useEffect, useState } from "react";
import axios from "axios";

function EmployeeTable() {

    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");

    const size = 5;

    useEffect(() => {
        loadEmployees();
    }, [page]);

    const loadEmployees = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/employees?search=${search}&page=${page}&size=${size}`
            );

            setEmployees(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            console.log("Error fetching employees");
        }
    };

    const handleSearch = () => {
        setPage(0);
        loadEmployees();
    };

    return (
        <div style={{ width: "80%", margin: "50px auto" }}>

            <h2>Employee List (Search + Pagination)</h2>

            {/* SEARCH BOX */}
            <div style={{ marginBottom: "15px" }}>
                <input
                    type="text"
                    placeholder="Search employee name..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "8px", width: "250px" }}
                />

                <button
                    type="button"
                    onClick={handleSearch}
                    style={{ marginLeft: "10px", padding: "8px" }}
                >
                    Search
                </button>
            </div>

            {/* TABLE */}
            <table border="1" width="100%" cellPadding="10">
                <thead style={{ background: "#f2f2f2" }}>
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

            {/* PAGINATION */}
            <div style={{ marginTop: "20px", textAlign: "center" }}>

                <button
                    type="button"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 0}
                >
                    ⬅ Prev
                </button>

                <span style={{ margin: "0 10px" }}>
                    Page {page + 1} of {totalPages}
                </span>

                <button
                    type="button"
                    onClick={() => setPage((prev) => prev + 1)}
                    disabled={page + 1 === totalPages}
                >
                    Next ➡
                </button>

            </div>

        </div>
    );
}

export default EmployeeTable;