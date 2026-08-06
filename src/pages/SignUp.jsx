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
function SignUp() {
    const projEnv = useEnv((state) => state.environment)
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
            <div className='w-[60vw] relative md:block hidden h-screen  overflow-hidden'>
                <img src='/soft-hexagon.svg' alt='hexa' className='w-50 transform rotate-z-15 scale-500 h-50 absolute right-70 top-20  ' />
                {/* <img src='/soft-hexagon.svg' alt='hexa' className='w-50 transform rotate-z-15 scale-500 h-50 absolute left-70 bottom-0  ' /> */}

            </div>
        </div>
    )
}

export { SignUp }