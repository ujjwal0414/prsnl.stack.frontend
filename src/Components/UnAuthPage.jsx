import React from 'react'
import { BiLoaderAlt } from 'react-icons/bi'
import { Link } from 'react-router'

function UnAuth() {
  return (
    <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <img src='/unauth.svg' alt='unauth' className='w-50 h-50'/>
        <span>Unauthroized to access the page.<Link to={"/login"} className='text-sm text-[#87bba2] font-semibold'>Log in</Link></span>
    </div>
  )
}

export { UnAuth }