'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavItems } from "./NavItems";
import Image from 'next/image';
import { useSelector } from "react-redux";

const Sidebar=()=> {
  const pathname = usePathname();
  const company = useSelector((state: any) => state.company);
  return (
    <div className={`  ${pathname==='/packages' ? 'hidden' : 'block'}           w-[280px] h-[97%] rounded-[15px]   ml-[10px] bg-[#EEF1F6]    translate-y-[15px]`}  >
      <div className="w-[132px] h-[40px] leading-10 font-semibold header-nav flex translate-x-16 translate-y-3  ">
        <Link  className="mr-[5px]"   href="/">
          <Image

            width={40}
            height={40}
            
            src={company.logo ?  company.logo :"/logo.png" }
            alt=""
          />
        </Link>
        <p className="font-lexend"> {company.name}</p>
      </div>

      <aside  className="flex items-center justify-center mt-8 ">
        <div className="sidebar">
          <nav >
            <ul>
          {NavItems.map((item, index) => {
  return (
    <li className="mb-2 hover:font-bold" key={index}>
      <Link
        prefetch={false}
        href={item.path}
        className={`flex items-center px-3 py-2 transition-colors duration-300 transform rounded-lg hover:text-indigo-600 hover:bg-blue-200 hover:rounded-lg hover:text-bold hover:cursor-pointer hover:duration-300 ${
          (pathname === item.path || pathname.includes(item.path)) ? "text-indigo-600 font-bold bg-blue-200" : ""
        }`}
      >
        {item.icon}
        <p className={`ml-2 p-1 font-lexend text-16 font-bold leading-24 align-left ${pathname === item.path || pathname.includes(item.path) ? "font-bold" : "font-light"}`}>
          {item.itemname}
        </p>
      </Link>
    </li>
  );
})}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}

export default Sidebar ;
