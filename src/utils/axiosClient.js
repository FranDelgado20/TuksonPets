import axios from "axios";

const token = JSON.parse(sessionStorage.getItem("token")) || ""

const clientAxios = axios.create({
    baseURL: import.meta.env.VITE_URL_DEPLOY
})

export const config = {
    headers: {
        'Content-Type': 'application/json',
        'Authorization': token
    }
}

export default clientAxios