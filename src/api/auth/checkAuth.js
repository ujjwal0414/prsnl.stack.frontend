import { axiosHeader } from "../axios.js";
const getAdmin = async() =>{
    const response = await axiosHeader.get("/admin/getAdminAuth")
    return response
}
const getClient = async() =>{
    const response = await axiosHeader.get("/client/getClientAuth")
    return response
}
const getVendor = async() =>{
    const response = await axiosHeader.get("/vendor/getVendorAuth")
    return response
}
export {getAdmin,getClient,getVendor}