'use client'
import { HStack, PinInput, PinInputField } from '@chakra-ui/react'
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
import { Modal } from 'flowbite-react';
import { RiLockPasswordLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import axios from 'axios';
import { setAuth } from '@/redux/utils/setAuth';
import { jwtDecode } from 'jwt-decode';
const Security = () => {
    const [openPopupDelete, setOpenPopupDelete] = useState(false);
    const [popupDeletePage, setPopupDeletePage] = useState(1);
    const auth = useSelector((state: any) => state.auth)
    const [Page, setPage] = useState(1)
    const [otp, setOtp] = useState('');
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
    const changePassword = () => {
        dispatch({
            type: 'ERRORS',
            payload: {}
        });
        if (! /[A-Z]/.test(newPassword) || ! /[a-z]/.test(newPassword) || ! /\d/.test(newPassword) || !  /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) || newPassword.length < 12) {
            return;
        }
        setOldPassword('')
        setNewPassword('')
        dispatch(ChangePassword({ oldPassword, newPassword }))



    }


    const handleSubmit = () => {
        if (Page === 2) {
            //ap//tfa/sendotp
            axios.post('http://localhost:5000/api/tfa/sendotp')
                .catch(err => {
                    alert(err.response ? err.response.data.message : {});
                    window.location.reload()

                }
                )


            setPage(21)
        }
        else if (Page === 21) {
            //api//tfa/verifyotp
            axios.post('http://localhost:5000/api/tfa/verifyotp', { token: otp })
                .then(
                    res => {
                        setPage(1)
                        dispatch({
                            type: 'SUCCESS',
                            payload: res.data.message
                        });
                        const decodedToken = jwtDecode(res.data.token);
                        dispatch({
                            type: 'SET_USER',
                            payload: decodedToken
                        });
                        localStorage.setItem('jwt', res.data.token);
                        setAuth(res.data.token);
                    }
                )
                .catch(err =>
                    dispatch({
                        type: 'ERRORS',
                        payload: err.response ? err.response.data : {}
                    })
                )

        }

    }


    const disabeltfa = () => {
        axios.put('http://localhost:5000/api/tfa/disable')
            .then(res => {
                const decodedToken = jwtDecode(res.data.token);
                        dispatch({
                            type: 'SET_USER',
                            payload: decodedToken
                        });
                localStorage.setItem('jwt', res.data.token);
                setAuth(res.data.token);
            })
        window.location.reload()


    }

    return (

        <>
            <div className={` ${Page === 1 ? 'block' : 'hidden'}         flex flex-col  ml-4 justify-center items-center `} >
                <Modal className='absolute w-[400px] translate-x-[520px] center rounded-[25px]' show={success.message != ''} onClose={closeModel} size="md" popup>
                    <Modal.Header />
                    <Modal.Body className='bg-lavender'>
                        <div className="text-center">
                            <RiLockPasswordLine className="mx-auto mb-4 h-14 w-14 text-[#7152F3] " />
                            <h3 className="mb-5 text-lg font-normal  text-[#7152F3] dark:text-gray-400">
                                {success.message}
                            </h3>
                            <div className="flex justify-center gap-4">

                            </div>

                        </div>
                    </Modal.Body>
                </Modal>


                <div className="flex flex-row w-[720px] h-[185px] mb-[400px]  ">

                    <div className="flex flex-col w-[40%] mr-6  mt-2  ">
                        <IoFingerPrint className='text-[20px] text-[#7152F3] mb-2' />
                        <h3 className='font- font-lexend font-light text-[18px] leading-[25px] text-[#16151C] mb-2 '  >Change Password</h3>
                        < p className="font- font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">
                            we recommand chnaging your password frequently to keep your account secure
                        </p>
                    </div>


                    <div className="flex flex-col w-[60%] h-[450px] border border-gray-200  bg-gray-50 justify-center items-center rounded-[10px] pt-[25px]  text-center ">
                        <div className='relative mb-2 flex flex-col '>
                            <h6 className='mb-4 mr-[25px] '>Old Password</h6>

                            <Input2 type={showPassword ? 'text' : 'password'} onChange={(e: any) => setOldPassword(e.target.value)} value={oldPassword} placeholder="" />
                            <button className="absolute top-[58%] right-[16%]" type="button" onClick={toggleShowPassword}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                            {errors.password && <div className=" h-[30px] w-[200px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
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

                            <Input2 type={showPassword ? 'text' : 'password'} onChange={(e: any) => setNewPassword(e.target.value)} value={newPassword} />
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
                            {!auth.user.tfa && <h6 className='mb-2 bg-gray-200 rounded-[10px] flex justify-center p-1 h-[30px] w-[140px]'>Not configured</h6>}
                            {auth.user.tfa && <h6 className='mb-[60px] mt-[20px] bg-gray-200 rounded-[10px] flex justify-center p-1 h-[30px] w-[140px]'>Configured</h6>}

                            {!auth.user.tfa && < p className="mb-2 font- font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">
                                after setting up , next time you login it will require a code to validate your identity for extra security .
                            </p>}

                            <div className=' bg-white-500 border-[2px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                                {!auth.user.tfa && <ButtonSubmit spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>configure Two factor authentification</h3>} fct={() => setPage(2)} />}
                                {auth.user.tfa && <ButtonSubmit spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px]      text-[#7152F3]'>Disable Two factor authentification</h3>} fct={() => setOpenPopupDelete(true)} />}



                                {openPopupDelete && <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="bg-[#eee] overflow-y-auto overflow-x-hidden absolute w-[500px] top-[80%] right-[40%] center rounded-[25px]  z-50 justify-center items-center ">
                                    <div className="bg-[#eee] relative  w-full max-w-2xl max-h-full">

                                        <div className="bg-[#eee]  relative  rounded-lg shadow dark:bg-gray-700">

                                            <div className=" bg-[#eee] flex items-center justify-between p-4 md:p-5 border-b border-red-200 rounded-t">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                                    Disable 2 Factor Verification
                                                </h3>
                                                <div onClick={() => { setOpenPopupDelete(!openPopupDelete); }} >
                                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="static-modal">
                                                        <svg className="w-3 h-3 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                            </div>

                                            <div className={`   p-4 md:p-5 space-y-4`}>
                                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                                    Your account is more secure when you need a password and a verification code to sign in. If you remove this extra layer of security, you will only be asked for a password when you sign in. It might be easier for someone to break into your account.
                                                </p>
                                                <div className='translate-x-[60%] w-[221px] h-[50px] flex justify-center items-center rounded-[10px] p-[20px] bg-red-500'>
                                                    <ButtonSubmit
                                                        text={
                                                            <div className='flex'>
                                                                {popupDeletePage === 1 ? 'I have read and understand these effects' : 'Delete this employee'}
                                                            </div>
                                                        }
                                                        fct={disabeltfa}

                                                    />
                                                </div>

                                            </div>



                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>

                    </div>


                </div>


            </div>










            <div className={` ${Page === 2 || Page === 21 ? 'block' : 'hidden'}         flex flex-col justify-center items-center `} >

                <div className="mb-4 flex flex-row justify-center h-[150px]">
                    <img src='/tfa.png' width={560} />

                </div>

                <div className={` ${Page != 21 ? 'block' : 'hidden'}         mt-4 `} >
                    <div className="translate-x-[20px] mb-4">
                        <h2 className='font-lexend font-light text-[24px] leading-[32px] mb-2'>Protect your account with 2-Step verification</h2>
                        <p className="mb-4 font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">
                            Prevent hackers from accessing your account with an additional layer of security. When you sign in, 2-Step verification helps make sure your personal information stays private, safe and secure.
                        </p>
                    </div>


                    <div className="flex flex-row mb-8">
                        <img style={{ marginRight: '6px' }} width={60} height={60} src='https://www.gstatic.com/identity/accountsettings/strongauth/Protect_your_account_Light_f66dd371978068d70707ed632cd4e12d.svg' />
                        <div className="flex flex-col">
                            <h3 className='font-lexend font-light text-[18px] leading-[25px] mb-2'>Security made easy</h3>
                            <p className="font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">In addition to your password, 2-Step verification adds a quick second step to verify that it’s you.</p>
                        </div>
                    </div>
                    <div className="flex flex-row mb-3">
                        <img style={{ marginRight: '6px' }} width={60} height={60} src='https://www.gstatic.com/identity/accountsettings/strongauth/safer_from_cyberattacks_Light_41a2673858ca1920cef5b0715569b331.svg' />
                        <div className="flex flex-col">
                            <h3 className='font-lexend font-light text-[18px] leading-[25px] mb-2'>Use 2-Step verification for all your online accounts</h3>
                            <p className="font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">2-Step verification is a proven way to prevent widespread cyberattacks. Turn it on wherever it’s offered to protect all your online accounts.</p>
                        </div>
                    </div>
                </div>



                <div className={` ${Page === 21 ? 'block' : 'hidden'} flex flex-col         mt-4 `} >
                    <h3 className=' font-lexend font-light text-[18px] leading-[25px] text-[#16151C] mb-2 '  >we have sent you an otp to your mail  , please verify it to confgure TFA Successfully</h3>
                    <HStack className='mb-3  translate-x-[30%] mt-[65px] mb-[100px]'>
                        <PinInput onChange={(e: any) => setOtp(e)}>
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                            <PinInputField />
                        </PinInput>

                    </HStack>

                    {errors.message && <div className=" h-[30px] w-[225px] translate-x-[94%] translate-y-[-60px] flex justify-center items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            {errors.message}
                        </div>
                    </div>}





                </div>







                <div className=' translate-x-[100%] bg-white-500 border-[2px] border-[#7152F3] flex justify-center items-center  w-[150px] h-[50px] w-[250px] text-white rounded-[10px] p-1  ' >
                    <ButtonSubmit spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>{Page === 2 ? 'Get Started' : 'Verify'}</h3>} fct={handleSubmit} />
                </div>

            </div>



        </>
    )
}

export default Security
