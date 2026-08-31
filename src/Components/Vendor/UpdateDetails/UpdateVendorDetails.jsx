import React from 'react'
import useDocumentTitle from '../../../utils/useDocumentTitle'

function UpdateVendorDetails() {
  useDocumentTitle("Update Details")
  return (
    <div className='flex-1  h-screen flex flex-col items-center bg-[#F9F8F6] py-4'>
        Vendor detaisl goes here
    </div>
  )
}

export { UpdateVendorDetails }