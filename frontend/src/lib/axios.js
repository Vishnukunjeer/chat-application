import axios from "axios";

// Detect if running locally (development) or deployed (production)
const isDevelopment = import.meta.env.MODE === "development";

// Create axios instance
export const axiosInstance = axios.create({
  baseURL: isDevelopment
    ? "http://localhost:5001/api"  // Your local backend
    : "https://chat-application-5svg.onrender.com/api", // Your deployed Render backend
  withCredentials: true, // keep cookies if needed
});
