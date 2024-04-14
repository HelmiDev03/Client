import { GoPeople } from "react-icons/go";
import {
  MdOutlineDashboard,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
import {  HiOutlineUserRemove } from "react-icons/hi";
import { AiOutlineUserAdd } from "react-icons/ai";
import { LiaHandHoldingHeartSolid } from "react-icons/lia";
import { IoSettingsOutline } from "react-icons/io5";
import { TiShoppingBag } from "react-icons/ti";


export const NavItems = [

        {
          itemname: 'Dashboard',
          icon:   <MdOutlineDashboard className="text-[24px]" />,
          path: '/dashboard'
        },
        {
          itemname: 'All Employees',
          icon: 
          <GoPeople className="text-[24px]"/> ,
          path: '/employees'
        },
     
        {
          itemname: 'Attendance',
          icon: 
          <MdOutlineLibraryAddCheck className="text-[24px]"   />,
          path: '#'
        },
        {
          itemname: 'Projects',
          icon:
          <TiShoppingBag className="text-[24px]"/>,
          path: '/projects'
        },
        {
          itemname: 'Candidates',
          icon: <AiOutlineUserAdd   className="text-[24px]"   />,
          path: '#'
        },
     
        {
          itemname: 'Leaves',
          icon: <HiOutlineUserRemove  className="text-[24px]" />,
          path: '/leaves'
        },
        {
          itemname: 'Holidays',
          icon: <LiaHandHoldingHeartSolid  className="text-[24px]" />,
          path: '#'
        },
        {
          itemname: 'Settings',
          icon: <IoSettingsOutline className="text-[24px]"/>,
          path: '/settings'
        }
   
]