import { axiosHeader } from "../axios.js";
const getAdmin = async() =>{
    const response = await axiosHeader.post("/admin/getAdmin")
    return response
}

export {getAdmin}