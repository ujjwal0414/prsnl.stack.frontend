import { Navigate, Outlet } from "react-router";
import { useUserStore } from "../hooks/useUserData";
export const PrivateComponent = () =>{
    const userToken = useUserStore((state)=>state.refreshToken)
    const isAuthenticated = userToken ? true : false;
    return(<>
    {
        isAuthenticated ? <Outlet/> : <Navigate to={"/login"} />
    }
    </>)
}