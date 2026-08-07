import { useMutation, useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import { getAdmin } from "../api/auth/checkAuth";
import { Loading } from "../Components/Loading";
import { UnAuth } from "../Components/UnAuthPage";
import { useUserStore } from "../hooks/useUserData";

const AdminLayout = () =>{
    const { data, isPending, isError, error } = useQuery({
    queryKey: ["getAdmin"],
    queryFn: getAdmin,
});
const role = useUserStore((state)=>state.role)
if (isPending) return <Loading />;

if (isError) {
    console.log(error?.response);
    
    if (error.response?.status === 401) {
        return <UnAuth />;
    }

    return <div>Something went wrong.</div>;
}
if(data){
        const {role:userRole} =data?.data?.data;
        if(role != userRole){
            return (<div className="w-screen h-screen flex flex-col justify-center items-center">
                <img  src="/role.svg" alt="unauth role" className="w-50 h-50"/>
                <span>Unauthorized role detected</span>
            </div>)
        }
        
    }
return <Outlet />;
}
export {AdminLayout}