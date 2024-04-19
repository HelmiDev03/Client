import { GoPeople } from "react-icons/go";
import {
  MdOutlineDashboard,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
import {  HiOutlineUserRemove } from "react-icons/hi";
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
          itemname: 'Clock in',
          icon: 
          <MdOutlineLibraryAddCheck className="text-[24px]"   />,
          path: '/clockin'
        },
        {
          itemname: 'Projects',
          icon:
          <TiShoppingBag className="text-[24px]"/>,
          path: '/projects'
        },
        
     
        {
          itemname: 'Leaves',
          icon: <HiOutlineUserRemove  className="text-[24px]" />,
          path: '/leaves'
        },
       
        {
          itemname: 'Settings',
          icon: <IoSettingsOutline className="text-[24px]"/>,
          path: '/settings'
        }
   
]