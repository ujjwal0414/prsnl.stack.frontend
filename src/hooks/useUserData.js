import {create} from "zustand";
import {devtools,persist} from "zustand/middleware"
const userStore = (set) => ({
    refreshToken:null,
    role:"",
    profileData:null,
    setRefreshToken: (token) => set({refreshToken:token}),
    setRole:(role)=>set({role:role}),
    setProfileData:(data)=>set({profileData:data})
});
const useUserStore = create(
    devtools(
        persist(userStore,{
            name:"userToken"
        })
    )
)
export {useUserStore}