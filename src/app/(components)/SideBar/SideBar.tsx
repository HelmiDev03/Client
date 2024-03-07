'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { NavItems } from "./NavItems";
import Image from 'next/image';

const Sidebar=()=> {
  const pathname = usePathname();
  
  return (
    <div className={`  ${pathname==='/packages' ? 'hidden' : 'block'}           w-[280px] h-[97%] rounded-[15px]   ml-[10px] bg-blue-100     translate-y-[15px]`}  >
      <div className="w-[132px] h-[40px] leading-10 font-semibold header-nav flex translate-x-16 translate-y-3  ">
        <Link  className="mr-[5px]"   href="/">
          <Image

            width={40}
            height={40}
            
            src="/logo.png"
            alt=""
          />
        </Link>
        <p className="font-lexend">NRH </p>
      </div>

      <aside  className="flex items-center justify-center mt-8 ">
        <div className="sidebar">
          <nav >
            <ul>
              {NavItems.map((item, index) => {
                return (
                  <li className="mb-2 " key={index} >
                    <Link
                      prefetch={false}
                      href={item.path}
                      className={`flex items-center  px-3 py-2 transition-colors duration-300 transform rounded hover:text-indigo-600 hover:bg-blue-200 hover:font-bold  hover:rounded-lg hover:cursor-pointer hover:duration-300
                        ${(pathname === `${item.path}` || pathname.includes(`${item.path}`)) ? " text-indigo-600 font-bold bg-blue-200 " : "text-[#16151C]"}`}
                    >
                     
                      {item.icon}
                      <p className={`l-2 font-lexend text-[16px] font-bold leading-[24x] align-left ml-[10px] ${pathname === `${item.path}` || pathname.includes(`${item.path}` ) ? "  font-bold" : "font-light"}  `}>{item.itemname}</p>
                      
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
