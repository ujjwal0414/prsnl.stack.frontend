import { IoHome } from "react-icons/io5";
const sideBarData = [{
    name: "Home",
    icon: <IoHome />,
    subMenu: [],
    role:["admin","vendor","client"]
}, {
    name: "Projects",
    role:["admin","client"],
    icon: <IoHome />,
    subMenu: [{
        name: "Live Services",
        role:["admin","client"],
        icon: <IoHome />
    }, {
        name: "All Services",
        icon: <IoHome />,
        role:["admin","client"]
    }, {
        name: "Pending Approval",
        icon: <IoHome />,
        role:["client"]
    }]
}, {
    name: "Dashboard",
    icon: <IoHome />,
    subMenu: [],
    role:["admin","vendor","client"]
}, {
    name: "Contact Us",
    icon: <IoHome />,
    role: ["client","vendor"],
    subMenu:[]
},{
    name: "Requests",
    icon: <IoHome />,
    role: ["admin"],
    subMenu:[]
},{
    name: "Settings",
    icon: <IoHome />,
    role: ["client","vendor","admin"],
    subMenu:[]
},{
    name: "Chats",
    icon: <IoHome />,
    role: ["client","vendor","admin"],
    subMenu:[]
}]
export {sideBarData}