import { create } from "zustand";
const deviceStore = (set) => ({
    deviceInformation:{},
    setDeviceInformation:(data) => {
        (state) => ({
            deviceInformation:data
        })
    }
});
const useDeviceInformation = create(deviceStore);
export {useDeviceInformation}