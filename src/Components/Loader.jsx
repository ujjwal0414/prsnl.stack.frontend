import { BiLoaderAlt } from "react-icons/bi";
export const Loader = () => {
    return(<div className="w-screen bg-[#f1faee] flex justify-center items-center h-screen">
        <span className="flex flex-col">
            <BiLoaderAlt className="text-[14px]"/>
            <p>Wait before we set up things for you...</p>
        </span>
    </div>)
}