'use client'
import React, {  useEffect, useState } from 'react';

import Image from 'next/image';
import styles from './page.module.css';

import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import axios from 'axios';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import toast from 'react-hot-toast';


const ForgetPassword = () => {

  
    const dispatch = useDispatch<AppDispatch>();
    const router = useRouter()
    const errors = useSelector((state: any) => state.errors);
    
    const [email, setEmail] = useState('');

    const [loading, setLoading] = useState(false);
    const handleEmail = (e: any) => {
        setEmail(e.target.value);
    }
   
    const sendOtp = async () => {
        dispatch({ type: 'ERRORS', payload: {} });
            await axios.post(process.env.NEXT_PUBLIC_DOMAIN+'/api/forgetpassword/sendotp', { email: email })
                .then((res) => { 
                    router.push('/forgetpassword/verify?email='+email+'&token='+res.data.token+'&expiredAt='+res.data.expiredAt);
                })
                .catch((err) => {
                    
                    toast.error(err.response?.data.message);
                });
    }

    
    return (
        <div className="flex flex-row h-screen justify-center" >
            <div className="w-[60%] h-full mr-[20px] flex justify-center items-center bg-[#7152F3] bg-opacity-[5%]">
                <Image width={430} height={430} src="/Code review-bro 1.png" alt="signup" />
            </div>
            {/*put email*/}
            <div className="w-[40%] flex flex-col justify-center items-center">
                {/*Welcome && Please sign in here*/}
                <div className="h-[40px] flex mb-6 gap-2 flex-col items-center">

                    <p className={styles.maintext}>Forgot Password</p>
                    <p className="font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-left">Please enter your email or cin  , we will send you an otp to reset your password</p>
                </div>
                <div onClick={(e: any) => router.push('/login')}> <IoArrowBackCircleSharp className="absolute top-7 right-[37%] text-[35px] text-[#7152F3] hover:cursor-pointer" /></div>
                <div className={`flex flex-col mt-8 mb-2 justify-center items-center h-[200px] w-[80%] bg-white-500 rounded-[10px] pt-[5px]`}>
                    <form className='mb-5 w-full'>
                        {/* <!--Email input--> */}
                        <div className="relative mb-3">
                            <input
                                type="email"
                                onChange={handleEmail}
                                className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="floatingInput"
                                placeholder="name@example.com" />
                            <label
                                htmlFor="floatingInput"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                >Email or CIN
                            </label>
                        </div>
                       
                      
                    </form>
                    
                    {/* <div className='mb-4 w-[445px] h-[56px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                    <ButtonSubmit timing={250} text={loading ? <><ImSpinner8  className="animate-spin mr-2 text-[20px]" /> Loading...</> : <h3 className='text-white text-[20px]' >Send OTP</h3>} fct={sendOtp} />
                    </div> */}
                    <button onClick={sendOtp} disabled={loading} className='mb-4 w-full flex justify-center items-center rounded-xl p-3 bg-[#115DFC] hover:bg-[#6790eb] disabled:bg-[#6790eb]' >
                        <span className='text-white font-semibold '>
                            {loading ? ("Loading...") : ("Send OTP")}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword