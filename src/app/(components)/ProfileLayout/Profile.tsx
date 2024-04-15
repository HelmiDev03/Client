'use client'
import Image from 'next/image'
import styles from '@/app/(main)/page.module.css'
import { AiOutlineMail } from "react-icons/ai";
import { PiEyedropperLight } from "react-icons/pi";
import { IoNewspaperOutline, IoPerson, IoPersonOutline } from "react-icons/io5";
import { MdOutlineLibraryAddCheck, MdOutlineSecurity, MdWorkOutline } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FileInput, Label } from 'flowbite-react';
import axios from 'axios';
import ButtonSubmit from '../ButtonSubmit/Button';
import ButtonCancel from '../ButtonCancel/Button';
import { extractPublicId } from 'cloudinary-build-url'
import { IoMdClose } from "react-icons/io";
import { MdOutlineDownloading } from "react-icons/md";
import { updateProfilePicture } from '@/redux/actions/userActions/updateProfilePicture'
import { AppDispatch } from '@/redux/store';

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
            <div className="flex flex-row justify-between items-center mb-6 ">
                <div className="w-[324px]    flex flex-row justify-start">
                    <div onClick={(e: any) => setshowUpload(!showUpload)} className='relative hover:cursor-pointer rounded-[10px]'><Image alt='image' style={{ position: 'relative', borderRadius: '10px', width: '100px', height: '100px', marginRight: '10px' }} width={100} height={100} src={auth.user.profilepicture ? auth.user.profilepicture : '/defaultprofilepicture.png'} /></div>

                    {showUpload &&
                        <div className="flex absolute top-[32%] w-[200px] height-[50px] pl-4 items-center justify-center">
                            <Label
                                htmlFor="dropzone-file"
                                className="dark:hover:bg-bray-800 flex  cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                            >
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                    <svg
                                        className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
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
                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload a new profile picture</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                </div>
                                <FileInput onChange={uploadImage} id="dropzone-file" className="hidden" accept="image/*" />
                            </Label>
                        </div>}


                    {Url && <div className=" z-[100] absolute top-[23%] right-[32%] right p-4 w-[400px]  max-w-lg ">
                        <div className=" bg-[#DBDBDD] relative p-4  rounded-[30px] drop-shadow-md  md:p-8 flex flex-col items-center justify-center">

                            <img src={Url} className='w-[160px]  h-[160px] rounded-[10px]' alt="Image from Cloudinary" />





                            <div className=" justify-center items-center pt-0 space-y-4 sm:flex sm:space-y-0">


                                <div className='mb-8 w-[200px] mt-[90px] h-[61px] flex justify-center items-center rounded-[10px] p-[20px]  ' >
                                    <div className='  w-[82px] mr-4 h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                                        <ButtonSubmit timing={200} text="Confirm" fct={() => updatePic(Url, 'Confirm')} />
                                    </div>
                                    <div className='    w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#eee]   ' >
                                        <ButtonCancel text="Cancel" fct={() => updatePic(Url, 'Cancel')} />
                                    </div>
                                </div>

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
                    {loading && <div className=" z-[100] absolute top-[23%] right-[32%] right p-4 w-[400px]  max-w-lg ">
                        <div className=" bg-lavender relative p-4  rounded-lg drop-shadow-md  md:p-8 flex flex-col justify-center">


                            <div className='absolute  right-[149px] top-[49px]  ' >   <MdOutlineDownloading className="   animate-spin  text-[60px] text-[#7152F3]       " /></div>



                            <div className=" h-[150px]   justify-center items-center pt-0 space-y-4 sm:flex sm:space-y-0">




                            </div>
                        </div>
                    </div>}



                    <div className="flex flex-col">

                        <h3 className=" font-lexend font-semibold text-[24px] leading-[36px] mb-2">{auth.user.firstname} {auth.user.lastname}</h3>
                        <p className=" font-lexend font-light flex text-[16px] leading-[24px] mb-2"><PiEyedropperLight className='text-[24px] mr-2' />{auth.user.role}</p>
                        <p className=" font-lexend font-light text-[16px] flex leading-[24px] mb-2"> <AiOutlineMail className='text-[24px] mr-2' />{auth.user.email}</p>
                    </div>
                </div>

            </div>























            <div className="flex flex-row justify-between height-auto ">
                <div className="flex flex-col justify-center items-start w-[242px] h-[167px] mr-3 mt-5 rounded-[10px]  bg-opacity-[20%] bg-white-500">
                    <h3 onClick={()=>router.push('/profile')} className={` p-3  flex justify-start items-center font-lexendfont-light flex text-[16px] rounded-[10px]  w-[100%] leading-[24px] mb-2 hover:cursor-pointer  ${pathname==='/profile' ? ' text-[#eee] bg-[#7152F3]' : ' text-[#16151C]'}                    `}><IoPersonOutline className="text-[20px] mr-3" /> Profile</h3>
                    <h3 className={` p-3  flex justify-start items-center font-lexendfont-light flex text-[16px] rounded-[10px]  w-[100%] leading-[24px] mb-2 hover:cursor-pointer ${pathname === '/profile/attendance' ? ' text-[#eee] bg-[#7152F3]' : ' text-[#16151C]'}        `}> <MdOutlineLibraryAddCheck className="text-[20px] mr-3" />Attednance</h3>
                    <h3 onClick={()=>router.push('/profile/employeeprojects')} className={` p-3  flex justify-start items-center font-lexendfont-light flex text-[16px] rounded-[10px]  w-[100%] leading-[24px] mb-2 hover:cursor-pointer ${pathname === '/profile/employeeprojects' ? ' text-[#eee] bg-[#7152F3]' : ' text-[#16151C]'}    `}><IoNewspaperOutline className="text-[20px] mr-3 text-[20px]" />Projects</h3>
                </div>
                <div className={`flex flex-col w-[768px]  height-auto rounded-[10px] bg-white  ml-4 `}>

                    {pathname !== '/profile/employeeprojects' && <div className="flex flex-row sm:flex-row sm:justify-start mb-[45px]  ">
                        <h3>
                            <Link prefetch={false} href='/profile/personalinformation' className={`flex mr-4 align-left flex items-center text-[16px] leading-[24px]font-lexendfont-semibold  px-3 py-2 transition-colors duration-300 transform   hover:bg-gray-50 l-2 hover:cursor-pointer border-b-[3px]    ${pathname === '/profile' || pathname === '/profile/personalinformation' ? 'border-indigo-600 text-indigo-600' : 'border-[#ffffff] text-[#16151C] '}       `} >
                                <IoPerson className="text-[24px] mr-3" /> Personal Information</Link>
                        </h3>
                        <h3>
                            <Link prefetch={false} href='/profile/professionelInformation' className={`flex mr-4 align-left flex items-center text-[16px] leading-[24px]font-lexendfont-semibold  px-3 py-2 transition-colors duration-300 transform   hover:bg-gray-50 l-2 hover:cursor-pointer border-b-[3px]    ${pathname === '/profile/professionelInformation' ? 'border-indigo-600 text-indigo-600' : 'border-[#ffffff] text-[#16151C] '}       `} >
                                <MdWorkOutline className="text-[24px] mr-3" /> Professional Information</Link >
                        </h3>
                        <h3>
                            <Link prefetch={false} href='/profile/security' className={`flex mr-4 align-left flex items-center text-[16px] leading-[24px]font-lexendfont-semibold  px-3 py-2 transition-colors duration-300 transform   hover:bg-gray-50 l-2 hover:cursor-pointer border-b-[3px]    ${pathname === '/profile/security' ? 'border-indigo-600 text-indigo-600' : 'border-[#ffffff] text-[#16151C] '}       `} >
                                <MdOutlineSecurity className="text-[24px] mr-3" />Security</Link >
                        </h3>
                    </div>}


                    {children}






                </div>
            </div>
        </div>
    )
}

export default Layout


