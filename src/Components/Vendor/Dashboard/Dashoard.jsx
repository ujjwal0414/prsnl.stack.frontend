import React from 'react'
import useDocumentTitle from '../../../utils/useDocumentTitle'
import { ServiceStat } from './ServiceStat'
import { IncomeStat } from './IncomeStat'

function VendorDashboard() {
    useDocumentTitle("Dashboard")
    const serviceStat = [{
      name:"Number of Services",
      value:19,
      info:""
    },{
      name:"Number of Ads",
      value:2,
      info:""
    },{
      name:"Number of Customers",
      value:200,
      info:""
    },{
      name:"CAR",
      value:"2%",
      info:"Customer acquisition rate is the value which denotes how many users who visits your porfile avails the service"
    }]
    const incomeStat = [{
      name:"EPM",
      value:"20$",
      info:"The earning that you do per month ,it is aggregated all over days"
    },
  {
      name:"Growth",
      value:"5.3%",
      info:""
    }, {
      name:"EPY",
      value:"373$",
      info:"The earning that you do per year ,it is aggregated all over month"
    }, {
      name:"IPM",
      value:"2.3%",
      info:"Average Income per user"
    }]
  return (
    <div className='flex-1  h-screen flex flex-col items-center bg-[#F9F8F6] py-4'>
      <h1 className='lg:w-[90%] w-[95%] text-2xl mt-2'>Your Dashboard</h1>
      <p className='lg:w-[90%] w-[95%] text-gray-400 mt-1 font-semibold text-[12px]'>All things organised for you at a place</p>
      <ServiceStat data = {serviceStat}/>
      <IncomeStat data={incomeStat}/>
    </div>
  )
}

export { VendorDashboard }