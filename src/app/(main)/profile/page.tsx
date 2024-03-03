'use client';
import dynamic from 'next/dynamic';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { useState } from 'react';
import { AiOutlineMail } from 'react-icons/ai';
import { IoFingerPrint, IoNewspaperOutline, IoPerson, IoPersonOutline } from 'react-icons/io5';
import { MdOutlineEmail, MdOutlineLibraryAddCheck, MdOutlineSecurity, MdWorkOutline } from 'react-icons/md';
import { PiEyedropperLight } from 'react-icons/pi';




import { Input2 } from '@/app/(components)/Inputs/TextInput';
import { LuMoveRight } from "react-icons/lu";
import { FaCheckDouble } from "react-icons/fa6";
import Image from 'next/image';
import styles from '../page.module.css'

import  Personnel from '@/app/(main)/profile/personalinformation/page';


const EmployeePage = () => {
    const [Page, setPage] = useState('Profile1');

    return (
        

                      
                           <Personnel />


    );
}


export default EmployeePage;


