import { useMutation, useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { getAdmin } from "../api/auth/checkAuth";
import { Loading } from "../Components/Loading";

const AdminLayout = () =>{
    const {data,error,isPending,isSuccess} = useQuery({
        queryFn:getAdmin,
        queryKey:["getAdmin"]
    })
    if(isPending){
        return(<>
        <Loading/></>)
    }
    if(error?.response?.status == 401){
        return(<div></div>)
    }
    return(<>
    Admin layout
    </>)
}
export {AdminLayout}