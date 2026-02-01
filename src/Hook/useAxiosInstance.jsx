import axios from "axios";
import React from "react";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosInstance = () => {
  return axiosSecure;
};

export default useAxiosInstance;
