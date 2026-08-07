import { axiosHeader } from "../axios.js";
const getAdmin = async() =>{
    const response = await axiosHeader.get("/admin/getAdmin")
    return response
}
const getClient = async() =>{
    const response = await axiosHeader.get("/admin/getAdmin")
    return response
}
const getVendor = async() =>{
    const response = await axiosHeader.get("/admin/getAdmin")
    return response
}
export {getAdmin,getClient,getVendor}