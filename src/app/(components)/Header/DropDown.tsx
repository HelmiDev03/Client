
'use client'
import Link from 'next/link'
import React from 'react'

import { useDispatch, useSelector  } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { LogoutAction } from '@/redux/actions/userActions/lougoutActions'
import axios from 'axios'

const DropDown = () => {
  const todayhour = useSelector((state: any) => state.todayhour);
  


  
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="absolute    top-full right-8 bg-white shadow-md translate-y-[-18px] rounded-[10px]  bg-gray-100">
    {/* Dropdown content goes here */}
    <ul className="pt-2 w-48 flex flex-col justify-center items-center">
  <li className='p-2 hover:bg-blue-100 w-full rounded block px-4 py-2 text-gray-800 text-center'>
    <Link prefetch={false} href="/profile">My Profile</Link>
  </li>
  <li   onClick = {()=>{
    if (todayhour.increment) 
      axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/attendance/clockout' , {newdiff: {hr: todayhour.hr, min: todayhour.min, sec:todayhour.sec}})
    dispatch	(LogoutAction())
    }}          className='p-2 hover:bg-blue-100 w-full rounded block px-4 py-2 text-gray-800 text-center'>
    Sign out
  </li>
</ul>
  </div>
  )
}

export default DropDown
