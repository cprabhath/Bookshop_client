import axios from "axios";

const BASEURL = import.meta.env.VITE_REACT_APP_API_URL;

// Function to get the token (with a fallback if it's not present or invalid)
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    // Handle the case where the token is missing, e.g., redirect to login
    console.warn("No token found");
    return "";
  }
  return token;
};

// Create an Axios instance with the base URL
const AxiosInstance = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to add the Authorization header with the token
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors (e.g., token expiration)
AxiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if the error is related to token expiration
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized. Token might have expired.");
      // Implement logic to refresh the token here (e.g., request a new token)
      // If a refresh token is available, use it to get a new access token
      // Then retry the original request with the new token

      // For example, redirect to login screen if necessary:
      // window.location.href = "/login";

      // If you have a refresh token system, you can call a refresh API here
    }

    // Handle other types of errors (network, server errors, etc.)
    if (!error.response) {
      // Network error
      console.error("Network error. Please check your internet connection.");
    } else {
      console.error(`Error: ${error.response.status} - ${error.response.data.message}`);
    }

    return Promise.reject(error);
  }
);

export default AxiosInstance;
