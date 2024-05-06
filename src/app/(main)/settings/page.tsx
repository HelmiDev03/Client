'use client'
import React from 'react';
import { MdLockPerson } from "react-icons/md";
import { FaRegClock, FaUserCog } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { RiListSettingsFill } from "react-icons/ri";
import { TbCalendarTime } from "react-icons/tb";
import { GoGear } from "react-icons/go";
import { useSelector } from 'react-redux';


const Settings = () => {
    const router = useRouter()
    const permission  = useSelector((state: any) => state.permission)

    

    return (
        <div className="mt-20 flex flex-col ml-5 p-16">
            <div className='flex gap-2 text-4xl font-semibold text-blue-600'>
                <RiListSettingsFill />
                <h1>General</h1>
            </div>
            <section className='flex flex-wrap justify-center gap-8 p-16 mb-5'>
                {permission.viewcompanydetails &&<div onClick={() => router.push('/settings/company')} className='flex flex-col gap-2 border-2 rounded-2xl w-[470px] p-8 cursor-pointer hover:border-slate-300'>
                <GoGear className='text-blue-600 mb-4' size={30} />
                <h2 className='font-semibold text-xl'>Company Details</h2>
                <p className='text-sm font-light text-gray-500'>View and Update your company details</p>
                </div>}
                
                {permission.viewtimeoffpiliciespage &&<div onClick={() => router.push('/settings/timeoff')} className='flex flex-col gap-2 border-2 rounded-2xl w-[470px] p-8 cursor-pointer hover:border-slate-300'>
                <TbCalendarTime className='text-blue-600 mb-4' size={30} />
                <h2 className='font-semibold text-xl'>Time Off</h2>
                <p className='text-sm font-light text-gray-500'>Set and assign your company's time off policies</p>
                </div>}

                <div onClick={() => router.push('/settings/permissionsgroups')} className='flex flex-col gap-2 border-2 rounded-2xl w-[470px] p-8 cursor-pointer hover:border-slate-300'>
                <MdLockPerson className='text-blue-600 mb-4' size={30} />
                <h2 className='font-semibold text-xl'>Permissions</h2>
                <p className='text-sm font-light text-gray-500'>Set and assign your company's permissions</p>
                </div>

                <div onClick={() => router.push('/profile')} className='flex flex-col gap-2 border-2 rounded-2xl w-[470px] p-8 cursor-pointer hover:border-slate-300'>
                <FaUserCog className='text-blue-600 mb-4' size={30} />
                <h2 className='font-semibold text-xl'>Profile Settings</h2>
                <p className='text-sm font-light text-gray-500'>View and Update your profile settings</p>
                </div>
                <div onClick={() => router.push('/settings/attendance')} className='flex flex-col gap-2 border-2 rounded-2xl w-[470px] p-8 cursor-pointer hover:border-slate-300'>
                <FaRegClock className='text-blue-600 mb-4' size={30} />
                <h2 className='font-semibold text-xl'>Clock In</h2>
                <p className='text-sm font-light text-gray-500'>Set and assign your company's attendance policies</p>
                </div>
            </section>
        </div>
    );
}

export default Settings