import React, { useEffect, useState } from 'react'
import { Icon } from '../Components/Icon.jsx'
import { useEnv } from '../hooks/useEnv.js'
import { FaUserAstronaut } from "react-icons/fa6";
import { GrVend } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth/login.js';
function Login() {
    
    const { register,handleSubmit,formState:{errors} } = useForm();
    const onSubmit = (data) =>{
      console.log(data);
      
        const upData = {...data}
        LoginMutation(data);
        
    }
    const {mutate:LoginMutation,isSuccess:isLoginSuccess,error:LoginError,data:LoginData,isPending:isLoginPending,isError:isLoginError} = useMutation({
      mutationFn:loginUser,
      mutationKey:["login"]
    })

    return (
        <div className='w-screen flex'>
            <div className='md:w-[40vw] w-screen h-screen flex flex-col items-center justify-center'>
                <div className='md:w-[80%] w-[90%]'>
                    <Icon />
                    <div className='mt-4'>
                        <span className='text-gray-400 text-4xl'>
                            Welcome to
                        </span>
                        <p className=" text-4xl font-semibold">Tool<span className="text-[#55828b]">Box</span></p>

                    </div>
                    <form  className="w-full">
                        <input {...register("userEmail",{
                            required:"Email is Required",
                            pattern:"/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$/."
                        })} type='email' placeholder='Enter valid email address' className="w-full mt-5 border-b py-2 border-gray-400 outline-none focus:border-[#87bba2] focus:border-b-2 " />
                        {
                            errors?.userEmail && <span className='text-[12px] text-red-800'>{
                                errors.userEmail?.message
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
                        {
                          isLoginSuccess && <span className='text-sm text-gray-400'>User logged in</span>
                        }
                        {
                          isLoginError && <span className='text-sm text-red-600'>{LoginError?.response?.data?.message || "Login failed"}</span>
                        }
                        <button disabled={isLoginPending} onClick={handleSubmit(onSubmit)} className='bg-[#87bba2] w-full mt-6 py-2 rounded-md font-semibold' type='submit'>{isLoginPending ? "Loggin you in":"Log In"}</button>
                    
                    <span className='text-sm'>Don't have an Account? <Link className='text-[#55828b] font-bold' to="/signup">SignUp Now</Link></span>
                    <div className='relative mt-8 '>
                        <span className='absolute left-[50%] text-sm -translate-x-2 bg-white -top-3'>OR</span>
                        <div className='border border-gray-400' />
                    </div>
                    <button disabled={isLoginPending} className='w-full flex items-center justify-center py-2 rounded-md font-semibold border-2 mt-8 border-[#55828b]'>Login with <img className='h-8 mt-1 ml-1' src="/googleSvg.svg" alt='google' /></button>
                </div>
            </div>
            <div className='w-[60vw] relative md:block hidden h-screen  overflow-hidden'>
                <img src='/soft-hexagon.svg' alt='hexa' className='w-50 transform rotate-z-15 scale-500 h-50 absolute right-70 top-20  ' />
            </div>
        </div>
    )
}

export { Login }