
'use client'
import Link from 'next/link'
import React from 'react'

import { useDispatch  } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { LogoutAction } from '@/redux/actions/userActions/lougoutActions'

const DropDown = () => {
  
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className="absolute    top-full right-8 bg-white shadow-md translate-y-[-18px] rounded-[10px]  bg-gray-100">
    {/* Dropdown content goes here */}
    <ul className="pt-2 w-48 flex flex-col justify-center items-center">
  <li className='p-2 hover:bg-blue-100 w-full rounded block px-4 py-2 text-gray-800 text-center'>
    <Link prefetch={false} href="/profile">My Profile</Link>
  </li>
  <li   onClick = {()=>dispatch	(LogoutAction())}          className='p-2 hover:bg-blue-100 w-full rounded block px-4 py-2 text-gray-800 text-center'>
    Sign out
  </li>
</ul>
  </div>
  )
}

export default DropDown
