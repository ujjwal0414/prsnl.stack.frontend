import React, { useState } from 'react'

function SelectCountry({countryValue,setValue,setCountryValue,showCountryValues}) {
    
  return (
    <div className='w-[30%] relative '>
        <span>{countryValue}</span>
        {
            showCountryValues && <div>More values here</div>
        }
    </div>
  )
}

export { SelectCountry }