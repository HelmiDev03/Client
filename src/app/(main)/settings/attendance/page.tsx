'use client'
import React, { useEffect, useState } from 'react'
import { FaPen, FaUser } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { GrMapLocation } from "react-icons/gr";
import { RiCompass2Line } from "react-icons/ri";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TbLocationCog } from "react-icons/tb";


const CompanySettings = () => {
    const dispatch = useDispatch<AppDispatch>()
    const pathname = usePathname();
    const errors = useSelector((state: any) => state.errors);

    const company = useSelector((state: any) => state.company);
    const [adress, setAdress] = useState(company.adress);
    const [rangeValue, setRangeValue] = useState(50);
    const activeLinkStyle = "text-blue-500 font-bold border-b-2 border-blue-500 rounded-sm pr-2";
    // Function to handle range input change
    const handleRangeChange = (event:any) => {
      setRangeValue(event.target.value);
    };

    return (
        <div className="mt-20 flex flex-col ml-5 p-16 ">
            <ul className="flex gap-4 justify-self-center self-center">
                <li className={`pr-2 ${pathname === '/settings/attendance' ? activeLinkStyle : ''}`}>
                    <Link href={'/settings/attendance'} className="flex gap-2"><TbLocationCog size={20} />Configuration</Link>
                </li>
                <li className={`${pathname === '/settings/attendance/employees' ? activeLinkStyle : ''}`}>
                    <Link href={'/settings/attendance/employees'} className="flex gap-2"><FaUser size={20} />Employees</Link>
                </li>
            </ul>
           <section className="h-full flex flex-col py-24 gap-20">
                <div id="two_factor" className="flex justify-evenly relative">
                    <div id="Description">
                        <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <GrMapLocation size={25} color="rgb(59 130 246)" />
                        Company Location
                        </h1>
                        <p className="text-gray-400 text-xs ">
                        Visualize your company range. We recommend to<br />
                         set a small range to make attendance checker more accurate.
                        </p>
                    </div>
                    <div className={`absolute top-36 right-[280px] bg-blue-100 border-2 border-blue-600 z-10 w-[${rangeValue}px] h-[${rangeValue}px] rounded-full`}></div>
                    <iframe width="370" height="370" src="https://api.maptiler.com/maps/streets-v2/?key=3UQcPz5oXHuImgJZdvHC#16.75/36.81958802/10.191866/0/60"></iframe>
                </div>
                <div id="change_password" className="flex justify-center gap-x-56">
                    <div id="Description">
                        <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <RiCompass2Line size={25} color="rgb(59 130 246)" />
                        Range Configuration
                        </h1>
                    </div>
                    <div id="inputs" className="bg-blue-100 rounded-md w-[370px] flex flex-col gap-4 p-8">
                    <input id="default-range" type="range" min="10" max="100" value={rangeValue} onChange={handleRangeChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                    </div>
                </div>
                <div id="change_password" className="flex justify-center gap-x-64">
                    <div id="Description">
                        <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <FaMapMarkerAlt size={25} color="rgb(59 130 246)" />
                            Address
                        </h1>
                        <p className="text-gray-400 text-xs ">
                            Fill in the legal address of the company.
                        </p>
                    </div>
                    <div id="inputs" className="bg-blue-100 rounded-md w-[370px] flex flex-col p-4">
                        <div className="mb-3 relative">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                            Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                onChange={(e:any) => {setAdress(e.target.value)}}
                                 value={adress}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.adress && <div className="h-[30px] flex items-center p-4 text-sm font-semibold text-red-500" role="alert">{errors.adress}</div>}
                        </div>
                    </div>
                </div>
            </section>
        </div>

    )
}

export default CompanySettings