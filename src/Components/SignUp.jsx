import React, { useState } from 'react'
import { Icon } from './Icon'
import { useEnv } from '../hooks/useEnv.js'
import { FaUserAstronaut } from "react-icons/fa6";
import { GrVend } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
function SignUp() {
    const projEnv = useEnv((state) => state.environment)
    const { register,handleSubmit,formState:{errors} } = useForm();
    const roleSelector = [{
        btnCnt: "Client",
        Env: "all",
        icon: <FaUserAstronaut />,
        role:"client"
    }, {
        btnCnt: "Vendor",
        Env: "all",
        icon: <GrVend />,
        role:"vendor"
    }, {
        btnCnt: "Admin",
        Env: "dev",
        icon: <MdAdminPanelSettings />,
        role:"admin"
    }]
    const [role,SetRole] = useState("client")
    const onSubmit = (data) =>{
        const upData = {...data,role:role}
        console.log(upData);
        
    }
    return (
        <div className='w-screen flex'>
            <div className='w-[40vw] h-screen flex flex-col items-center justify-center'>
                <div className='w-[80%]'>
                    <Icon />
                    <div className='mt-4'>
                        <span className='text-gray-400 text-4xl'>
                            Welcome to
                        </span>
                        <p className=" text-4xl font-semibold">Tool<span className="text-[#55828b]">Box</span></p>

                    </div>
                    <form  className="w-full">
                        <input {...register("email",{
                            required:"Email is Required",
                            pattern:"/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/."
                        })} type='email' placeholder='Enter valid email address' className="w-full mt-5 border-b py-2 border-gray-400 outline-none focus:border-[#87bba2] focus:border-b-2 " />
                        {
                            errors?.email && <span className='text-[12px] text-red-800'>{
                                errors.email?.message
                                }</span>
                        }
                        <span>
                            <input {...register("password",{
                                required:"Password is required",
                                minLength:{
                                    value:6,
                                    message:"Password lenght should be min of 6 length"
                                },
                                maxLength:{
                                    value:8,
                                    message:"Length should be maximum 8"
                                }
                            })} type='password' placeholder='Enter password' className="w-full mt-6 border-b py-2 border-gray-400 outline-none focus:border-[#87bba2] focus:border-b-2 " />
                        </span>
                        {
                            errors.password && <span className='text-[12px] text-red-800'>
                                {errors?.password?.message}
                            </span>
                        }
                        </form>
                        <div className='flex gap-2 mt-2 justify-evenly'>
                            {
                                roleSelector.map((item, idx) => {
                                    return ((item.Env == "all" || (projEnv == "dev" && item.btnCnt == "Admin")) && <button onClick={()=>{SetRole(item.role)}} className={`flex border rounded-md py-3 border-gray-400 font-semibold hover:bg-[#87bba2] hover:text-white transition-all duration-75 justify-center w-full items-center ${role == item.role ? "bg-[#87bba2]" : ""}`} key={idx}>
                                        <span>{item.icon}</span>
                                        <span className={`ml-2`}>{item.btnCnt}</span>
                                    </button>)
                                })
                            }
                        </div>
                        <button onClick={handleSubmit(onSubmit)} className='bg-[#87bba2] w-full mt-6 py-2 rounded-md font-semibold' type='submit'>SignUp</button>
                    
                    <span className='text-sm'>Already have and Account? <Link className='text-[#55828b] font-bold' to="/login">Login Now</Link></span>
                    <div className='relative mt-8 '>
                        <span className='absolute left-[50%] text-sm -translate-x-2 bg-white -top-3'>OR</span>
                        <div className='border border-gray-400' />
                    </div>
                    <button className='w-full flex items-center justify-center py-2 rounded-md font-semibold border-2 mt-8 border-[#55828b]'>SignUp with <img className='h-8 mt-1 ml-1' src="/googleSvg.svg" alt='google' /></button>
                </div>
            </div>
            <div className='w-[60vw] relative md:block hidden h-screen  overflow-hidden'>
                <img src='/soft-hexagon.svg' alt='hexa' className='w-50 transform rotate-z-15 scale-500 h-50 absolute right-70 top-20  ' />
            </div>
        </div>
    )
}

export { SignUp }