import React, { useState } from 'react'
import useDocumentTitle from '../../utils/useDocumentTitle'
import {
  Briefcase,
  ChevronRight,
  Sparkles,
  Mail,
  User
} from "lucide-react";

function ContactUs() {
  useDocumentTitle("Contact Support");
  const [formData, setFormData] = useState({ recipient: 'admin', subject: '', message: '' });

  return (
    <div className='flex-1 min-h-screen flex flex-col items-center bg-[#F9F8F6] py-[4vh]'>
      {/* Header Container */}
      <div className='lg:w-[90%] w-[95%]'>
        <p className="text-[#5C8B93] text-[clamp(11px,0.85vw,13px)] font-semibold tracking-[0.08em] uppercase flex items-center gap-[0.4vw]">
          <Sparkles size={14} strokeWidth={2.5} />
          Contact Space
        </p>
        <h1 className="heading-font text-[#1F2D2A] text-[clamp(24px,2.5vw,32px)] font-bold mt-[0.5vh]">
          Contact Us
        </h1>
        <p className="text-[#6B7B75] text-[clamp(13px,0.95vw,15px)] mt-[0.5vh] mb-[4vh]">
          Have a question or need support? Contact our teams to get it solved {`:)`}
        </p>

        {/* Modified Mail Section (The Card) */}
        <div className='w-full bg-white border  border-[#E5E7EB] rounded-3xl p-[2vw] shadow-sm'>
          
          {/* Internal Section Header (Like the reference image) */}
          <div className='flex items-center gap-[0.8vw] mb-[3vh]'>
            <div className='bg-[#F3F4F6] p-[0.6rem] rounded-lg text-[#5C8B93]'>
              <Mail size={18} />
            </div>
            <h2 className='text-[#1F2D2A] font-bold text-[clamp(14px,1.1vw,18px)]'>Compose your message</h2>
          </div>

          <form className='flex flex-col gap-[2.5vh]'>
            
            {/* Top Grid: Recipient and Subject */}
            <div className='grid grid-cols-1 md:grid-cols-2 gap-[1.5vw]'>
              
              <div className='flex flex-col gap-[0.8vh]'>
                <label className='text-[#6B7B75] text-[0.85rem] font-medium ml-[0.2rem]'>Send to</label>
                <div className='relative flex items-center'>
                   <select 
                    className='w-full bg-[#FBFBFB] border border-[#E5E7EB] rounded-xl p-4 pr-10 text-[#1F2D2A] outline-none focus:border-[#87bba2] transition-colors appearance-none cursor-pointer text-[0.95rem]'
                    value={formData.recipient}
                    onChange={(e) => setFormData({...formData, recipient: e.target.value})}
                  >
                    <option value="admin">Administrator</option>
                    <option value="tech">Tech Support Team</option>
                    <option value="sales">Sales & Billing Team</option>
                  </select>
                  <div className='absolute right-4 pointer-events-none text-slate-400'>
                     <ChevronRight size={16} className='rotate-90'/>
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-[0.8vh]'>
                <label className='text-[#6B7B75] text-[0.85rem] font-medium ml-[0.2rem]'>Subject</label>
                <input 
                  type='text' 
                  placeholder='e.g. Account access issue'
                  className='w-full bg-[#FBFBFB] border border-[#E5E7EB] rounded-xl p-4 text-[#1F2D2A] outline-none focus:border-[#87bba2] transition-colors placeholder:text-slate-300 text-[0.95rem]'
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                />
              </div>

            </div>

            {/* Message Area */}
            <div className='flex flex-col gap-[0.8vh]'>
              <label className='text-[#6B7B75] text-[0.85rem] font-medium ml-[0.2rem]'>Description</label>
              <textarea 
                rows="6"
                placeholder='Tell us what you need help with, what happened, and any details we should know.'
                className='w-full bg-[#FBFBFB] border border-[#E5E7EB] rounded-xl p-[1.2rem] text-[#1F2D2A] outline-none focus:border-[#87bba2] transition-colors resize-none placeholder:text-slate-300 text-[0.95rem]'
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            {/* Form Footer with Action Button */}
            <div className='pt-[2vh] border-t border-[#F3F4F6] flex justify-end'>
              <button 
                
                className='bg-[#55828b] hover:bg-[#466d75] text-white px-5 py-[0.5rem] rounded-xl flex items-center gap-[0.6rem] transition-all duration-300 active:scale-95 shadow-sm shadow-[#55828b]/20'
              >
                Send Message
                <ChevronRight size={18} />
              </button>
            </div>

          </form>
        </div>

        {/* Secondary Info (Optional - matches the "1/3 complete" spacing) */}
        <p className='mt-[3vh] text-center text-[#87bba2] text-[0.75rem] font-bold tracking-widest uppercase'>
          Our team usually responds within 24 hours
        </p>
      </div>
    </div>
  )
}

export { ContactUs }