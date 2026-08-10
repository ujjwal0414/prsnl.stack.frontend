import React from 'react'
import { SearchBar } from '../../common/SearchBar'

function VendorHome() {
  return (
    <div className='flex-1  h-screen flex flex-col items-center bg-[#F9F8F6] py-4'>
        <SearchBar/>
    </div>
  )
}

export { VendorHome }