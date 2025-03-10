import axios from "axios";

// Creating an Axios instance
const apiClient = axios.create({
  baseURL: "https://crm-app-akademia108-bf1127afa289.herokuapp.com", // Base API URL
  timeout: 10000, // Maximum response waiting time
});

// Adding request interceptor
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Retrieving the token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Adding the token to the header
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handling request errors
  }
);

// Handling responses (optional)
apiClient.interceptors.response.use(
  (response) => response, // Return response if it's correct
  (error) => {
    // Handling response errors (e.g., refreshing token, logging out user)
    if (error.response?.status === 401) {
      console.error("Session expired. Please log in again.");
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
