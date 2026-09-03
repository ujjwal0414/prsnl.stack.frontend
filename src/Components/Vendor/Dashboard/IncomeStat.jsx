import React from 'react';
import { Info } from 'lucide-react';

function IncomeStat({ data }) {
  return (
    <>
    <p className='lg:w-[90%] mt-5 text-gray-500 font-bold w-[95%]'>Income Stats</p>
    {
      data.length > 0 ? <div className='lg:w-[90%] mt-1 w-[95%] bg-white rounded-3xl p-7 shadow-sm border border-[#E5E7EB]'>
      {/* Grid Layout: 2 columns on mobile, 4 on desktop */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-[1.5vw]'>
        {data.map((stat, index) => (
          <div 
            key={index} 
            className='relative group flex flex-col justify-between p-[1.2rem] bg-[#FBFBFB] border border-[#F3F4F6] rounded-2xl transition-all hover:shadow-md'
          >
            {/* Header: Name and Info Icon */}
            <div className='flex items-start justify-between mb-[1vh]'>
              <span className='text-[#6B7B75] text-[clamp(11px,0.8vw,13px)] font-semibold uppercase tracking-wider leading-tight'>
                {stat.name}
              </span>
              
              {/* Tooltip Logic */}
              {stat.info && (
                <div className='relative flex items-center justify-center'>
                  <Info 
                    size={15} 
                    className='text-[#87bba2] cursor-help transition-colors hover:text-[#55828b]' 
                  />
                  
                  {/* Tooltip Box */}
                  <div className='absolute bottom-full mb-2 hidden group-hover:block w-48 p-3 bg-[#1F2D2A] text-white text-[11px] rounded-lg shadow-xl z-50 pointer-events-none'>
                    {stat.info}
                    {/* Tooltip Arrow */}
                    <div className='absolute top-full left-1/2 -translate-x-1/2 border-[6px] border-transparent border-t-[#1F2D2A]'></div>
                  </div>
                </div>
              )}
            </div>

            {/* Value */}
            <div className='text-[#1F2D2A] text-[clamp(20px,1.8vw,28px)] font-bold tracking-tight'>
              {stat.value}
            </div>

            {/* Aesthetic Bottom Accent (matches the reference button style) */}
            <div className='w-6 h-0.5 bg-[#87bba2]/30 mt-[1vh] rounded-full'></div>
          </div>
        ))}
      </div>
    </div> : <p className='mt-8 text-[16px] text-gray-500'>
      No stat to show
    </p>
    }
    </>
  );
}

export { IncomeStat };