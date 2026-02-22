import axios from "axios";
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "https://delivery-point-server.vercel.app",
});

const useAxiosSecure = () => {
  const { user, logOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 🔐 REQUEST INTERCEPTOR
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        if (user?.accessToken) {
          config.headers.authorization = `Bearer ${user.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error),
    );

    // 🚫 RESPONSE INTERCEPTOR
    const responseInterceptor = axiosSecure.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error?.response?.status;

        if (status === 401) {
          await logOut();

          navigate("/login", { replace: true });
        }

        if (status === 403) {
          navigate("/forbidden", { replace: true });
        }

        return Promise.reject(error);
      },
    );

    // 🧹 CLEANUP (VERY IMPORTANT)
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
      axiosSecure.interceptors.response.eject(responseInterceptor);
    };
  }, [user, logOut, navigate]);

  return axiosSecure;
};

export default useAxiosSecure;
