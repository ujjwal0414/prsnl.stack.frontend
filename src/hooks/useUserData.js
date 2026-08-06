import {create} from "zustand";
import {devtools,persist} from "zustand/middleware"
const userStore = (set) => ({
    refreshToken:null,
    setRefreshToken: (token) => set((state)=>({
        refreshToken:token
    })),
});

const useUserStore = create(
    devtools(
        persist(userStore,{
            name:"userToken"
        })
    )
)
export {useUserStore}