import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://doctor-booking-application-backend.onrender.com",
  withCredentials: true,
});
