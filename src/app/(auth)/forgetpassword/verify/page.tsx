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
import toast from 'react-hot-toast';


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
        axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/forgetpassword/verifytokenixist', { tokenid })
            .catch((err) => {
                router.push('/login');
                toast.error("time expired");
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
    }, []);
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');

    const verify = async () => {
        dispatch({ type: 'ERRORS', payload: {} });
        await axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/forgetpassword/verifyotp', { email: email, token: otp })
            .then((res) => {
                router.push('/forgetpassword/verify/resetpassword?email=' + email + '&token=' + tokenid);
            })
            .catch((err: any) => {
                console.log(err.response.data);
                toast.error("Invalid OTP");
            });
    }

    return (
        <div className="flex flex-row h-screen justify-center" >
            <div className="w-[60%] h-full mr-[20px] flex justify-center items-center bg-[#7152F3] bg-opacity-[5%]">
                <Image width={430} height={430} src="/Code review-bro 1.png" alt="signup" />
            </div>
            <div className="w-[40%] flex flex-col justify-center items-center">
                <div onClick={(e: any) => router.push('/login')}> <IoArrowBackCircleSharp className="absolute top-7 right-[37%] text-[35px] text-[#7152F3] hover:cursor-pointer" /></div>

                {/*Welcome && Please sign in here*/}
                <div className="flex flex-col justify-center items-center gap-1">
                    <p className={styles.title}>Reset Password</p>
                    <div className='flex flex-row '>
                        <p className="text-xs">an OTP has been sent to your email address : </p>
                        <p style={{transform : 'translateY(-1px)' , marginLeft : "5px"}}  className={styles.subtitle}> expire in: {minutes}:{seconds} min</p></div>
                </div>
                <div className={`flex flex-col mt-8 mb-2 justify-center items-center h-[200px] w-[80%] bg-white-500 rounded-[10px] pt-[5px]`}>
                    <form className='mb-5 w-full flex flex-col justify-center items-center'>
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

                        </div>
                    </form>
                    <button onClick={verify} disabled={loading} className='mb-4 w-full flex justify-center items-center rounded-xl p-3 bg-[#115DFC] hover:bg-[#6790eb] disabled:bg-[#6790eb]' >
                        <span className='text-white font-semibold '>
                            {loading ? ("Loading...") : ("Reset")}
                        </span>
                    </button>
                </div>
            </div>
        </div>


    );
}

export default Verify