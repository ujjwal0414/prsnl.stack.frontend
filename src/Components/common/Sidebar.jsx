import React, { useState } from 'react'

function Sidebar() {
    const [collapsed,setCollapsed] = useState(false);
  return (
    <div className='h-screen'>
        SideBar
    </div>
  )
}

export { Sidebar }