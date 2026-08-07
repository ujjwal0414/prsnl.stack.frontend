import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getAdmin } from '../api/auth/checkAuth'

function Admin() {
    const {mutate,error,data} = useMutation({
        mutationFn:getAdmin,
        mutationKey:["getAdmin"]
    })
    
    useEffect(()=>{
        console.log(error?.response,data);
        
    },[error,data])
  return (
    <div>
        <button onClick={mutate}>
            Check
        </button>
    </div>
  )
}

export { Admin }