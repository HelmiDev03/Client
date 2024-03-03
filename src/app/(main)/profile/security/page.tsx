'use client'
import ButtonSubmit from "@/app/(components)/ButtonSubmit/Button";
import { Input2 } from "@/app/(components)/Inputs/TextInput";
import { ChangePassword } from "@/redux/actions/userActions/changePassword";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { BiErrorCircle } from "react-icons/bi";
import { FaCheckDouble } from "react-icons/fa";
import { IoFingerPrint } from "react-icons/io5";
import { LuMoveRight } from "react-icons/lu";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import {  Modal } from 'flowbite-react';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
const Security = () => {
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const [openModal, setOpenModal] = useState(false);
    const closeModel = () => {
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
    }
    const success = useSelector((state: any) => state.success)
    const errors = useSelector((state: any) => state.errors)
    const dispatch = useDispatch<AppDispatch>()

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const edit = () => {}
    const changePassword = () => {
        dispatch({
            type: 'ERRORS',
            payload: {}
        });
        if (! /[A-Z]/.test(newPassword) || ! /[a-z]/.test(newPassword) || ! /\d/.test(newPassword) || !  /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) || newPassword.length < 12) {
            return ;
        }
        setOldPassword('')
        setNewPassword('')
        dispatch( ChangePassword({oldPassword, newPassword}))
       
           
    
    }
    return (


        <div className=" flex flex-col  ml-4 justify-center items-center  " >
              <Modal className='absolute center rounded-[25px] ' show={success.message!=''}  onClose={ closeModel} size="md"  popup>
        <Modal.Header />
        <Modal.Body className='bg-lavender'>
          <div className="text-center">
            <RiLockPasswordLine className="mx-auto mb-4 h-14 w-14 text-[#7152F3] " />
            <h3 className="mb-5 text-lg font-normal  text-[#7152F3] dark:text-gray-400">
                        Password Successfully Updated
            </h3>
            <div className="flex justify-center gap-4">
            
            </div>
          
          </div>
        </Modal.Body>
      </Modal>

            
            <div className="flex flex-row w-[720px] h-[185px] mb-[300px]  ">

                <div className="flex flex-col w-[40%] mr-6  mt-2  ">
                    <IoFingerPrint className='text-[20px] text-[#7152F3] mb-2' />
                    <h3 className='font- font-lexend font-light text-[18px] leading-[25px] text-[#16151C] mb-2 '  >Change Password</h3>
                    < p className="font- font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">
                        we recommand chnaging your password frequently to keep your account secure
                    </p>
                </div>


                <div className="flex flex-col w-[60%] h-[450px] border border-gray-200  bg-gray-50 justify-center items-center rounded-[10px] pt-[25px]  text-center ">
                    <div className='relative mb-2 flex flex-col '>
                        <h6  className='mb-4 mr-[25px] '>Old Password</h6>

                        <Input2 type={showPassword ? 'text' : 'password'} onChange={(e:any)=>setOldPassword(e.target.value)} value={oldPassword} placeholder=""  />
                        <button className="absolute top-[58%] right-[16%]" type="button" onClick={toggleShowPassword}>
                                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                        {errors.password  && <div className=" h-[30px] w-[200px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                       {errors.password}
                            </div>
                        </div>}
                    </div>
                   
                    <div className=' relative mb-2 flex flex-col '>
                        <h6 className='mb-2 mr-[25px]'>New Password</h6>

                        <Input2 type={showPassword ? 'text' : 'password'}  onChange={(e:any)=>setNewPassword(e.target.value)} value={newPassword}   />
                        <button className="absolute top-[58%] right-[16%]" type="button" onClick={toggleShowPassword}>
                              {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                    </div>
                    <div className="mb-2">
                    <h3 className='flex'> <BiErrorCircle className={` ${newPassword.length < 12 ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${newPassword.length >= 12 ? 'block' : 'hidden'} text-[20px] text-green-500`} />12 charcters or higher</h3>
                        <h3 className='flex'> <BiErrorCircle className={` ${! /[A-Z]/.test(newPassword) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[A-Z]/.test(newPassword) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Uppercase</h3>
                        <h3 className='flex'> <BiErrorCircle className={` ${! /[a-z]/.test(newPassword) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[a-z]/.test(newPassword) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Lowercase</h3>
                        <h3 className='flex'> <BiErrorCircle className={` ${! /\d/.test(newPassword) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/\d/.test(newPassword) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Numbers</h3>
                        <h3 className='flex'> <BiErrorCircle className={` ${!  /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Special Caracters</h3>
                        </div>
                    <div className=' mb-6  w-[240px] h-[44px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit timing={200} text="Change Password" fct={changePassword} />
            </div>
                </div>


            </div>


            <div className="flex flex-row w-[720px] h-[185px] mb-4  ">

                <div className="flex flex-col w-[40%] mr-6  mt-2  ">
                    <FaCheckDouble className='text-[20px] text-[#7152F3] mb-2' />
                    <h3 className=' font-lexend font-light text-[18px] leading-[25px] text-[#16151C] mb-2 '  >Two-factor authentification</h3>
                    < p className=" mb-2 font- font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">
                        two factor authentification (TFA) adds a second step of security to your account
                    </p>
                    < p className="hover:cursor-pointer flex justify-between font- font-lexend text-body-2 font-normal text-gray-800 text-sm leading-5 tracking-normal text-left   ">
                        Learn more about Two factor authentification<LuMoveRight className='ml-2 text-[18px]' />
                    </p>
                </div>


                <div className="flex flex-col w-[60%] h-[200px]  bg-gray-50 border border-gray-200 p-[10px]  items-center rounded-[10px]    ">
                    <div className='  mb-2 flex flex-col '>
                        <h6 className='mb-2 font- font-lexend text-body-2 font-semibold text-gray-500 text-sm leading-5 tracking-normal text-left '>TFA configuration</h6>
                        <h6 className='mb-2 bg-gray-200 rounded-[10px] flex justify-center p-1 h-[30px] w-[140px]'>Not configured</h6>

                        < p className="mb-2 font- font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">
                            after setting up , next time you login it will require a code to validate your identity for extra security .
                        </p>
                       
                        <div className=' bg-white-500 border-[2px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                     <ButtonSubmit spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>configure Two factor authentification</h3>} fct={edit} />
                      </div>
                    </div>

                </div>


            </div>


        </div>
    )
}

export default Security
