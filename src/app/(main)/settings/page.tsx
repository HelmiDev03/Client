'use client'
import React from 'react'
import styles from '@/app/(main)/page.module.css'
import { IoMdSettings } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const Settings = () => {
    const router = useRouter()
  return (
    <div className={styles.container}>
    <div className='flex flex-wrap justify-center mt-5'>
        <div onClick={()=>router.push('/settings/company')}      className='flex flex-col justify-center items-center h-[200px] w-[350px] mr-[44px] mb-[44px]  bg-[#dedede] rounded-[36px] hover:cursor-pointer'>
            <IoMdSettings className='text-[24px] text-[#7152F3] mb-4' />
            <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Company Details</h2>
            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>View and Update your company details</p>
        </div>
        <div className='flex flex-col justify-center items-center h-[200px] w-[350px]  mr-[44px] mb-[44px]  bg-[#dedede] rounded-[36px] hover:cursor-pointer'>
            <IoMdSettings className='text-[24px] text-[#7152F3] mb-4' />
            <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Company Details</h2>
            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>View and Update your company details</p>
        </div>
    </div>
    <div className='flex flex-wrap justify-center mt-5'>
    <div className='flex flex-col justify-center items-center h-[200px] w-[350px]  mr-[44px] mb-[44px]  bg-[#dedede] rounded-[36px] hover:cursor-pointer'>
            <IoMdSettings className='text-[24px] text-[#7152F3] mb-4' />
            <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Company Details</h2>
            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>View and Update your company details</p>
        </div>
        <div className='flex flex-col justify-center items-center h-[200px] w-[350px]  mr-[44px] mb-[44px]  bg-[#dedede] rounded-[36px] hover:cursor-pointer'>
            <IoMdSettings className='text-[24px] text-[#7152F3] mb-4' />
            <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Company Details</h2>
            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>View and Update your company details</p>
        </div>
    </div>
</div>

  ) 
}

export default Settings
