import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apiv2.ravatraacademy.id",
  // baseURL: "http://localhost:8000",
  timeout: 10000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
  },
});

export default axiosInstance;
