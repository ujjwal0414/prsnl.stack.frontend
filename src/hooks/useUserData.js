import {create} from "zustand";
import {devtools,persist} from "zustand/middleware"
const userStore = (set) => ({
    refreshToken:null,
    role:"",
    setRefreshToken: (token) => set({refreshToken:token}),
    setRole:(role)=>set({role:role})
});

const useUserStore = create(
    devtools(
        persist(userStore,{
            name:"userToken"
        })
    )
)
export {useUserStore}