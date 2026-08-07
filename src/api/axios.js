import axios from "axios";
import { useUserStore } from "../hooks/useUserData";
 const axiosInstance  = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    timeout:10000
})
const axiosHeader = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL,
    timeout:10000,
    
})
axiosHeader.interceptors.request.use(
    (config) => {
        // Access the Zustand store state directly without the hook syntax
        const refreshToken = useUserStore.getState().refreshToken;

        if (refreshToken) {
            config.headers["Authorization"] = `Bearer ${refreshToken}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
export {axiosInstance,axiosHeader}
