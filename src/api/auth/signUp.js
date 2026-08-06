import { axiosInstance } from "../axios"

const signUpUser = async(data) =>{
    const response = await axiosInstance.post("/auth/signUp",data)
    return response?.data
}
export {signUpUser}