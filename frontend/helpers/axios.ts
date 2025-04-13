import axios from "axios";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";

 export const publicInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" },
});

 const privateInstance = axios.create({
  baseURL: "http://localhost:3001/api",
  headers: { "Content-Type": "application/json" }, 
});

 export const useAxiosPrivate = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = privateInstance.interceptors.request.use(
      async (config) => {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      privateInstance.interceptors.request.eject(requestInterceptor);
    };
  }, [getToken]);

  return privateInstance;
};
