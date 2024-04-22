'use client';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { useEffect, useState } from "react";
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, usePathname, useRouter } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import { IoIosArrowForward } from "react-icons/io";

import { io } from 'socket.io-client';
import Link from "next/link";
import { PiBell, PiCaretDownBold } from "react-icons/pi";
import { AppDispatch } from '@/redux/store';
import { LogoutAction } from '@/redux/actions/userActions/lougoutActions';













const Header = () => {
  const auth = useSelector((state: any) => state.auth);
  const notif = useSelector((state: any) => state.notif);
  const dispatch = useDispatch();
  const Dispatch = useDispatch<AppDispatch>();
  const socket = io(process.env.NEXT_PUBLIC_DOMAIN as any);
  socket.on('unreadNotificationsCount', (ob: any) => {
    auth.user._id === ob.userId ? dispatch({
      type: 'SET_NOTIFICATIONS_COUNT',
      payload: ob.unreadNotificationsCount
    }) : null;
  });

  const [Title1, setTitle1] = useState("");
  const [Title2, setTitle2] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const { employeeId } = useParams()
  const router = useRouter();
  const pathname = usePathname();


  useEffect(() => {
    const pathParts = pathname.split('/');
    pathParts.forEach((part, index) => {
      if (part.includes(' ')) {
        const words = part.split(' ');
        const capitalizedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));
        pathParts[index] = capitalizedWords.join(' ');
      } else {
        pathParts[index] = part.charAt(0).toUpperCase() + part.slice(1);
      }
    });

    setTitle1(pathParts[1])
    setTitle2(pathParts[2])
    if (pathname === '/employees') {
      setTitle2('All Employees Information')
    }
    if (pathParts[2] == 'Personalinformation') {
      setTitle2('Personal Information')
    }
    if (pathParts[2] == 'ProfessionelInformation') {
      setTitle2('Professionel Information')
    }
    if (employeeId) {
      setTitle2('Employee Profile')
    }
    if (pathname.includes('/projects')) {
      setTitle2('')
    }
  }, [pathname])

  return (
    <header className={` ${pathname === '/packages' ? 'hidden' : 'block'} fixed z-[9] top-0 right-2 w-[82%] h-[70px] px-16 flex items-center justify-between bg-white mb-10`}>
      <div className="h-[52px] flex gap-4 items-center">
        {/^\/[^\/]+(\/.+)+$/.test(pathname) && (<IoArrowBackCircleSharp onClick={() => router.back()} className="text-[45px] text-[#7152F3] hover:cursor-pointer" />)}
        <div>
          <p className="text-lg font-bold text-[#16151C]">{Title1}</p>
          <p className="text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left">{Title2}</p>
        </div>
      </div>
      <div className="flex items-center">
        <Link href={"/notifications"} className='grid place-items-center bg-blue-100 rounded-md h-10 w-10'>
          <button className="relative">
            <PiBell size={23} />
            {notif != 0 && <div className="absolute w-[12px] h-[12px] top-[1%] right-[1%] text-center text-[9px] rounded-full bg-red-500 text-white" >{notif}</div>}
          </button>
        </Link>
        <button onClick={() => setIsDropdownOpen((prev) => !prev)} className="flex items-center ml-4 p-2 bg-white rounded-lg border-solid border-2 border-gray-200">
          <div className="w-8 h-8 bg-white rounded-lg border-solid border border-gray-200">
            <img className="object-fill w-full h-full rounded-lg"
              src={auth.user.profilepicture ? auth.user.profilepicture : '/defaultprofilepicture.png'}
              alt="Profile Picture"
            />
          </div>
          <div className="ml-4">
            <p className="text-base font-semibold">{auth.user.firstname} {auth.user.lastname}</p>
            <p className="text-xs text-gray-400">{auth.user.role}</p>
          </div>
          <div className="ml-4 ">
            <PiCaretDownBold />
          </div>
          {isDropdownOpen && (
            <div className="absolute top-full right-[70px] bg-white shadow-md rounded-lg -mt-1">
              {/* Dropdown content goes here */}
              <ul className="pt-2 w-48">
                <li className='p-1'><Link href="/profile" className="rounded border-b block px-4 py-2 text-gray-800 hover:bg-blue-100">My Profile</Link></li>
                <li className='p-1'><Link href="/profile/security" className="rounded border-b block px-4 py-2 text-gray-800 hover:bg-blue-100">Security</Link></li>
                <li className='p-1'><button onClick={() => Dispatch(LogoutAction())} className="rounded block px-4 py-2 text-gray-800 hover:bg-blue-100 w-full">Sign out</button></li>
              </ul>
            </div>
          )}
        </button>
      </div>

    </header>
  );





















}

export default Header;