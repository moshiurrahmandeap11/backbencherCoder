import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://server-backbencher-coder.onrender.com/api",
  timeout: 10000, // 10s
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, 
});


export default axiosInstance;
