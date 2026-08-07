import React from 'react'
import { HiBars3BottomRight } from "react-icons/hi2";
function NavBar({setMobileOpen}) {
  return (
    <div className='w-screen py-2 md:hidden h-[10vh] flex justify-between px-4'>
          <p className=" text-2xl font-semibold">Tool<span className="text-[#55828b]">Box</span></p>
           <button onClick={()=>{setMobileOpen(true)}}> <HiBars3BottomRight/></button>
    </div>
  )
}

export { NavBar }