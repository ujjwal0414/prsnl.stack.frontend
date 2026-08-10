import React from 'react'
import { SliderDemo } from '../../common/SliderDemo'

function VendorHero() {
    return (
        <div className='bg-white lg:w-[90%] mt-4 w-[95%] rounded-lg py-3 px-2 flex flex-col lg:flex-row '>
            <div className='lg:w-[80%] h-[65vh] w-full' aria-label='hero image section'>
                <SliderDemo />
            </div>
            <div className='flex flex-1 py-2 lg:gap-3 h-full lg:flex-col' aria-label='vendor counts'>
                <span className='bg-gray-200 lg:mx-2 w-[90%] h-full px-4 py-3  rounded-3xl flex flex-col'>
                    <span>4123</span>
                    <span className='text-3xl text-gray-700'>Vendors</span>
                    <span className='text-sm'>These may vendors registered with us and lead there service reachable to many users via our platform</span>
                </span>
                <span className='bg-gray-200 mx-2 w-[90%] h-full px-4 py-3  rounded-3xl flex flex-col'>
                    <span>400</span>
                    <span className='text-3xl text-gray-700'>Services</span>
                    <span className='text-sm'>These many services we execute per day via our platform</span>

                </span>
                <span className='bg-gray-200 mx-2 w-[90%] h-full px-4 py-3  rounded-3xl flex flex-col'>
                    <span>4123</span>
                    <span className='text-3xl text-gray-700'>Vendors</span>
                </span>
            </div>
        </div>
    )
}

export { VendorHero }