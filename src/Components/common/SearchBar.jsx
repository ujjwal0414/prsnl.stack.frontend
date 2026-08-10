import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { FaAngleDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa";
import { vendorStatus } from '../../constants/status';
function SearchBar() {
    const [isStatusOpen,setStatusOpen] = useState(false)
    const [vendorOnlineStatus,setOnlineStatus] = useState(0);
    return (
        <div className='bg-white lg:w-[90%] justify-evenly w-[95%] gap-2 lg:gap-0 rounded-lg py-3 px-2 flex items-center'>
            <div className='relative w-[90%]'>
                <input type='text' className='w-full bg-gray-100 outline-none focus:border focus:border-[#87bba2] rounded-lg p-3' placeholder='Type something to search' />
                <div className='absolute top-1/2 mr-2 -translate-y-1/2 gap-2 flex items-center right-0'>
                    <button className='bg-white shadow px-2 py-1 rounded-md text-gray-500'>Filters</button>
                <button className='bg-white shadow px-2 py-1 rounded-md text-gray-500'>
                    <CiSearch className='text-[22px]'/>
                </button>
                </div>
                
            </div>
            <button className='flex flex-col  text-gray-300'>
                <span className= "flex items-center gap-1 text-gray-500">
                    <span>Status</span>
                <span>{isStatusOpen ? <FaChevronUp/> : <FaAngleDown/>}</span>
                </span>
                <span className={`text-start text-[12px] font-semibold text-ellipsis text-nowrap ${vendorStatus[vendorOnlineStatus]?.className || ""}`}>{vendorStatus[vendorOnlineStatus]?.status || "Unknown"}</span>
            </button>
        </div>
    )
}

export { SearchBar }