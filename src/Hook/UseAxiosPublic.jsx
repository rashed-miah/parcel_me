import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://delivery-point-server.vercel.app",
});
const UseAxiosPublic = () => {
  return axiosInstance;
};

export default UseAxiosPublic;
