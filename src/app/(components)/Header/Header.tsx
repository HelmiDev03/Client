'use client';
import { IoIosNotificationsOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import {useEffect, useState } from "react";
import DropDown from "./DropDown";
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { useParams, usePathname,useRouter } from "next/navigation";
import { IoArrowBackCircleSharp } from "react-icons/io5"














const Header= () => {

  const [notifCounter, setNotifCounter] = useState(0);

  
  const [Title1, setTitle1] = useState("");
  const [Title2, setTitle2] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const auth = useSelector((state: any) => state.auth);
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
  if ( pathname ==='/employees'  ) {
    setTitle2('All Employees Information')
  }
  if(pathParts[2]=='Personalinformation'){
    setTitle2('Personal Information')
  }
  if(pathParts[2]=='ProfessionelInformation'){
    setTitle2('Professionel Information')
  }
  if (employeeId){
    setTitle2('Employee Profile')
  }
  }, [pathname])


    return     (


        <header  className={` ${pathname==='/packages' ? 'hidden' : 'block'}         fixed z-[999] top-[-6px] w-[82%]   h-[82px]  flex items-center justify-between px-8 bg-[#ffffff] mb-10 ml-2 `}>

<IoArrowBackCircleSharp onClick={()=>router.back()} className="  absolute top-[17px] right-[98%] text-[30px] text-[#7152F3] hover:cursor-pointer" />
            <div className= " h-[52px]flex  flex-row items-center">

            <p className="text-lg font-bold font-lexend    text-[#16151C]   ">{Title1}</p>
            <p className="font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">{Title2}</p>
            
     
            </div>
               
         

        
          <div className="flex items-center justify-between ">
              
     

           <div className=" mr-[18px] w-[40px] h-[40px] flex justify-center items-centernded-[10px]  bg-gray-100 rou">
            <IoIosNotificationsOutline onClick={()=>router.push('/notifications')}  className="hover:cursor-pointer relative w-[24px] h-[24px] bg-[#eee] hover:cursor-pointer" />
            <div className=" absolute bottom-[26px] w-[20px] h-[20px] bg-red-500 rounded-full flex justify-center items-center"><span className="text-[#fff]">{notifCounter}</span></div>

                 </div>

            <div  onClick={() => setIsDropdownOpen((prev) => !prev)}
      className="  h-50 w-184 top-36 left-1226  p-2 border border-solid border-gray-300 rounded-lg  flex items-center  hover:cursor-pointer hover:duration-300"
      style={{ borderColor: '#A2A1A833' }}
    >
        
   <Image  style={{ borderRadius: '8px', marginRight: '4px'  , width : '40px' , height:'40px' }} src={auth.user.profilepicture ? auth.user.profilepicture: '/defaultprofilepicture.png'} width={40} height={40}
        alt="Profile" />
      <div className="mr-2">
        <p className="font-lexend text-body-1 font-bold text- [#16151C] text-base leading-6 tracking-normal text-left ">{auth.user.firstname } {auth.user.lastname} </p>
        <p className="font-lexend text-caption font-normal text-[#A2A1A8] text-sm leading-5 tracking-normal ">{auth.user.role}</p>
      </div>

      <div className="ml-[3px]">
      <IoIosArrowDown />
      </div>
      {isDropdownOpen &&    <DropDown />                }
             </div>

          

           </div>
        
           
      



        </header>




    );






















} 

export default Header;