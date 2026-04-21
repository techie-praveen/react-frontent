import React, {useEffect, useState} from "react";
import axios from "axios";

function DepartmentTable() {

    const [departments, setDepartments] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [search, setSearch] = useState("");

    const size = 5;

    useEffect(() => {
        loadData();
    }, [page]);

    const loadData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:8080/api/departments?search=${search}&page=${page}&size=${size}`
            );

            setDepartments(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (err) {
            console.log("Error fetching data");
        }
    };

    const handleSearch = () => {
        setPage(0); // reset to first page
        loadData();
    };

    return (
        <div style={{width: "80%", margin: "50px auto"}}>

            <h2>Department List (Search + Pagination)</h2>

            {/* SEARCH BOX */}
            <div style={{marginBottom: "15px"}}>
                <input
                    type="text"
                    placeholder="Search department..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{padding: "8px", width: "250px"}}
                />

                <button
                    type="button"
                    onClick={handleSearch}
                    style={{marginLeft: "10px", padding: "8px"}}
                >
                    Search
                </button>
            </div>

            {/* TABLE */}
            <table border="1" width="100%" cellPadding="10">
                <thead style={{background: "#f2f2f2"}}>
                <tr>
                    <th>ID</th>
                    <th>Department Name</th>
                    <th>Location</th>
                    <th>Status</th>
                </tr>
                </thead>

                <tbody>
                {departments.length > 0 ? (
                    departments.map((dept) => (
                        <tr key={dept.departmentId}>
                            <td>{dept.departmentId}</td>
                            <td>{dept.departmentName}</td>
                            <td>{dept.location}</td>
                            <td>{dept.status}</td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="4" style={{textAlign: "center"}}>
                            No Data Found
                        </td>
                    </tr>
                )}
                </tbody>
            </table>

            {/* PAGINATION */}
            <div style={{marginTop: "20px", textAlign: "center"}}>

                <button
                    type="button"
                    onClick={() => setPage((prev) => prev - 1)}
                    disabled={page === 0}
                >
                    ⬅ Prev
                </button>

                <span style={{margin: "0 10px"}}>
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

export default DepartmentTable;