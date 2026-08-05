import React from 'react'

function Login() {
  return (
    <div  className='w-screen flex'>
        <div className='w-[30vw]'>
            Login
        </div>
        <div className='w-[70vw] relative overflow-hidden'>
            <img src='/soft-hexagon.svg' alt='hexa' className='w-[200px] h-[200px]' />
        </div>
    </div>
  )
}

export { Login }