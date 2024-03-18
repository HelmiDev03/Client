'use client'
import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import styles from '@/app/(main)/page.module.css';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { FaSquarePen } from 'react-icons/fa6';
import { IoMdClose, IoMdSettings } from 'react-icons/io';
import axios from 'axios';
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { SelectInput, SelectInputt } from "@/app/(components)/Inputs/SelectInput";

const Leaves = () => {
    const [date, setDate] = useState(null);
    const [workingDays, setWorkingDays] = useState(0);
    const [accrued, setAccrued] = useState(0);
    const [available, setAvailable] = useState(0);
    const [dates, setDates] = useState(null);
    const [absence, setAbcense] = useState('');
    const [description, setDescription] = useState('');
    function dateTemplate(date: any) {
        if (date.day > 10 && date.day < 14) {
            return (
                <div style={{ backgroundColor: '#7152F3', color: '#ffffff', display: 'flex', justifyContent: 'center', borderRadius: '50%', width: '2em', height: '2em', lineHeight: '2em', padding: 0 }}>{date.day}</div>
            );
        }
        else {
            return date.day;
        }
    }
    const fetchDataAndUpdatePolicy = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/policy/calculate');
            const { daysSinceStartExcludingSundays, accruedDays } = response.data;
            setWorkingDays(daysSinceStartExcludingSundays);
            setAccrued(accruedDays);

            // Check if the policy has ended and update it if needed

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDataAndUpdatePolicy();
    }, []);
    const [PopupAddTimeOff, setPopupAddTimeOff] = useState(false);
    const errors = useSelector((state: any) => state.errors);
    const [diffdays, setDiffDays] = useState(0);
    const dispatch = useDispatch();

  const AddNewTimeOff = () => {
    axios.post('http://localhost:5000/api/policy/createtimeoff', {
        type: absence,
        description,
        daterange: dates
    })
    .then((response) => {
        dispatch({ type: 'ERRORS', payload: {} });
        window.location.reload();
    })
    .catch((error) => {
        dispatch({ type: 'ERRORS', payload: error.response.data });
    });
  }




    return (
        <div className={styles.container}>
            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddTimeOff ? 'block' : 'hidden'}           p-4 z-10 bg-[#eee] shadow-lg  absolute w-[500px] translate-x-[300px]  translate-y-[100px] center rounded-[25px] `}>
                <IoMdClose onClick={() => {setPopupAddTimeOff(!PopupAddTimeOff);dispatch({ type: 'ERRORS', payload: {} });}} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="w-[90vw] max-w-md">

                    <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Add time off </div>
                    <div className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>Request time off and select the type of absence</div>


                    <div className="space-y-4 mb-12">
                        <div className={styles.inputContainer}>
                            <SelectInputt placeholder='choose Type of absence' value={absence} onChange={(e:any)=>setAbcense(e.target.value)} label='Type of absence'
                                options={['Manager HR', 'service informatique', 'stagiaire', 'admin']}
                            />
                            {errors.type && <div className=" h-[30px] w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {errors.type}
                                </div>
                            </div>}
                        </div>
                        <div className={styles.inputContainer}>
                            <Input5 value={description} onChange={(e:any)=>setDescription(e.target.value)} label='Description' />
                            {errors.description && <div className=" h-[30px] w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {errors.description}
                                </div>
                            </div>}
                                                        
                        </div>

                        <div className=" relative  h-[55px] card flex justify-content-center">
                            <label className="z-50  absolute font-lexend  top-0 left-0 px-2 pt-1 font-light text-[11px] leading-[16px] text-indigo-600 ">Date range</label>
                            <Calendar
                                className='w-[300px]'
                                value={dates}
                                onChange={(e: any) => {
                                    setDates(e.value);
                                    if (e.value && e.value.length === 2) {
                                        const startDate = e.value[0];
                                        const endDate = e.value[1];
                                        const diffDays = Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24))  +1;
                                        setDiffDays(diffDays);
                                    } else {
                                        setDiffDays(0); // Or any default value you prefer if no range is selected
                                    }
                                }}
                                selectionMode="range"
                                readOnlyInput
                            />
                            {errors.daterange && <div className=" h-[30px] w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {errors.daterange}
                                </div>
                            </div>}
                        </div>




                    </div>
                    <div>
                        <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={AddNewTimeOff} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add {diffdays ? diffdays===1? diffdays +" day"  :  diffdays+" days" : ""} </h3>} />


                        </div>
                    </div>
                </div>
            </div>

            <div className=' absolute right-[2%] top-[12%]   w-[150px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit fct={() => setPopupAddTimeOff(true)} timing={200} text="Add Time Off" />
            </div>
            <div className='flex flex-row justify-between items-center h-[200px] mt-10 mb-[54px]'>
                <div className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px]  flex flex-col '>
                    <div className='w-[450px] rounded-[10px] mb-6  mr-6 flex flex-col border border-gray-300 p-2'>


                        <div className='p-2 rounded-[5px]  flex flex-col   border-b border-b-gray-300 justify-center items-center'>
                            <h1 className=' font-lexend font-light text-[18px] leading-[30px]'>Default</h1>
                            <h1 className=' font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>Time Off Policy</h1>
                        </div>




                        <div className='flex flex-row justify-between p-3 mt-2'>
                            <div className='flex flex-col justify-center items-center ml-4 mr-2'>
                                <h1 className='font-lexend font-semibold text-[30px] leading-[40px]'>{workingDays}</h1>
                                <h1 className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>WorkingDays</h1>
                            </div>

                            <div className='flex flex-col justify-center items-center ml-4 mr-2'>
                                <h1 className='font-lexend font-semibold text-[30px] leading-[40px]'>{accrued}</h1>
                                <h1 className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>Accrued</h1>
                            </div>
                            <div className='flex flex-col ml-4 justify-center items-center  mr-2'>
                                <h1 className='font-lexend font-semibold text-[30px] leading-[40px]'>10</h1>
                                <h1 className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>Available</h1>
                            </div>
                            <div className='flex flex-col ml-4 justify-center items-center mr-2 '>
                                <h1 className='font-lexend font-semibold text-[30px] leading-[40px]'>10</h1>
                                <h1 className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>Used</h1>


                            </div>
                        </div>

                    </div>
                </div>




                <div className="card flex justify-content-center mt-[250px] mr-[50px]">

                    <Calendar
                        value={date}
                        inline
                        showWeek
                        selectionMode="single"
                        readOnlyInput={true}

                        dateTemplate={dateTemplate}
                    />
                </div>
            </div>
        </div>
    );
}

export default Leaves;


