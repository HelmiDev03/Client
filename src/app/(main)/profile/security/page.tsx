'use client'
import { HStack, PinInput, PinInputField } from '@chakra-ui/react'
import ButtonSubmit from "@/app/(components)/ButtonSubmit/Button";
import { ChangePassword } from "@/redux/actions/userActions/changePassword";
import { AppDispatch } from "@/redux/store";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from 'flowbite-react';
import { RiLockPasswordLine } from "react-icons/ri";
import axios from 'axios';
import { setAuth } from '@/redux/utils/setAuth';
import { jwtDecode } from 'jwt-decode';
import toast from 'react-hot-toast';
import { HiOutlineFingerPrint } from "react-icons/hi";
import { LiaUserLockSolid, LiaUserShieldSolid } from "react-icons/lia";
import { FiLock, FiUnlock } from "react-icons/fi";

const Security = () => {
    const [openPopupDelete, setOpenPopupDelete] = useState(false);
    const [popupDeletePage, setPopupDeletePage] = useState(1);
    const auth = useSelector((state: any) => state.auth)
    const [Page, setPage] = useState(1);
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
    
    const errors = useSelector((state: any) => state.errors)
    const dispatch = useDispatch<AppDispatch>()

    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);
    const [pwdVisible , setPwdVisible] = useState(false);
    const changePassword = () => {
        
        if (! /[A-Z]/.test(newPassword) || ! /[a-z]/.test(newPassword) || ! /\d/.test(newPassword) || !  /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) || newPassword.length < 12) {
            toast.error('Password must contain at least:\n- 12 characters\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character');
            return;
            
        }
        setOldPassword('')
        setNewPassword('')
        dispatch(ChangePassword({ oldPassword, newPassword }))



    }


    const handleSubmit = () => {
        if (Page === 2) {
            //ap//tfa/sendotp
            axios.post(process.env.NEXT_PUBLIC_DOMAIN+'/api/tfa/sendotp')
                .catch(err => {
                     toast.error(err.response.data.message);
                     window.location.reload();
                     

                }
                )


            setPage(21)
        }
        else if (Page === 21) {
            //api//tfa/verifyotp
            axios.post(process.env.NEXT_PUBLIC_DOMAIN+'/api/tfa/verifyotp', { token: otp })
                .then(
                    res => {
                        setPage(1)
                        toast.success(res.data.message);
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
                    toast.error(err.response.data.message)
                )

        }

    }


    const disabeltfa = () => {
        axios.put(process.env.NEXT_PUBLIC_DOMAIN+'/api/tfa/disable')
            .then(res => {
                const decodedToken = jwtDecode(res.data.token);
                        dispatch({
                            type: 'SET_USER',
                            payload: decodedToken
                        });
                localStorage.setItem('jwt', res.data.token);
                setAuth(res.data.token);
                setOpenPopupDelete(false);
            })
        

    }

    return (

        <>
            <div className={` ${Page === 1 ? 'block' : 'hidden'} flex flex-col  ml-4 justify-center items-center `} >
            
                <section className="h-full flex flex-col pt-16 gap-20">
                    <div id="change_password" className="flex justify-center gap-x-56">
                        <div id="Description">
                            <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                                <HiOutlineFingerPrint size={25} className='text-blue-500' />
                                Change password
                            </h1>
                            <p className="text-gray-400 text-xs ">
                                We recommend changing your password <br />
                                frenquently to keep your account secure
                            </p>
                        </div>
                        <div id="inputs" className="bg-blue-100 rounded-md w-[370px] flex flex-col gap-4 p-8">
                            <div className="mb-3 relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    Old Password
                                </label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    value={oldPassword}
                                    onChange={(e: any) => setOldPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="•••••••••"
                                />
                                <div className="absolute top-10 right-2 cursor-pointer" onClick={toggleShowPassword} >
                                    { showPassword ? <FiUnlock /> : <FiLock /> }
                                </div>
                               
                            </div>
                            <div className="mb-3 relative">
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">
                                    New Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={newPassword}
                                    onChange={(e: any) => setNewPassword(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    placeholder="•••••••••"
                                />
                                <div className="absolute top-10 right-2 cursor-pointer" onClick={toggleShowPassword} >
                                    { showPassword ? <FiUnlock /> : <FiLock /> }
                                </div>
                            </div>
                            <button onClick={changePassword}
                                className="text-blue-700 hover:text-white border border-blue-400 hover:bg-blue-400 focus:bg-blue-400 focus:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">
                                Save Changes 
                            </button>
                        </div>
                    </div>
                    <div id="two_factor" className="flex justify-center gap-x-40">
                        <div id="Description">
                            <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                                <LiaUserLockSolid size={25} className='text-blue-500' />
                                Two-factor authentication
                            </h1>
                            <p className="text-gray-400 text-xs ">
                                Two-factor authentication (TFA) adds a <br />
                                second layer of security to your account.
                            </p>
                        </div>
                        <div id="inputs" className="bg-blue-100 rounded-md w-[370px] flex flex-col gap-4 p-8">
                            <h1 className="font-semibold text-xs ">TFA Configuration</h1>
                            <h6 className='text-blue-700 border border-blue-400 font-medium rounded-lg text-xs px-2 py-1 text-center w-36'>{auth.user.tfa ? "Configured" : "Not configured"}</h6>
                            <p className="text-xs mb-10">
                                After setting up next time you login it will require a code to
                                validate your identity for extra security.
                            </p>
                            
                            <div className='bg-white-500 border-[2px] flex justify-center items-center h-[30px] w-[250px] text-white rounded-[10px] p-1' >
                                {!auth.user.tfa && <button
                                    onClick={() => setPage(2)}
                                    
                                    type="button"
                                    className="text-blue-700 hover:text-white border border-blue-400 hover:bg-blue-400 focus:bg-blue-400 focus:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">
                                    Configure Two factor authentification
                                </button>}
                                {auth.user.tfa && <button
                                    onClick={() => setOpenPopupDelete(true)}
                                    type="button"
                                    className="text-blue-700 hover:text-white border border-blue-400 hover:bg-blue-400 focus:bg-blue-400 focus:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">
                                    Disable Two factor authentification
                                </button>}

                                {openPopupDelete && <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="bg-slate-200 overflow-y-auto overflow-x-hidden absolute w-[500px] top-[80%] right-[35%] center rounded-2xl z-50 justify-center items-center">
                                    <div  className="bg-[#eee] relative w-full">
                                        <div className="bg-[#eee] relative">
                                            <div className="flex items-center justify-between p-4 md:p-5 border-b border-red-200 rounded-t">
                                                <h3 className="text-xl font-semibold text-gray-900 ">
                                                    Disable 2 Factor Verification
                                                </h3>
                                                <div onClick={() => { setOpenPopupDelete(!openPopupDelete); }} >
                                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-hide="static-modal">
                                                        <svg className="w-3 h-3 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                                            <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                                        </svg>
                                                        <span className="sr-only">Close modal</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="p-8 flex flex-col gap-4">
                                                <p className="text-base leading-relaxed text-gray-500">
                                                    Your account is more secure when you need a password and a verification code to sign in. If you remove this extra layer of security, you will only be asked for a password when you sign in. It might be easier for someone to break into your account.
                                                </p>
                                                <button
                                                    onClick={disabeltfa}
                                                    // onClick={() => setOpenPopupDelete(true)}
                                                    type="button"
                                                    className="text-blue-700 hover:text-white border border-blue-400 hover:bg-blue-400 focus:bg-blue-400 focus:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center me-2 mb-2">
                                                    {popupDeletePage === 1 ? 'I have read and understand these effects' : 'Delete this employee'}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <div className={` ${Page === 2 || Page === 21 ? 'block' : 'hidden'} flex flex-col justify-center items-center`} >
                <div className="mb-4 flex flex-row justify-center h-[150px]">
                    <img src='/tfa.png' width={560} />
                </div>
                <div className={`${Page != 21 ? 'block' : 'hidden'} mt-4`} >
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
                    <HStack className='translate-x-[30%] mt-[65px] mb-[100px]'>
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

                <div className='translate-x-[100%] bg-white-500 border-[2px] border-[#7152F3] flex justify-center items-center h-[50px] w-[250px] text-white rounded-[10px] p-1' >
                    <ButtonSubmit spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>{Page === 2 ? 'Get Started' : 'Verify'}</h3>} fct={handleSubmit} />
                </div>
            </div>
        </>
    )
}

export default Security