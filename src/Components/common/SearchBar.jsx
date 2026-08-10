import React from 'react'

function SearchBar() {
  return (
    <div className='bg-white w-[90%] flex items-center'>
        <input type='text' className='w-[90%] p-3' placeholder='Type something to search'/>
    </div>
  )
}

export { SearchBar }