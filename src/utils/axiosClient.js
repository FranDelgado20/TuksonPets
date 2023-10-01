import axios from "axios";

const token = JSON.parse(localStorage.getItem("token")) || ""

const clientAxios = axios.create({
    // baseURL: import.meta.VITE_URL_LOCAL
    baseURL: "http://localhost:3000"
})

export const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    }
}

export default clientAxios