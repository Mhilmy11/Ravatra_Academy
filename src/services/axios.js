import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apiv2.ravatraacademy.id/api",
  timeout: 10000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
