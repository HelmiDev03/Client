'use client'
import styles from '@/app/(main)/settings/company/page.module.css';
import axios from 'axios';
import { useParams, usePathname, useRouter } from 'next/navigation';
import React, { useEffect , useState } from 'react';

export default function RootLayout({
    children,
    
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();
    const router = useRouter();
    const {policy} = useParams();
    const [name,setName] = useState('');
    useEffect(() => {
        console.log(policy);
       axios.get(process.env.NEXT_PUBLIC_DOMAIN+`/api/policy/get/${policy}`)
         .then(res => {
              setName(res.data.policy.name);
         })
    }, )
    return (
        <div className={styles.container}>
            <div className='p-3 flex flex-col justify-center items-center border border-b border-gray-100'>
                <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px]'>{name}</h1>
            </div>
            <div className='p-3 mb-6 flex flex-row justify-center items-center border-b border-gray-100'>
            <h1 onClick={() => router.push(`/settings/timeoff/${policy}/configuration`)} className={`${pathname === `/settings/timeoff/${policy}/configuration` || pathname === `/settings/timeoff/${policy}/` ? 'border-b border-gray-500' : ''} p-2 text-[#16151C] mr-6 font-lexend font-light text-[20px] leading-[25px] hover:cursor-pointer`}>Configuration</h1>

                <h1 onClick={()=>router.push(`/settings/timeoff/${policy}/policyemployees`)} className={`${pathname === `/settings/timeoff/${policy}/policyemployees` ? ' border-b border-gray-500' : ''} text-[#16151C] font-lexend font-light text-[20px] p-2 leading-[25px] hover:cursor-pointer`}>Employees</h1>
            </div>
            <div className='ml-[200px]'>{children}</div>
        </div>
    );
}
