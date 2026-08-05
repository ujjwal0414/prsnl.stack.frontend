import { Navigate, Outlet } from "react-router";
export const PrivateComponent = () =>{
    const isAuthenticated = false;
    return(<>
    {
        isAuthenticated ? <Outlet/> : <Navigate to={"/login"} />
    }
    </>)
}