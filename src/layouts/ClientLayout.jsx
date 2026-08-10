import { useMutation, useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router";
import {  getClient } from "../api/auth/checkAuth";
import { Loading } from "../Components/Loading";
import { UnAuth } from "../Components/UnAuthPage";
import { useUserStore } from "../hooks/useUserData";
import { Sidebar } from "../Components/common/Sidebar";
import { NavBar } from "../Components/common/NavBar";
import { useState } from "react";

const ClientLayout = () =>{
    const { data, isPending, isError, error } = useQuery({
    queryKey: ["getClient"],
    queryFn: getClient,
});
const [mobileOpen, setMobileOpen] = useState(false);
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

return <div className="w-screen h-screen flex">
    <Sidebar role="client"
    mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}

    />

   <div className="flex flex-1 flex-col">
   <NavBar setMobileOpen = {setMobileOpen}/>
    <Outlet/>
   </div>
</div>;
}
export {ClientLayout}