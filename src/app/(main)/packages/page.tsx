'use client'
import axios from 'axios';
import Image from 'next/image';
import { Card } from 'flowbite-react';
import { useState,  } from 'react';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';


import { ImSpinner8 } from 'react-icons/im';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { UpdatePackage } from '@/redux/actions/companyActions/updatePackage';
const Packages = () => {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const Finish = (PackageName : string) => {
        dispatch(UpdatePackage(PackageName));
        
    };

    return(
        
      
            <div className={`w-[90%] h-[90%] m-[60px] mt-[23px] mb-[10px]`}>


                <div className="flex items-center justify-start mb-3">

                    <div className=" h-[40px] mr-[500px]   flex items-center justify-center  header-nav    ">

                        <Image
                            width={40}
                            height={40}
                            className="w-11 h-10 mr-[5px]"
                            src="/logo.png"
                            alt="" />

                        <p className=" leading-[40px] text-[30px] font-semibold">NRH </p>
                    </div>

                    <p className="  text-lg font-bold font-lexend text-[26px] leading-[40px] translate-x-[-43px]  text-[#16151C]   ">Choose Your Pack</p>


                </div>


                <div className=" h-[573px] rounded-[30px] bg-[#7152F3] bg-opacity-[5%] flex items-center justify-center mb-3">
                    <Card className='translate-x-[-70px] mt-[70px] max-w-sm mr-3 w-[350px] h-[480px] p-[30px] rounded-[18px] bg-[#7152F3]'>
                        <h5 className="mb-4 text-xl font-medium  text-white ">Free</h5>
                        <div className="flex items-baseline text-white">
                            <span className="text-3xl font-semibold">$</span>
                            <span className="text-5xl font-extrabold tracking-tight">0</span>
                            <span className="ml-1 text-xl font-normal  text-white ">/month</span>
                        </div>
                        <ul className="my-7 space-y-5">
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">voices messages anywhere</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">
                                    evoices messages anywhere
                                </span>
                            </li>
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">voices messages anywhere</span>
                            </li>



                        </ul>
                        <button
                            type="button"
                            className=" mt-[60px]   inline-flex w-full h-[55px] justify-center rounded-[10px] bg-white px-5 py-2.5     leading [30px] text-center text-[26px] font-poppins text-[#16151C] text-opacity-[50%] font-bold   hover:cursor-pointer focus:outline-none focus:ring-4  "
                        >
                            Already Using
                        </button>
                    </Card>
                    <Card className='mt-[50px]  relative max-w-sm mr-3 w-[350px] h-[480px] p-[30px] rounded-[18px] bg-[#7152F3]'>
                        <div className="absolute top-[-76px] left-0 w-[100%] h-[99px] bg-[#7152F3] opacity-[90%] rounded-t-[35px]  flex items-center justify-center">
                            <span className=" mt-[-11px] text-white font-bold text-[26px] leading-[40px]" >Most Popular</span>
                        </div>
                        <h5 className="mb-4 text-xl font-medium  text-white ">Premium</h5>
                        <div className="flex items-baseline text-white">
                            <span className="text-3xl font-semibold">$</span>
                            <span className="text-5xl font-extrabold tracking-tight">9</span>
                            <span className="ml-1 text-xl font-normal  text-white ">/month</span>
                        </div>
                        <ul className="my-7 space-y-5">
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">voices messages anywhere</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">
                                    evoices messages anywhere
                                </span>
                            </li>
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">voices messages anywhere</span>
                            </li>



                        </ul>
                        <button
                            type="button"
                            className=" mt-[60px]   inline-flex w-full h-[55px] justify-center rounded-[10px] bg-white px-5 py-2.5     leading [30px] text-center text-[26px] font-poppins text-[#7152F3] font-bold   hover:cursor-pointer focus:outline-none focus:ring-4  "
                        >
                            Buy Now
                        </button>
                    </Card>
                    <Card className='translate-x-[70px] mt-[70px] max-w-sm mr-3 w-[350px] h-[480px] p-[30px] rounded-[18px] bg-[#7152F3]'>
                        <h5 className="mb-4 text-xl font-medium  text-white "> Business</h5>

                        <div className="flex items-baseline text-white">
                            <span className="text-3xl font-semibold">$</span>
                            <span className="text-5xl font-extrabold tracking-tight">29.99</span>
                            <span className="ml-1 text-xl font-normal  text-white ">/month</span>
                        </div>
                        <ul className="my-7 space-y-5">
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">voices messages anywhere</span>
                            </li>
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">
                                    evoices messages anywhere
                                </span>
                            </li>
                            <li className="flex space-x-3">
                                <svg
                                    className="h-5 w-5 shrink-0 text-white "
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span className="text-base font-normal leading-tight  text-white dark:text-gray-400">voices messages anywhere</span>
                            </li>



                        </ul>
                        <button
                            type="button"
                            className=" mt-[60px]   inline-flex w-full h-[55px] justify-center rounded-[10px] bg-white px-5 py-2.5     leading [30px] text-center text-[26px] font-poppins text-[#7152F3]  font-bold   hover:cursor-pointer focus:outline-none focus:ring-4  "
                        >
                            Buy Now
                        </button>
                    </Card>




                </div>


                <div className="flex items-center justify-center mb-3">


                    <div className=' w-[130px] h-[56px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                    <ButtonSubmit timing={1000} text={loading ? <><ImSpinner8  className="animate-spin mr-2 text-[20px]" /> Loading...</> : 'Finish'} fct={()=>Finish('Free')} />
                    </div>




                </div>











            </div>
    
   
    );
}

export default Packages;
