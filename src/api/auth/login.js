import { axiosInstance } from "../axios";
const loginUser = async(data) => {
    const response = await axiosInstance("/auth/login",data);
    return response;
}