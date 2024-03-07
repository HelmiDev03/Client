
'use client'
import React, { useEffect, useState } from 'react'
import styles from '../page.module.css'
import { HStack, PinInput, PinInputField } from '@chakra-ui/react'
import { ImSpinner8 } from 'react-icons/im';
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useRouter, useSearchParams } from 'next/navigation';
import { AppDispatch } from '@/redux/store';
import axios from 'axios';


const Verify = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const email = searchParams.get("email");
    const tokenid = searchParams.get("token");


    
    const expiredAt = searchParams.get("expiredAt");
    const timestampDate1 = new Date()
    const timestampDate2 = new Date(expiredAt ?? 0)
    const differenceInSeconds = Math.floor((timestampDate2.getTime() - timestampDate1.getTime()) / 1000);
    const [time, setTime] = useState<number>(differenceInSeconds);



    const dispatch = useDispatch<AppDispatch>();
    const errors = useSelector((state: any) => state.errors);
    const [otp, setOtp] = useState('');
    const [loading] = useState(false);
    




    useEffect(() => {



        if (!email) {
            router.push('/login');
        }

        axios.post('http://localhost:5000/api/forgetpassword/verifytokenixist', { tokenid })
            .catch((err) => {
                router.push('/login');
            });



            const timer = setInterval(() => {
                setTime((prevTime) => {
                    if (prevTime === 0) {
                        clearInterval(timer);
                        router.push('/login');
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
    
            return () => {
                clearInterval(timer); // Clean up the timer when the component unmounts
            };
    },[]);
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');

    

    const verify = async () => {
        dispatch({ type: 'ERRORS', payload: {} });
        await axios.post('http://localhost:5000/api/forgetpassword/verifyotp', { email: email, token: otp })
            .then((res) => {
                router.push('/forgetpassword/verify/resetpassword?email=' + email + '&token=' + tokenid);
            })
            .catch((err:any) => {
                console.log(err.response.data);
                dispatch({ type: 'ERRORS', payload: err.response?.data });
            });
    }

    return (
        <div className=" flex flex-row h-screen justify-center ml-[-40px] " >


            <div className=" w-[60%] h-[95%] mt-6 ml-[50px] rounded-[30px]  mr-[20px] flex justify-center items-center bg-[#7152F3] bg-opacity-[5%]  ">


                <Image width={430} height={430} src="/Code review-bro 1.png" alt="signup" />



            </div>
            <div className="   w-[40%] mr-3   flex flex-col justify-center items-center  mb-3">

                <div onClick={(e: any) => router.push('/login')}> <IoArrowBackCircleSharp className="  absolute top-[200px] right-[34%] text-[30px] text-[#7152F3] hover:cursor-pointer" /></div>
                <p className={styles.maintext2}>
            The OTP will expire in: {minutes}:{seconds} min
        </p>
     
                {/*Welcome && Please sign in here*/}
                <div className=" h-[40px]flex mb-[100px] ml-10 flex-row items-center translate-y-[110px] translate-x-[-160px]">

                    <p className={styles.maintext}>Enter OTP</p>



                </div>



                <div className={`  signup-section flex flex-col mt-8 mb-4  justify-center items-center  h-[200px] bg-white-500 justify-center items-center rounded-[10px] pt-[5px] `}>
                    <form className='mb-12'>

                        <div className={styles.InputContainer} >


                            <HStack className='mb-3 '>
                                <PinInput onChange={(e: any) => setOtp(e)}>
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                    <PinInputField />
                                </PinInput>

                            </HStack>
                            {errors.message && <div className=" h-[30px] w-[225px] translate-x-[14%] flex justify-center items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
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
                        <ButtonSubmit timing={250} text={loading ? <><ImSpinner8 className="animate-spin mr-2 text-[20px]" /> Loading...</> : <h3 className='text-white text-[20px]' >Verify</h3>} fct={verify} />
                    </div>






                </div>
            </div>


        </div>
    );
}

export default Verify
