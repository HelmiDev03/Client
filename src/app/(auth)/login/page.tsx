'use client'
import React, { useReducer, useState } from 'react'

import Image from 'next/image'
import styles from './page.module.css'
import { Input3 } from "@/app/(components)/Inputs/TextInput";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { ImSpinner8 } from 'react-icons/im';
import {LoginAction} from '@/redux/actions/userActions/loginActions'

const Login = () => {
    const [emailorcin, setEmailorCin] = useState("");
    const dispatch = useDispatch<AppDispatch>();
    const successMessage = localStorage.getItem('successMessage');
    const errorMessage = localStorage.getItem('errorMessage');
    const [password, setPassword] = useState("");
    const router = useRouter()
    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleEmailorCin= (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmailorCin(e.target.value);

    };
    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const Loginfct =()=>{


       dispatch(LoginAction({emailorcin,password} ))


    }
    return (
        <div className=" flex flex-row h-screen justify-center ml-[-40px] " >


            <div className=" w-[60%] h-[95%] mt-6 ml-[50px] rounded-[30px]  mr-[20px] flex justify-center items-center bg-[#7152F3] bg-opacity-[5%]  ">


                <Image width={430} height={430} src="/Code review-bro 1.png" alt="signup" />



            </div>




            <div className="w-[40%] mr-3   flex flex-col justify-center items-center  mb-3">


                {/*LOGO*/}
                <div className=" h-[40px]  flex items-center justify-center font-lexend translate-y-[-45px] ">

                    <Image
                        width={40}
                        height={40}
                        className="w-11 h-10 mr-[5px]"
                        src="/logo.png"
                        alt="" />

                    <p className=" leading-[40px] text-[30px] font-semibold">NRH </p>
                </div>
                {/*Welcome && Please sign in here*/}
                <div className=" h-[40px]flex mb-[100px] ml-10 flex-row items-center translate-y-[-25px]">

                    <p className={styles.maintext}>Welcome</p>
                    <p className="font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-left   ">Please Sign In here</p>


                </div>



                <div className={`  signup-section flex flex-col mt-8 mb-4  justify-center items-center  h-[200px] bg-white-500 justify-center items-center rounded-[10px] pt-[5px] `}>
                    <form className='mb-12'>
                        {successMessage && <div className="  h-[30px] w-[455px] flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {successMessage}
                            </div>
                        </div>}
                        <div className={styles.InputContainer} >


                            <Input3 onChange={handleEmailorCin} label="email or cin" type="text" />
                        </div>

                        <div className={styles.InputWithEye}>
                            <Input3
                                onChange={handlePassword}
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                            />
                            <button type="button" onClick={toggleShowPassword}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className='flex flex-col justify-between items-center '>
                            <div className="flex justify-between items-center w-[445px] h-[22px] mb-4">
                                <div className=" flex items-center">
                                    <input type="checkbox" id="remember" name="remember" className="  rounded-[5px]  " />
                                    <label htmlFor="remember" className=" ml-2 font-lexend text-[14px] font-light text-gray-400">Remember me</label>
                                </div>
                                <Link href="/forgetpassword" className="font-lexend leading-[22px] text-[14px] font-light text-[#7152F3]">Forgot Password ?</Link>
                               
                            </div>
                            {errorMessage && <div className=" h-[30px] w-[445px] flex justify-center items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {errorMessage}
                            </div>
                        </div>}
                           
                        </div>


                        


                    </form>
                    
                    <div className='mb-4 w-[445px] h-[56px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                    <ButtonSubmit timing={250} text={loading ? <><ImSpinner8  className="animate-spin mr-2 text-[20px]" /> Loading...</> : <h3 className='text-white text-[20px]' >Login</h3>} fct={Loginfct} />
                    </div>
                    




                    <div className='  mb-2 ml-[90px] flex justify-center items-end flex-col w-[286px] h-[22px] '>


                        <div className='flex flex-col '>
                            <p className="font-light font-lexend text-[#7152F3] text-[14px] leading-[22px] ">You don't have an account ?
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0 }}
                                    className="inline-block  ml-[5px] "

                                >
                                    <span onClick={(e) => { router.push('/register',) }} className="font-bold hover:cursor-pointer">Signup  Here</span>
                                </motion.div></p></div>

                    </div>
                    <div className="text-center mb-3">
                        <div className="flex items-center justify-center">
                            <hr className="border border-solid border-[#7152F3] w-[190px] mx-2" />
                            <p className="font-lexend font-extralight text-[#7152F3] text-[12px] leading-[24px]">OR</p>
                            <hr className="border border-solid border-[#7152F3] w-[190px] mx-2" />
                        </div>
                    </div>
                    <button className=" mb-6 bg-white-500 border-[3px] flex justify-center items-center border-[#7152F3] w-[209px] h-[71px] text-white rounded-[10px] p-1"><h3 className=' font-lexend font-bold text-[20px] text-[#7152F3]'>Conitnue With Google</h3> </button>

                </div>
            </div>
        </div>
    )
}

export default Login
