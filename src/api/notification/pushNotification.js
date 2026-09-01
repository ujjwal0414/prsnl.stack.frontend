import { axiosHeader } from "../axios";
const pushNotification = async(data)=>{
    const response = await axiosHeader.post("/admin/pushNotification",data);
    return response?.data
}
export {pushNotification}