import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'

function Loading() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <BiLoaderAlt className="text-[25px] mb-2 transform animate-spin"/>
        <span className='flex items-center'>Loading your <p className=" text-4xl font-semibold">Tool<span className="text-[#55828b]">Box</span></p>
</span>
    </div>
  )
}

export { Loading }