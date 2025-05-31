import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "development"
      ? "http://localhost:5001/api"
      : "https://doctor-booking-application-backend.onrender.com/api",
  withCredentials: true,
});
