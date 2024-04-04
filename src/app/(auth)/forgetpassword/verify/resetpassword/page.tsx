'use client'
import { useState, useEffect } from 'react'
import styles from '@/app/(auth)/login/page.module.css'
import { Input3 } from '@/app/(components)/Inputs/TextInput'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { BiErrorCircle } from 'react-icons/bi'
import { TiTick } from 'react-icons/ti'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import axios from 'axios'


import { FaCheckCircle } from "react-icons/fa";

const ResetPassword = () => {

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const router = useRouter()

    const searchParams = useSearchParams()
    const email = searchParams.get("email");
    const tokenid = searchParams.get("token");
    const success = useSelector((state: any) => state.success);
   
  

    const dispatch = useDispatch<AppDispatch>();



    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleChangePassword1 = (e: any) => {
        setPassword1(e.target.value);
    };
    const handleChangePassword2 = (e: any) => {
        setPassword2(e.target.value);
    };
    const ChangePassword = () => {
        if (
            password1.length < 12 ||
            !/[A-Z]/.test(password1) ||
            !/[a-z]/.test(password1) ||
            !/\d/.test(password1) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password1) ||
            password1 !== password2
        ) {
            return;
        }
      
        axios.post(process.env.NEXT_PUBLIC_DOMAIN+'/api/forgetpassword/changepassword', { email, password: password1 })
            .then((res) => {
                dispatch({
                    type: 'SUCCESS',
                    payload: 'Password Successfully Updated'
                });
            })
            .catch((err) => {
                dispatch({ type: 'ERRORS', payload: err.response?.data });
            });

       
    };







    useEffect(() => {


        if (!email) {
            router.push('/login');
        }

        axios.post(process.env.NEXT_PUBLIC_DOMAIN+'/api/forgetpassword/verifytokenixist', { tokenid })
            .catch((err) => {
                router.push('/login');
            });

    })




    return (
        <div className="   w-[90%] h-[90%]   flex  justify-center items-center " >



           {success.message!='' && <div className=" absolute  center rounded-[25px]   z-50  ">
                <div className=" relative p-4 w-[400px] max-w-lg ">
                    <div className=" bg-lavender relative p-4  rounded-lg drop-shadow-md  md:p-8 flex flex-col justify-center">
                        <FaCheckCircle className="mx-auto mb-4 h-14 w-14 text-[#7152F3] " />
                        <h3 className="mb-3 text-2xl  font-bold text-gray-900 translate-x-[16%] translate-y-[94%]"> Password  Updated</h3>


                        <div className=" justify-center items-center pt-0 space-y-4 sm:flex sm:space-y-0">


                            <div className='mb-8 w-[200px] mt-[90px] h-[61px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                                <ButtonSubmit timing={500} text='Back To Login' fct={() => window.location.href = '/login'} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>}




            <div className="  flex mb-6 ml-[120px] flex-col items-center mt-[60px]">

                <p className={styles.maintext}>Reset Your Password</p>
                <p className="mb-[80px] font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-left   ">Please follow the requested Format</p>
                <div className='mb-[10px]'>
                    <div className={styles.InputContainer}>


                        <div className={styles.InputWithEye}>
                            <Input3
                                onChange={handleChangePassword1}
                                label="Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password1}
                            />
                            <button type="button" onClick={toggleShowPassword}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                    </div>
                    <div className={styles.InputContainer}>


                        <div className={styles.InputWithEye}>
                            <Input3
                                onChange={handleChangePassword2}
                                label="Confirm Password"
                                type={showPassword ? 'text' : 'password'}
                                value={password2}
                            />
                            <button type="button" onClick={toggleShowPassword}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

                    </div>
                </div>

                <div className="flex flex-col justify-center items-center">
                    <h3 className='flex'> <BiErrorCircle className={` ${password1.length < 12 ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${password1.length >= 12 ? 'block' : 'hidden'} text-[20px] text-green-500`} />12 charcters or higher</h3>
                    <h3 className='flex'> <BiErrorCircle className={` ${! /[A-Z]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[A-Z]/.test(password1) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Uppercase</h3>
                    <h3 className='flex'> <BiErrorCircle className={` ${! /[a-z]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[a-z]/.test(password1) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Lowercase</h3>
                    <h3 className='flex'> <BiErrorCircle className={` ${! /\d/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/\d/.test(password1) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Numbers</h3>
                    <h3 className='flex'> <BiErrorCircle className={` ${!  /[!@#$%^&*(),.?":{}|<>]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[!@#$%^&*(),.?":{}|<>]/.test(password1) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Special Caracters</h3>
                    <h3 className='flex mb-2'> <BiErrorCircle className={` ${password1 != password2 ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${password1 == password2 ? 'block' : 'hidden'} text-[20px] text-green-500`} />Password Matches</h3>






                </div>


                <div className='mb-8 w-[200px] mt-[90px] h-[61px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                    <ButtonSubmit timing={500} text='Update Password' fct={ChangePassword} />
                </div>



















            </div>





















        </div>
    )
}

export default ResetPassword
