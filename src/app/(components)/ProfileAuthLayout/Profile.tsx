'use client'
import Image from 'next/image'
import styles from '@/app/(main)/page.module.css'
import { AiOutlineMail } from "react-icons/ai";
import { PiEyedropperLight } from "react-icons/pi";
import { IoNewspaperOutline, IoPerson, IoPersonOutline } from "react-icons/io5";
import { MdOutlineLibraryAddCheck, MdOutlineSecurity, MdWorkOutline } from "react-icons/md";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import axios from 'axios';









const Layout = ({ children }: { children: React.ReactNode }) => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [profilepicture, setProfilepicture] = useState('');

    const pathname = usePathname();
    const { employeeId } = useParams();



    useEffect(() => {

        axios.get(`http://localhost:5000/api/employees/employee/${employeeId}`).then((res) => {
            
            setFirstname(res.data.employee.firstname)
            setLastname(res.data.employee.lastname)
            setEmail(res.data.employee.email)
            setRole(res.data.employee.role)
            setProfilepicture(res.data.employee.profilepicture)
        })


    })

















    return (
        <div className={styles.ProfileContainer}>
            <div className="flex flex-row justify-between items-center mb-6">
                <div className="w-[324px]    flex flex-row justify-start">
                    <div className='relative hover:cursor-pointer rounded-[10px]'><Image alt='image' style={{ position: 'relative', borderRadius: '10px', width: '100px', height: '100px', marginRight: '10px' }} width={100} height={100} priority={false} src={profilepicture ? profilepicture : '/defaultprofilepicture.png'} />
                    </div>




                    <div className="flex flex-col">

                        <h3 className=" font-lexend font-semibold text-[24px] leading-[36px] mb-2">{firstname} {lastname}</h3>
                        <p className=" font-lexend font-light flex text-[16px] leading-[24px] mb-2"><PiEyedropperLight className='text-[24px] mr-2' />{role}</p>
                        <p className=" font-lexend font-light text-[16px] flex leading-[24px] mb-2"> <AiOutlineMail className='text-[24px] mr-2' />{email}</p>
                    </div>
                </div>

            </div>
            <div className="flex flex-row justify-between height-auto ">
                <div className="flex flex-col justify-center items-start w-[242px] h-[167px] mr-3 mt-5 rounded-[10px]  bg-opacity-[20%] bg-white-500">
                    <h3 className={`p-3 flex justify-start items-center font-lexendfont-light text-[16px] rounded-[10px] w-[100%] leading-[24px] mb-2 hover:cursor-pointer ${pathname.includes(`/employees/${employeeId}`) ? 'text-[#eee] bg-[#7152F3]' : 'text-[#16151C]'}`}>
                        <IoPersonOutline className="text-[20px] mr-3" /> Profile
                    </h3>

                    <h3 className={` p-3  flex justify-start items-center font-lexendfont-light flex text-[16px] rounded-[10px]  w-[100%] leading-[24px] mb-2 hover:cursor-pointer text-[#16151C] `}> <MdOutlineLibraryAddCheck className="text-[20px] mr-3" />Attednance</h3>
                    <h3 className={` p-3  flex justify-start items-center font-lexendfont-light flex text-[16px] rounded-[10px]  w-[100%] leading-[24px] mb-2 hover:cursor-pointer   text-[#16151C] `}><IoNewspaperOutline className="text-[20px] mr-3 text-[20px]" />Projects</h3>
                </div>
                <div className={`flex flex-col w-[768px]  height-auto rounded-[10px] bg-white  ml-4 `}>

                    <div className="flex flex-row sm:flex-row sm:justify-start mb-[45px]  ">
                        <h3>
                            <Link
                                prefetch={false}
                                href={`/employees/${employeeId}/personalinformation`}
                                className={`flex mr-4 align-left flex items-center text-[16px] leading-[24px] font-lexendfont-semibold px-3 py-2 transition-colors duration-300 transform hover:bg-gray-50 l-2 hover:cursor-pointer border-b-[3px] ${pathname === `/employees/${employeeId}` || pathname === `/employees/${employeeId}/personalinformation` ? 'border-indigo-600 text-indigo-600' : 'border-[#ffffff] text-[#16151C]'}`}>
                                <IoPerson className="text-[24px] mr-3" /> Personal Information
                            </Link>
                        </h3>
                        <h3>
                            <Link
                                prefetch={false}
                                href={`/employees/${employeeId}/professionelInformation`}
                                className={`flex mr-4 align-left flex items-center text-[16px] leading-[24px] font-lexendfont-semibold px-3 py-2 transition-colors duration-300 transform hover:bg-gray-50 l-2 hover:cursor-pointer border-b-[3px] ${pathname === `/employees/${employeeId}/professionelInformation` ? 'border-indigo-600 text-indigo-600' : 'border-[#ffffff] text-[#16151C]'}`}>
                                <MdWorkOutline className="text-[24px] mr-3" /> Professional Information
                            </Link>
                        </h3>

                    </div>


                    {children}






                </div>
            </div>
        </div>
    )
}

export default Layout
