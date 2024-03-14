'use client'
import styles from '@/app/(main)/settings/company/page.module.css';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React from 'react';

export default function RootLayout({
    children,
    
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const { policy } = useParams();
    const router = useRouter();

    return (
        <div className={styles.container}>
            <div className='p-3 flex flex-col justify-center items-center border border-b border-gray-200'>
                <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px]'>default</h1>
            </div>
            <div className='p-3 mb-6 flex flex-row justify-center items-center border-b border-gray-200'>
            <h1 onClick={() => router.push(`/settings/timeoff/${policy}/configuration`)} className={`${pathname === `/settings/timeoff/${policy}/configuration` || pathname === `/settings/timeoff/${policy}/` ? 'border-b border-gray-500' : ''} p-2 text-[#16151C] mr-6 font-lexend font-light text-[20px] leading-[25px] hover:cursor-pointer`}>Configuration</h1>

                <h1 onClick={()=>router.push(`/settings/timeoff/${policy}/employees`)} className={`${pathname === `/settings/timeoff/${policy}/employees` ? ' border-b border-gray-500' : ''} text-[#16151C] font-lexend font-light text-[20px] p-2 leading-[25px] hover:cursor-pointer`}>Employees</h1>
            </div>
            <div className='ml-[200px]'>{children}</div>
        </div>
    );
}
