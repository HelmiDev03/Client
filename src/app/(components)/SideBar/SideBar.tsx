'use client'
import React from "react";
import { usePathname } from "next/navigation";
import Image from 'next/image';
import { useSelector } from "react-redux";
import { LuPalmtree } from "react-icons/lu";
import MenuLink from "./menuLink/menuLink";
import styles from "./sidebar.module.css";
import { RxDashboard } from "react-icons/rx";
import { PiUsersThreeFill, PiProjectorScreenChartBold } from "react-icons/pi";
import { IoSettingsOutline } from "react-icons/io5";
import { FaRegClock } from "react-icons/fa6";

const menuItems = [
  {
    title: "Pages",
    list: [
      {
        title: "Dashboard",
        path: '/dashboard',
        icon: <RxDashboard />,
      },
      {
        title: "All Employees",
        path: "/employees",
        icon: <PiUsersThreeFill />,
      },
      {
        title: "Clock In",
        path: "/clockin",
        icon: <FaRegClock />,
      },
      {
        title: "Projects",
        path: "/projects",
        icon: <PiProjectorScreenChartBold />,
      },
      {
        title: "Time off",
        path: "/leaves",
        icon: <LuPalmtree />,
      },
      {
        title: "Settings",
        path: "/settings",
        icon: <IoSettingsOutline />,
      },
    ],
  },
];

// 
const Sidebar=()=> {
  const pathname = usePathname();
  const company = useSelector((state: any) => state.company);
  return (
    <div className={`${styles.container} ${pathname==='/packages' ? 'hidden' : 'block'}`}>
    <div className={styles.user}>
      <Image
        className={styles.userImage}
        src={company.logo ?  company.logo :"/logo.png" }
        alt=""
        width="85"
        height="90"
      />
      {/* <h1 className="text-[22px] text-blue-400 font-black">{company.name}</h1> */}
    </div>
    <ul className={styles.list}>
      {menuItems.map((cat) => (
        <li key={cat.title}>
          <span className={styles.cat}>{cat.title}</span>
          {cat.list.map((item) => (
            <MenuLink item={item} key={item.title} />
          ))}
        </li>
      ))}
    </ul>
  </div>
  );
}

export default Sidebar ;
