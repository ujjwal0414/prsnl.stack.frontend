import { create } from "zustand";
const deviceStore = (set) => ({
    deviceInformation:{},
    setDeviceInformation:(data) => set((state) => ({deviceInformation:data}))
});
const useDeviceInformation = create(deviceStore);
export {useDeviceInformation}