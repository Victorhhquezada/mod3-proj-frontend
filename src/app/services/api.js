import axios from "axios";

//indica si está deployada o no
const isProduction = process.env.NODE_ENV === "production";

const baseURL = isProduction ? "https://brgr-club.herokuapp.com/api" : "http://localhost:3001/api";

axios.defaults.withCredentials = true

export const _api = axios.create ({
    baseURL,
    timeout:10000
})