'use client'

import React from 'react'
import styles from '../company/page.module.css'
import { MdFreeBreakfast } from 'react-icons/md'
import { IoMdClose, IoMdSettings } from 'react-icons/io';
import { FaSquarePen } from "react-icons/fa6";
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoAddCircleOutline } from 'react-icons/io5';
import { MdHolidayVillage } from "react-icons/md";
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
const TimeOff = () => {
    const company = useSelector((state: any) => state.company)
    const policies = useSelector((state: any) => state.policies)
    const errors = useSelector((state: any) => state.errors)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const [isulhidden, setisulhidden] = React.useState(false)
    const [PolicyName, setPolicyName] = React.useState('')
    const [PopupAddPolicy, setPopupAddPolicy] = React.useState(false)
    const [PopupAddDay, setPopupAddDay] = React.useState(false)
    const [Day, setDay] = React.useState('')
    const [Name, setName] = React.useState('')
    const [isHidden, setIsHidden] = React.useState(new Array(policies.length).fill(false))
    const toggleVisibility = (index: number) => {
        const newIsHidden = isHidden.map((item, i) => i === index ? !item : false)
        setIsHidden(newIsHidden)
    }
    
    const AddPolicy = () => {
        
        if (PolicyName) {
            axios.post('http://localhost:5000/api/policy/create', { name: PolicyName })
                .then(res => {
                    dispatch({
                        type: 'SET_POLICIES',
                        payload: res.data.policies
                    });
                    setPolicyName('')
                    
                    setPopupAddPolicy(false)
                    dispatch({
                        type: 'ERRORS',
                        payload: {}
                    
                    })
                    
                })
                .catch((err:any) => {
                    dispatch({
                        type: 'ERRORS',
                        payload: err.response.data
                    
                    })
                })
                
        }
        else {
            return;
        }
    }

   




    const AddNationalDay = () => {
        setPopupAddDay(false)
        if (Name && Day) {

            axios.put('http://localhost:5000/api/company/updateNationalDays', { name: Name, day:Day })
                .then(res => {
                    dispatch({
                        type: 'UPDATE_COMPANY',
                        payload: res.data.company
                    });
                    setDay('')
                    setName('')
                })
                .catch(err => {
                    console.log(err)
                })
        }
        else {
            return;
        }
    }
    return (
        <div className={styles.container}>

            {/* in case add policy */}
            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddPolicy ? 'block' : 'hidden'}           p-4 z-10 bg-[#eee] shadow-lg  absolute w-[500px] translate-x-[300px]  translate-y-[100px] center rounded-[25px] `}>
                <IoMdClose onClick={() =>{ dispatch({type: 'ERRORS',payload: {}}); setPopupAddPolicy(!PopupAddPolicy)}} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="w-[90vw] max-w-md">

                    <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Add new time off policy</div>
                    <div className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>Write here the policy name and the amount and type of holiday days employees have</div>


                    <div className="space-y-4 mb-12">
                        <div className={styles.inputContainer}>
                            <Input5 onChange={(e: any) => { setPolicyName(e.target.value) }} value={PolicyName} label="Policy Name" type="text" />
                            {errors.name && <div className=" h-[30px] w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                       {errors.name}
                            </div>
                        </div>}
                        </div>





                    </div>
                    <div>
                        <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={AddPolicy} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add </h3>} />


                        </div>
                    </div>
                </div>
            </div>



            {/* end of add policy */}


            {/* in case add dnational day */}
            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddDay ? 'block' : 'hidden'}           p-4 z-10 bg-[#eee] shadow-lg  absolute w-[500px] translate-x-[300px]  translate-y-[250px] center rounded-[25px] `}>
                <IoMdClose onClick={() => setPopupAddDay(!PopupAddDay)} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="w-[90vw] max-w-md">

                    <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Add National Day</div>


                    <div className="space-y-4">
                        <div className={styles.inputContainer}>
                            <Input5 onChange={(e: any) => { setName(e.target.value) }} value={Name} label="National Day Name" type="text" />

                        </div>

                        <div className={styles.inputContainer}>
                            <Input5 onChange={(e: any) => { setDay(e.target.value) }} value={Day} label="National Day Date" type="date" />

                        </div>


                        <div className="grid gap-4">

                        </div>
                    </div>
                    <div>
                        <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={AddNationalDay} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add </h3>} />


                        </div>
                    </div>
                </div>
            </div>

            {/* end of add national day */}



            <div className='flex flex-col justify-between items-start'>
                <div className='flex flex-col justify-start items-start h-[200px] w-[600px] mr-[44px] mb-[44px]   rounded-[36px] hover:cursor-pointer'>
                    <MdFreeBreakfast className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Time off policies</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Create, configure and assign time off policies to your employees.</p>
                </div>
                <div className=' mb-4 w-[221px] h-[50px] absolute top-[13%] right-[5%] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]'>
                    <ButtonSubmit
                        fct={() => setPopupAddPolicy(true)}
                        timing={200}
                        text={
                            <div className='flex'>
                                <IoAddCircleOutline className='text-[24px] mr-[6px]' /> Add time off policy
                            </div>
                        }

                    />
                </div>
            </div>


            {/* available policies*/}
            <div className='flex flex-wrap flex-row mb-[30px]'>
                

                {policies.map((policy: any, index: any) => (
                    <div key={policy.name} className='relative w-[550px] mb-6  mr-6 flex flex-col border border-gray-300 p-2'>
                        <FaSquarePen className='absolute right-[50%] top-[-10%] text-[30px] text-gray-600 ' />
                        <div className='flex flex-row justify-between'>
                            <div className='rounded-[5px] h-[30px] flex justify-center items-center bg-[#7152F3]'>
                               {policy.isdefault && <h1 className='text-[#fff] font-lexend font-semibold text-[20px] leading-[30px]'>Default</h1> }
                            </div>
                            <IoMdSettings onClick={() => toggleVisibility(index)} className='relative text-[24px] text-[#7152F3] hover:cursor-pointer mb-4' />
                            {isHidden[index] && (
                                <div className="absolute flex flex-col top-[20%] bg-white shadow-md p-6 right-[-11%] right-[10%]">
                                    {!policy.isdefault && (
                                        <>
                                            <h3 className='hover:cursor-pointer mb-3 text-[14px] font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>Set as Default</h3>
                                            <h3 className='hover:cursor-pointer text-[14px] font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>Remove</h3>
                                        </>
                                    )}
                                    {policy.isdefault && (
                                        <div className='w-[150px]' >
                                            <h3 className='hover:cursor-pointer mb-3 text-[14px] font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>Remove</h3>
                                            <h3 className='hover:cursor-pointer text-[14px] font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>You cannot remove the main policy. Please select another policy as the main policy first.</h3>
                                        </div>
                                    )}
                                </div>
                            )}

                        </div>
                        <div className='flex flex-col justify-center items-center border-b border-gray-300'>
                            <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>{policy.name}</h1>

                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>
                                {Object.keys(policy.employees).length !=1 ? Object.keys(policy.employees).length + " employees  assigned to this policy": Object.keys(policy.employees).length +" employee  assigned to this policy" } 
                            </p>

                        </div>
                        <div className='flex flex-row justify-center mt-2'>
                            <h1 onClick={()=>router.push(`/settings/timeoff/${policy._id}`)} className='hover:cursor-pointer text-[#7152F3] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>View Policy</h1>
                        </div>
                    </div>
                ))}


            </div>
            {/* end of available policies */}


























            {/* national days */}



            <div className='flex flex-col justify-start items-start  w-[600px] mr-[44px] mb-[44px]   rounded-[36px] hover:cursor-pointer'>
                <MdHolidayVillage className='text-[24px] text-[#7152F3] mb-4' />
                <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>National Days</h2>
                <div className='flex flex-row justify-between items-center '>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-6'>Configure National Days</p>
                    <div className=' bg-white-500 border-[2px] translate-x-[30px] translate-y-[-10px]  flex justify-center items-center border-[#7152F3] w-[150px] h-[30px]  text-white rounded-[10px] p-1  ' >
                        <ButtonSubmit fct={() => setPopupAddDay(!PopupAddDay)} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add A Day</h3>} />


                    </div>
                </div>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500  border border-gray-300 p-2 ">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 ">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    Day Name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Action
                                </th>

                            </tr>
                        </thead>
                        <tbody>

                            {company.nationaldays.map((day: any, index: number) => (
                                <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {day.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {day.day}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button onClick={() => axios.put('http://localhost:5000/api/company/deleteNationalDays', { index }).then(res => {
                                            dispatch({
                                                type: 'UPDATE_COMPANY',
                                                payload: res.data.company
                                            });
                                        })} type="submit"      ><AiOutlineDelete className='  font-lexend font-light  leading-[24px] text-red-500 text-[20px]' /></button>
                                    </td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>

            </div>

            {/* end of national days */}
        </div>
    )
}

export default TimeOff
