import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

const login = (data) => {
    return axios.post(`${API_URL}/login`, data);
};

export default { login };