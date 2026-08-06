import { axiosInstance } from "../axios";
const loginUser = async(data) => {
    const response = await axiosInstance.post("/auth/login",data);
    return response?.data;
}
export {loginUser}