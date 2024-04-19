'use client'
import React from 'react'
import styles from '@/app/(main)/page.module.css'
import { IoMdSettings } from 'react-icons/io';
import { MdFreeBreakfast } from "react-icons/md";
import { MdOutlineGroups3 } from "react-icons/md";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSelector } from 'react-redux';









const Settings = () => {
    const router = useRouter()

    const permission = useSelector((state: any) => state.permission);

    

    return (
        <div className={styles.container}>
            <div className='flex flex-wrap justify-center mt-5'>
                {permission.viewcompanydetails && <div onClick={() => router.push('/settings/company')} className='flex flex-col justify-center items-center h-[200px] w-[350px] mr-[44px] mb-[44px]  bg-[#eee] rounded-[36px] hover:cursor-pointer'>
                    <IoMdSettings className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Company Details</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>View and Update your company details</p>
                </div>}
                {
                    permission.viewtimeoffpiliciespage && <div onClick={() => router.push('/settings/timeoff')} className='flex flex-col justify-center items-center h-[200px] w-[350px]  mr-[44px] mb-[44px]  bg-[#eee] rounded-[36px] hover:cursor-pointer'>
                        <MdFreeBreakfast className='text-[24px] text-[#7152F3] mb-4' />
                        <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Time Off</h2>
                        <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Set and assign your company's time off policies</p>
                    </div>}
            </div>



            
            <div className='flex flex-wrap justify-center mt-5'>
                <div onClick={() => router.push('/settings/permissionsgroups')} className='flex flex-col justify-center items-center h-[200px] w-[350px]  mr-[44px] mb-[44px]  bg-[#eee] rounded-[36px] hover:cursor-pointer'>
                    < MdOutlineGroups3 className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Permissions</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Set and assign your company's permissions</p>
                </div>
                <div onClick={() => router.push('/profile')} className='flex flex-col justify-center items-center h-[200px] w-[350px]  mr-[44px] mb-[44px]  bg-[#eee] rounded-[36px] hover:cursor-pointer'>
                    <IoMdSettings className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Profile Settings</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>View and Update your profile settings</p>
                </div>
            </div>
        </div>

    )
}

export default Settings
