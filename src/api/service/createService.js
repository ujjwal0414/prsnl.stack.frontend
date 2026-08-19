import { axiosHeader } from "../axios.js";
const createVendorService = async(data)=>{
    const response = await axiosHeader.post("/vendor/createService,data");
    return response?.data
}