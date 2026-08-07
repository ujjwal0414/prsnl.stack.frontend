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
}else{
    if(data){
        console.log(data?.data);
        
    }
}

return <Outlet />;
}
export {AdminLayout}