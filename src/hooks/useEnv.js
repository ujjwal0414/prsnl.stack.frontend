import {create} from "zustand";
import {devtools,persist} from "zustand/middleware"
const Environment = (set) => ({
    environment:import.meta.env.VITE_ENV || "prod"
})
const useEnv = create(Environment);
export {useEnv}