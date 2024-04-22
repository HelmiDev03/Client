'use client'
import React, { useState } from 'react'

import Image from 'next/image'
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { LoginAction } from '@/redux/actions/userActions/loginActions'
import { FcGoogle } from "react-icons/fc";
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
    const [emailorcin, setEmailorCin] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const successMessage = localStorage.getItem('successMessage');
    const errorMessage = localStorage.getItem('errorMessage');
    const errors = useSelector((state: any) => state.errors);
    const [password, setPassword] = useState("");
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const isbuttondisabled = useSelector((state: any) => state.isbuttondisabled);
    



    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleEmailorCin = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailorCin(e.target.value);
    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const Loginfct = () => {
        dispatch({
            type: 'Chnage_State',
            payload: true
        })
        dispatch(LoginAction({ emailorcin, password }));
    }
    return (
        <div className="flex h-screen justify-center">
            

            <div className="w-[60%] h-full mr-[20px] flex justify-center items-center bg-[#7152F3] bg-opacity-[5%]">
                <Image width={430} height={430} src="/Code review-bro 1.png" alt="signup" />
            </div>
            <div className="w-[40%] flex flex-col justify-center items-center">
                {/*LOGO*/}
                <div className=" h-[40px] flex items-center justify-center translate-y-[-45px]">
                    <Image
                        width={50}
                        height={50}
                        className="w-16 mr-[5px]"
                        src="/logo.png"
                        alt="" />
                    <p className="leading-[40px] text-[35px] font-bold">NRH</p>
                </div>
                {/*Welcome && Please sign in here*/}
                <div className=" h-[40px]flex mb-[100px] ml-10 flex-row items-center translate-y-[-25px]">
                    <p className={styles.maintext}>Welcome Back</p>
                    <p className=" text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-center">Please Sign In here</p>
                </div>

                <div className={`signup-section flex flex-col mt-8 mb-4  justify-center items-center  h-[200px] bg-white-500 rounded-[10px] pt-[5px] `}>
                    <form className='mb-12'>
                        {successMessage && <div className="h-[30px] w-[455px] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {successMessage}
                            </div>
                        </div>}
                        {/* <!--Email input--> */}
                        <div className="relative mb-3">
                            <input
                                type="email"
                                onChange={handleEmailorCin}
                                className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="floatingInput"
                                placeholder="name@example.com" />
                            <label
                                htmlFor="floatingInput"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                            >Email or CIN
                            </label>
                        </div>
                      
                        {/* <!--Password input--> */}
                        <div className="relative mb-3">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                onChange={handlePassword}
                                className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="floatingPassword"
                                placeholder="Password"
                            />
                            <label
                                htmlFor="floatingPassword"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                            >Password
                            </label>
                            <div className="absolute top-5 right-5 cursor-pointer" onClick={toggleShowPassword} >
                                {showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} />}
                            </div>
                        </div>
                        <div className='flex flex-col justify-between items-center '>
                            <div className="flex justify-between items-center w-[445px] h-[22px] mb-4">
                                <div className=" flex items-center">
                                    <input type="checkbox" id="remember" name="remember" className="  rounded-[5px]  " />
                                    <label htmlFor="remember" className=" ml-2  text-[14px] font-light text-gray-400">Remember me</label>
                                </div>
                                <Link href="/forgetpassword" className="leading-[22px] text-[14px] font-light text-[#7152F3]">Forgot Password ?</Link>

                            </div>
                     
                        </div>
                    </form>

                    <button onClick={Loginfct} disabled={isbuttondisabled} className='mb-4 w-full flex justify-center items-center rounded-xl p-3 bg-[#115DFC] hover:bg-[#6790eb] disabled:bg-[#6790eb] disabled:cursor-none' >
                        <span className='text-white font-semibold '>
                            {isbuttondisabled ? ("Loading...") : ("Sign In")}
                        </span>
                    </button>

                    <div className='mx-[90px] mb-4 flex justify-center items-end flex-col w-full'>
                        <div className='flex flex-col '>
                            <p className="font-light text-[#7152F3] text-[14px] leading-[22px] ">You don't have an account ?
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0 }}
                                    className="inline-block  ml-[5px] "
                                >
                                    <span onClick={(e) => { router.push('/register',) }} className="font-bold hover:cursor-pointer hover:underline">Signup  Here</span>
                                </motion.div>
                            </p>
                        </div>
                    </div>


                    <div className="text-center mb-3">
                        <div className="flex items-center justify-center">
                            <hr className="border border-solid border-[#7152F3] w-[190px] mx-2" />
                            <p className="font-extralight text-[#7152F3] text-[12px] leading-[24px]">OR</p>
                            <hr className="border border-solid border-[#7152F3] w-[190px] mx-2" />
                        </div>
                    </div>
                    <button className="mb-6 bg-white-500 border-[3px] flex justify-center items-center gap-4 border-[#7152F3] w-full text-white rounded-[10px] p-2">
                        <FcGoogle size={30} />
                        <h3 className='font-bold text-[20px] text-[#7152F3]'>Conitnue With Google</h3>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login