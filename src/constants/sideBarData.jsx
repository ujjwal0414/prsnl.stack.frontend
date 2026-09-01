import { IoHome } from "react-icons/io5";
import { FaChevronDown } from "react-icons/fa6";
import { GoProjectSymlink } from "react-icons/go";
import { SiKdenlive } from "react-icons/si";
import { MdOutlineCallToAction } from "react-icons/md";
import { MdPendingActions } from "react-icons/md";
import { MdOutlineDashboard } from "react-icons/md";
import { MdContacts } from "react-icons/md";
import { IoGitPullRequestSharp } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { IoChatbubbles } from "react-icons/io5";
import { GrDocumentUpdate } from "react-icons/gr";
import { IoPricetagsOutline } from "react-icons/io5";
export const sideBarData = [
  {
    name: "Home",
    path: "",
    icon: <IoHome />,
    role: ["admin", "vendor", "client"],
  },
  {
    name: "Projects",
    icon: <GoProjectSymlink />,
    role: ["admin", "client"],
    children: [
      {
        name: "Live Services",
        path: "/projects/live-services",
        icon: <SiKdenlive />,
        role: ["admin", "client"],
      },
      {
        name: "All Services",
        path: "/projects/all-services",
        icon: <MdOutlineCallToAction />,
        role: ["admin", "client"],
      },
      {
        name: "Pending Approval",
        path: "/projects/pending-approval",
        icon: <MdPendingActions />,
        role: ["client"],
      },
    ],
  },
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <MdOutlineDashboard />,
    role: ["admin", "vendor", "client"],
  },
  {
    name: "Contact Us",
    path: "/contactus",
    icon: <MdContacts />,
    role: ["client", "vendor"],
  },
  {
    name: "Requests",
    path: "/requests",
    icon: <IoGitPullRequestSharp />,
    role: ["admin"],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <IoSettingsOutline />,
    role: ["client", "vendor", "admin"],
  },
  {
    name: "Chats",
    path: "/chats",
    icon: <IoChatbubbles />,
    role: ["client", "vendor", "admin"],
  },
  {
    name: "Update Details",
    path: "/updateDetails",
    icon: <GrDocumentUpdate />,
    role: [ "vendor"],
  },
  {
    name: "Create Service",
    path: "/createService",
    icon: <GrDocumentUpdate />,
    role: [ "vendor"],
  },
  {
    name: "Pricing",
    path: "/pricing",
    icon: <IoPricetagsOutline />,
    role: [ "vendor","client"],
  }
];