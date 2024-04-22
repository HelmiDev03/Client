'use client'
import Image from 'next/image'
import styles from '@/app/(main)/page.module.css'
import { IoNewspaperOutline, IoPerson, IoPersonOutline } from "react-icons/io5";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FileInput, Label } from 'flowbite-react';
import axios from 'axios';
import { extractPublicId } from 'cloudinary-build-url'
import { IoMdClose } from "react-icons/io";
import { MdOutlineDownloading } from "react-icons/md";
import { updateProfilePicture } from '@/redux/actions/userActions/updateProfilePicture';
import { LiaUserShieldSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";
import { AppDispatch } from '@/redux/store';
import { FaUser, FaUserTie, FaUserShield } from "react-icons/fa6";




const activeLinkStyle = "text-blue-500 font-bold border-b-4 border-blue-500 rounded-sm pr-2";

const Layout = ({ children }: { children: React.ReactNode }) => {
    const errors = useSelector((state: any) => state.errors);
    const pathname = usePathname();
    const router = useRouter();
    const auth = useSelector((state: any) => state.auth);
    const [showUpload, setshowUpload] = useState(false)
    const [Url, setUrl] = useState('')
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const uploadImage = async (event: any) => {
        const files = event.target.files;
        setshowUpload(false);

        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }


    };

    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };


    function uploadSingleImage(base64: any) {
        setLoading(true);
        axios
            .put(process.env.NEXT_PUBLIC_DOMAIN + "/api/update/profilepicture", { image: base64 })
            .then((res) => {

                setUrl(res.data);
                dispatch({ type: 'ERRORS', payload: {} });
                setLoading(false);
              
            })
            .catch((err: any) => {
                console.log(err);
                setLoading(false);
                dispatch({ type: 'ERRORS', payload: { image: 'Image Size is too large' } })
            });
    }



    const updatePic = async (ImageUrl: string, choose: string) => {
        const publicId = extractPublicId(
            ImageUrl
        )
        dispatch(updateProfilePicture(ImageUrl, publicId, choose));

        setUrl('')
        setLoading(false);
    }




    return (
        <div className={styles.ProfileContainer}>
            <div className="w-full flex items-center justify-between p-2">
                <div className="flex gap-5">
                    <div onClick={(e: any) => setshowUpload(!showUpload)} className='relative w-44 h-44 hover:cursor-pointer rounded-lg overflow-hidden'>
                        <Image alt='image' className="object-fill w-full h-full" width={100} height={100} src={auth.user.profilepicture ? auth.user.profilepicture : '/defaultprofilepicture.png'} />
                    </div>
                    {showUpload &&
                        <div className="flex absolute top-[43%] left-0 pl-4 items-center justify-center">
                            <Label
                                htmlFor="dropzone-file"
                                className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 16"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"

                                            strokeWidth="2"
                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                        />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-500">
                                        <span className="font-semibold">Click to upload a new profile picture</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <FileInput onChange={uploadImage} id="dropzone-file" className="hidden" accept="image/*" />
                            </Label>
                        </div>
                    }
                    {Url && <div className="z-[100] absolute top-[10px] right-[40%] w-[300px]">
                        <div className="bg-slate-100 relative rounded-md flex flex-col items-center justify-center gap-2 pt-8">
                            <img src={Url} className='w-44 h-44 rounded-lg bg-slate-200' alt="Image from Cloudinary" />
                            <div className='flex w-full p-2 gap-4' >
                                <button onClick={() => updatePic(Url, 'Confirm')} className="bg-blue-500 w-full text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 justify-center items-center p-4">
                                    <p className="font-medium">Confirm</p>
                                </button>
                                <button onClick={() => updatePic(Url, 'Cancel')} className="bg-gray-400 w-full text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 justify-center items-center p-4">
                                    <p className="font-medium">Cancel</p>
                                </button>
                            </div>
                        </div>
                    </div>}
                    {errors.image && <div className=" z-[100] absolute top-[23%] right-[32%] right p-4 w-[400px]  max-w-lg  ">
                        <div className=" bg-lavender relative p-4  rounded-lg drop-shadow-md  md:p-8 flex flex-col items-center justify-center">
                            {errors.image && <div className="h-[100px] w-[80%] flex justify-center items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {errors.image}
                                    <IoMdClose onClick={(e: any) => dispatch({ type: 'ERRORS', payload: {} })} className='hover:cursor-pointer absolute top-[10px] right-[10px] text-[25px]' />
                                </div>
                            </div>}
                        </div>
                    </div>}
                    {loading && <div className="z-[100] absolute top-[10px] right-[40%] right p-4 w-[300px] max-w-lg">
                        <div className=" bg-lavender p-4 rounded-lg drop-shadow-md md:p-8 flex flex-col justify-center items-center">
                            <MdOutlineDownloading className="animate-spin text-[60px] text-[#7152F3]"/>
                        </div>
                    </div>}
                    <div className="flex flex-col gap-2">
                        <h1 className="font-bold text-2xl pb-8 pt-2">{auth.user.firstname} {auth.user.lastname}</h1>
                        <p className="flex items-baseline gap-2 font-medium"> <LiaUserShieldSolid size={24} />{auth.user.role} </p>
                        <p className="flex items-end gap-2 font-medium"><CiMail size={24} />{auth.user.email}</p>
                    </div>
                </div>

            </div>

            <div className="flex justify-between">
                <div className="flex flex-col w-[320px] mr-3 mt-10 rounded-[10px]  bg-opacity-[20%] bg-white-500">
                    <h3 onClick={()=>router.push('/profile')} className={` p-3  flex justify-start items-center font-lexendfont-light text-[16px] rounded-[10px]  w-[100%] leading-[24px] mb-2 hover:cursor-pointer  ${(pathname==='/profile' || pathname==='/profile/personalinformation' || pathname==='/profile/professionelInformation' || pathname==='/profile/security') ? ' text-[#eee] bg-[#7152F3]' : ' text-[#16151C]'}`}><IoPersonOutline className="text-[20px] mr-3" /> Profile</h3>
                    <h3 onClick={()=>router.push('/profile/employeeprojects')} className={` p-3  flex justify-start items-center font-lexendfont-light text-[16px] rounded-[10px]  w-[100%] leading-[24px] mb-2 hover:cursor-pointer ${pathname === '/profile/employeeprojects' ? ' text-[#eee] bg-[#7152F3]' : ' text-[#16151C]'}`}><IoNewspaperOutline className="text-[20px] mr-3" />Projects</h3>
                </div>
                <div className={`flex flex-col w-full ml-4 gap-8 pt-4`}>
                    {pathname !== '/profile/employeeprojects' && <ul className="flex gap-4">
                        <li className={`pr-2  hover:text-blue-500 ${pathname === '/profile/personalinformation' || pathname === '/profile' ? activeLinkStyle : ''}`}>
                        <Link href='/profile/personalinformation' className="flex gap-2"><FaUser size={20} />Personal Information</Link>
                        </li>
                        <li className={`pr-2  hover:text-blue-500 ${pathname === '/profile/professionelInformation' ? activeLinkStyle : ''}`}>
                        <Link href='/profile/professionelInformation' className="flex gap-2"><FaUserTie size={20} />Professional Information</Link>
                        </li>
                        <li className={`hover:text-blue-500 ${pathname === '/profile/security' ? activeLinkStyle : ''}`}>
                        <Link href='/profile/security' className="flex gap-2"><FaUserShield  size={20} />Security</Link>
                        </li>
                    </ul>}
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Layout