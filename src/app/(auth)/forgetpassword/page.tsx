'use client'
import React, {  useEffect, useState } from 'react'

import Image from 'next/image'
import styles from './page.module.css'
import { Input3 } from "@/app/(components)/Inputs/TextInput";

import { useRouter } from 'next/navigation';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { ImSpinner8 } from 'react-icons/im';
import axios from 'axios';
import { IoArrowBackCircleSharp } from 'react-icons/io5';


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
                    console.log(err.response.data);
                    dispatch({
                        type: 'ERRORS',
                        payload: err.response ? err.response.data : {}
                    });
                });
                 

            
         

        
}

    
    return (
        <div className=" flex flex-row h-screen justify-center ml-[-40px] " >


            <div className=" w-[60%] h-[95%] mt-6 ml-[50px] rounded-[30px]  mr-[20px] flex justify-center items-center bg-[#7152F3] bg-opacity-[5%]  ">


                <Image width={430} height={430} src="/Code review-bro 1.png" alt="signup" />



            </div>



     {/*put email*/}
            <div className="  w-[40%] mr-3   flex flex-col justify-center items-center  mb-3">


               
                {/*Welcome && Please sign in here*/}
                <div className=" h-[40px]flex mb-[100px] ml-10 flex-row items-center translate-y-[110px]">

                    <p className={styles.maintext}>Forgot Password</p>
                    <p className="font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-left   ">Please enter your email or cin  , we will send you an otp to reset your password</p>


                </div>

                <div onClick={(e: any) => router.push('/login')}> <IoArrowBackCircleSharp className="  absolute top-[200px] right-[34%] text-[30px] text-[#7152F3] hover:cursor-pointer" /></div>

                <div className={`  signup-section flex flex-col mt-8 mb-4  justify-center items-center  h-[200px] bg-white-500 justify-center items-center rounded-[10px] pt-[5px] `}>
                    <form className='mb-12'>
                   
                        <div className={styles.InputContainer} >


                            <Input3 onChange={handleEmail} label="email or cin" type="text" />
                            {errors.message && <div className=" h-[30px] w-[445px] flex justify-center items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {errors.message}
                            </div>
                        </div>}
                           
                        </div>
                 
                          
                       

                    


                        


                    </form>
                    
                    <div className='mb-4 w-[445px] h-[56px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                    <ButtonSubmit timing={250} text={loading ? <><ImSpinner8  className="animate-spin mr-2 text-[20px]" /> Loading...</> : <h3 className='text-white text-[20px]' >Send OTP</h3>} fct={sendOtp} />
                    </div>
                    




                 
            </div>
              </div>

               {/*end put email*/}  




         {/*put otp*/}    
        

         {/*end otp*/}  



        </div>
    )
}

export default ForgetPassword
