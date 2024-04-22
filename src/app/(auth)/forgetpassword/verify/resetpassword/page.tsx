'use client'
import { useState, useEffect } from 'react'
import styles from '@/app/(auth)/login/page.module.css'
import { Input3 } from '@/app/(components)/Inputs/TextInput'
import { FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa'
import { BiErrorCircle } from 'react-icons/bi'
import { TiMinusOutline, TiTick } from 'react-icons/ti'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import axios from 'axios';
import toast , { Toaster } from "react-hot-toast";


import { FaCheckCircle } from "react-icons/fa";
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi'

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
        ) { return toast.error('Invalid Password');}
      
        axios.post(process.env.NEXT_PUBLIC_DOMAIN+'/api/forgetpassword/changepassword', { email, password: password1 })
            .then((res) => {
                toast.success('Password Updated');
                router.push('/login');
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
              toast.error("time expired");
               router.push('/login');
            });
     })




    return (
        <div className="w-screen h-screen flex justify-center items-center" >
            
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

            <div className="flex mb-6 flex-col items-center mt-[60px]">
                <p className={styles.maintext}>Reset Your Password</p>
                <p className="mb-[80px] font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-left   ">Please follow the requested Format</p>
                
                <div className='mb-[10px] w-[450px]'>
                    {/* <!--Password input--> */}
                    <div className="relative mb-3">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChangePassword1}
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
                            { showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} /> }
                        </div>
                    </div>
                    {/* <!--Password input--> */}
                    <div className="relative mb-3">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            onChange={handleChangePassword2}
                            className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                            id="floatingPassword"
                            placeholder="Password" 
                        />
                        <label
                            htmlFor="floatingPassword"
                            className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                            >Confirm Password
                        </label>
                        <div className="absolute top-5 right-5 cursor-pointer" onClick={toggleShowPassword} >
                            { showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} /> }
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-[450px] mb-10">
                    <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${password1.length < 12 ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${password1.length >= 12 ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />12 charcters</h3>
                    <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${! /[A-Z]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${/[A-Z]/.test(password1) ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />One Uppercase</h3>
                    <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${! /[a-z]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${/[a-z]/.test(password1) ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />One Lowercase</h3>
                    <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${! /\d/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${/\d/.test(password1) ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />One Number</h3>
                    <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${!  /[!@#$%^&*(),.?":{}|<>]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${/[!@#$%^&*(),.?":{}|<>]/.test(password1) ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />Special Caracters (!, %, &, etc)</h3>
                    <h3 className='flex items-center text-gray-400 mb-2'> <TiMinusOutline className={` ${password1 != password2 ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck className={` ${password1 == password2 ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />Password Matches</h3>
                </div>

                <button onClick={ChangePassword} className='mb-4 w-full flex justify-center items-center rounded-xl p-3 bg-[#115DFC] hover:bg-[#6790eb] disabled:bg-[#6790eb] disabled:cursor-none' >
                        <span className='text-white font-semibold '>
                            Update Password
                        </span>
                </button>
            </div>
        </div>
    )
}

export default ResetPassword