import React, { useEffect, useState } from 'react'
import { Icon } from '../Components/Icon.jsx'
import { useEnv } from '../hooks/useEnv.js'
import { FaUserAstronaut } from "react-icons/fa6";
import { GrVend } from "react-icons/gr";
import { MdAdminPanelSettings } from "react-icons/md";
import { Link } from 'react-router';
import { useForm } from 'react-hook-form';
import Select from 'react-select';
import { useMutation } from '@tanstack/react-query';
import { signUpUser } from '../api/auth/signUp.js';
import { useDeviceInformation } from '../hooks/useDeviceInfo.js';
import { useUserStore } from '../hooks/useUserData.js';
import { useNavigate } from 'react-router';
import useDocumentTitle from '../utils/useDocumentTitle.js';
function SignUp() {
    useDocumentTitle("SignUp")
    const projEnv = useEnv((state) => state.environment)
    const navigate = useNavigate();
    const setToken = useUserStore((state)=> state.setRefreshToken)
    const setRole = useUserStore((state)=>state.setRole)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const roleSelector = [{
        btnCnt: "Client",
        Env: "all",
        icon: <FaUserAstronaut />,
        role: "client"
    }, {
        btnCnt: "Vendor",
        Env: "all",
        icon: <GrVend />,
        role: "vendor"
    }, {
        btnCnt: "Admin",
        Env: "dev",
        icon: <MdAdminPanelSettings />,
        role: "admin"
    }]
    const countryList = [{
        country: "in",
        logo: "/indiaFlag.svg",
        code: "+91",
        name: "India"
    }]
    const [role, SetRole] = useState("client");
    const deviceInfo = useDeviceInformation((state) => state.deviceInformation)
    const { mutate: SignUpMutation, isError: isSignUpError, error: SignUpError, isPending: SignUpPending, data: SignUpData, isSuccess: isSignUpSuccess } = useMutation({
        mutationFn: signUpUser,
        mutationKey: ["signUpUser"],
        onError: (error) => {
            console.log(error.response?.data?.message);
        },
        onSuccess:(data)=>{
            setToken(data?.data?.refreshToken)
            const profileData = data?.data?.profileData;
            console.log(profileData);
            
            const {_doc:{role}} = data?.data
            setRole(role);
            //navigate(`/${role}`)
        }
    })
    const onSubmit = (data) => {
        const upData = { ...data, role: role,os:deviceInfo }
        console.log(upData);
        SignUpMutation(upData);
    }
    useEffect(() => {
        console.log(SignUpError?.response?.data, SignUpData);

    }, [SignUpData, SignUpError])
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
                    <form className="w-full">
                        <input {...register("userEmail", {
                            required: "Email is Required",
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Email pattern did not match"
                            },
                        })} type='email' placeholder='Enter valid email address' className="w-full mt-5 border-b py-2 border-gray-400 outline-none focus:border-[#87bba2] focus:border-b-2 " />
                        {
                            errors?.userEmail && <span className='text-[12px] text-red-800'>{
                                errors.userEmail?.message
                            }</span>
                        }
                        <span className='mb-6 '>
                            <input {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password lenght should be min of 6 length"
                                },
                                maxLength: {
                                    value: 8,
                                    message: "Length should be maximum 8"
                                }
                            })} type='password' placeholder='Enter password' className="w-full mt-6 border-b py-2 border-gray-400 outline-none focus:border-[#87bba2] focus:border-b-2 " />
                        </span>
                        {
                            errors.password && <span className='text-[12px] text-red-800'>
                                {errors?.password?.message}
                            </span>
                        }


                        <div className='relative  mt-6  w-full'>
                            <span className='absolute top-1/2 left-2 transform -translate-y-1/2'>+91</span>
                            <input placeholder='Enter phone number' className=' pl-12  w-full border-b py-2 border-gray-400 outline-none focus:border-[#87bba2] focus:border-b-2 ' {...register("phone", {
                                required: "Enter phone number",
                                pattern: {
                                    value: /^(?:\+91[-\s]?)?0?[6-9]\d{9}$/,
                                    message: "Enter a valid phone number",
                                },
                                maxLength: {
                                    value: 10,
                                    message: "Length should be 10"
                                },
                                minLength: {
                                    value: 10,
                                    message: "Length should be 10"
                                }

                            })} type='text' />
                        </div>
                        {
                            errors.phone && <span className='text-[12px] text-red-800'>
                                {errors?.phone?.message}
                            </span>
                        }

                    </form>
                    <div className='flex gap-2 mt-3 justify-evenly'>
                        {
                            roleSelector.map((item, idx) => {
                                return ((item.Env == "all" || (projEnv == "dev" && item.btnCnt == "Admin")) && <button onClick={() => { SetRole(item.role) }} className={`flex border rounded-md py-3 border-gray-400 font-semibold hover:bg-[#87bba2] hover:text-white transition-all duration-75 justify-center w-full items-center ${role == item.role ? "bg-[#87bba2]" : ""}`} key={idx}>
                                    <span>{item.icon}</span>
                                    <span className={`ml-2`}>{item.btnCnt}</span>
                                </button>)
                            })
                        }
                    </div>
                    {
                        isSignUpSuccess && <p className='text-sm text-gray-600'>User signed in</p>
                    }
                    {
                        isSignUpError && <p className='text-sm text-red-600'>{SignUpError?.response?.data?.message}</p>
                    }
                    <button disabled={SignUpPending} onClick={handleSubmit(onSubmit)} className='bg-[#87bba2] w-full mt-6 py-2 rounded-md font-semibold' type='submit'>{
                        SignUpPending ? "Signing You In" : "Sign Up"
                    }</button>

                    <span className='text-sm'>Already have an Account? <Link className='text-[#55828b] font-bold' to="/login">Login Now</Link></span>
                    <div className='relative mt-8 '>
                        <span className='absolute left-[50%] text-sm -translate-x-2 bg-white -top-3'>OR</span>
                        <div className='border border-gray-400' />
                    </div>
                    <button disabled={SignUpPending} className='w-full flex items-center justify-center py-2 rounded-md font-semibold border-2 mt-8 border-[#55828b]'>SignUp with <img className='h-8 mt-1 ml-1' src="/googleSvg.svg" alt='google' /></button>
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

export { SignUp }