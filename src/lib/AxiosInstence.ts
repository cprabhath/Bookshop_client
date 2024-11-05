import axios from "axios";

const BASEURL = import.meta.env.VITE_REACT_APP_API_URL;

const AxiosInstance = axios.create({
    baseURL: BASEURL,
    headers: {
        "Content-Type": "application/json",
    },
});

export default AxiosInstance;