'use client'

import React from 'react'
import styles from '../company/page.module.css'
import { MdFreeBreakfast } from 'react-icons/md'
import { IoMdSettings } from 'react-icons/io';
import { FaSquarePen } from "react-icons/fa6";
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoAddCircleOutline } from 'react-icons/io5';

const TimeOff = () => {
    const [isulhidden, setisulhidden] = React.useState(false)
    return (
        <div  className={styles.container}>

            <div className='flex flex-col justify-between items-start'>
            <div className='flex flex-col justify-start items-start h-[200px] w-[600px] mr-[44px] mb-[44px]   rounded-[36px] hover:cursor-pointer'>
                <MdFreeBreakfast className='text-[24px] text-[#7152F3] mb-4' />
                <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Time off policies</h2>
                <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Create, configure and assign time off policies to your employees.</p>
            </div>
            <div className=' mb-4 w-[221px] h-[50px] absolute top-[13%] right-[5%] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]'>
                <ButtonSubmit
                    text={
                        <div className='flex'>
                            <IoAddCircleOutline className='text-[24px] mr-[6px]' /> Add time off policy
                        </div>
                    }

                />
            </div>
            </div>

            <div className='relative w-[550px] flex flex-col border border-gray-300 p-2 '>
                <FaSquarePen className='absolute right-[50%] top-[-10%] text-[30px] text-gray-600 ' />
                <div className='flex flex row justify-between'>
                    <div className='rounded-[5px] h-[30px] flex justify-center items-center bg-[#7152F3]'><h1 className='text-[#fff] font-lexend font-semibold text-[20px] leading-[30px]'>default</h1></div>
                    <IoMdSettings onClick={()=>setisulhidden(!isulhidden)} className=' relative text-[24px] text-[#7152F3] hover:cursor-pointer  mb-4' />
                   { !isulhidden && <div className="absolute flex flex-col top-[20%]  bg-white shadow-md p-6 right-[-11%] right-[10%]">
                            <h3 className='hover:cursor-pointer mb-3 text-[14px] font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>set as Defaut</h3>
                            <h3 className='hover:cursor-pointer text-[14px]  font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>remove </h3>

                        </div> }
                </div>
                <div className='flex flex-col justify-center items-center border-b border-gray-300  '>
                    <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>default</h1>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>3 employees</p>
                </div>

                <div className='flex flex row justify-center mt-2'>
                    <h1 className='text-[#7152F3] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>view policy</h1>
                </div>
            </div>
        </div>
    )
}

export default TimeOff
