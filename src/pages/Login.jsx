import React, { useEffect, useState } from 'react'
import { Icon } from '../Components/Icon.jsx'
import { useEnv } from '../hooks/useEnv.js'
import { FaUserAstronaut } from "react-icons/fa6";
import { GrVend } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../api/auth/login.js';
import { useUserStore } from '../hooks/useUserData.js';
import useDocumentTitle from '../utils/useDocumentTitle.js';
function Login() {
    useDocumentTitle("Login")
    const { register,handleSubmit,formState:{errors} } = useForm();
    const onSubmit = (data) =>{
        const upData = {...data}
        LoginMutation(data);
    }
   const setToken = useUserStore((state)=> state.setRefreshToken)
    const setRole = useUserStore((state)=>state.setRole)
    const navigate = useNavigate();
    const {mutate:LoginMutation,isSuccess:isLoginSuccess,error:LoginError,data:LoginData,isPending:isLoginPending,isError:isLoginError} = useMutation({
      mutationFn:loginUser,
      mutationKey:["login"],
      onSuccess:(data)=>{
        console.log(data?.data);
        const {role,refreshToken} = data.data?.data
        console.log(data.data?.data);
        
        setRole(role);
        setToken(refreshToken)
        //navigate(`/${role}/`)
      }
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
            <div className='w-[60vw] relative hidden md:block h-screen overflow-hidden bg-linear-to-br from-[#87bba2] to-[#3f6a72]'>

    {/* keyframes for the floating hexagon cluster */}
    <style>{`
        @keyframes tb-float-a { 0%,100% { transform: translateY(0) rotate(12deg); } 50% { transform: translateY(-1.5rem) rotate(20deg); } }
        @keyframes tb-float-b { 0%,100% { transform: translateY(0) rotate(-12deg); } 50% { transform: translateY(1.25rem) rotate(-20deg); } }
        @keyframes tb-float-c { 0%,100% { transform: translateY(0) rotate(6deg); } 50% { transform: translateY(-1rem) rotate(-4deg); } }
        @keyframes tb-drift   { 0%,100% { transform: translateX(0); } 50% { transform: translateX(0.75rem); } }
        @keyframes tb-pulse   { 0%,100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.6; transform: scale(1.4); } }
    `}</style>

    {/* faint blueprint dot grid */}
    <div
        className='absolute inset-0 opacity-20'
        style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '2rem 2rem'
        }}
    />

    <img
        src='/soft-hexagon.svg'
        alt=''
        className='absolute -right-16 top-16 w-72 opacity-70'
        style={{ animation: 'tb-float-a 9s ease-in-out infinite' }}
    />
    <img
        src='/soft-hexagon.svg'
        alt=''
        className='absolute right-40 top-1/2 w-40 opacity-50'
        style={{ animation: 'tb-float-b 11s ease-in-out infinite' }}
    />
    <img
        src='/soft-hexagon.svg'
        alt=''
        className='absolute right-4 bottom-16 w-56 opacity-40'
        style={{ animation: 'tb-float-c 13s ease-in-out infinite, tb-drift 7s ease-in-out infinite' }}
    />

    {/* small ambient pulsing dots for extra depth */}
    <div
        className='absolute left-1/3 bottom-1/3 h-3 w-3 rounded-full bg-white'
        style={{ animation: 'tb-pulse 4s ease-in-out infinite' }}
    />
    <div
        className='absolute right-1/4 top-1/4 h-2 w-2 rounded-full bg-white'
        style={{ animation: 'tb-pulse 5.5s ease-in-out infinite 1s' }}
    />
</div>
        </div>
    )
}

export { Login }