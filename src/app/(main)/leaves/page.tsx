'use client'
import React, { use, useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import styles from '@/app/(main)/page.module.css';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { FaSquarePen } from 'react-icons/fa6';
import { IoMdClose, IoMdSettings } from 'react-icons/io';
import axios from 'axios';
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { SelectInput, SelectInputt } from "@/app/(components)/Inputs/SelectInput";
import { IoCalendar } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa";
import { time } from 'console';
const Leaves = () => {
    const [maxcounter, setmaxcounter] = useState(0)
    const [date, setDate] = useState(null);
    const [workingDays, setWorkingDays] = useState(0);
    const [accrued, setAccrued] = useState(0);
    const [used, setUsed] = useState(0);
    const [available, setAvailable] = useState(0);
    const [timeoffapproved, setTimeOffApproved] = useState([]);
    const [userStartDate, setUserStartDate] = useState("")
    const [enddate, setEndDate] = useState("")
    const [dates, setDates] = useState([]);
    const [absence, setAbcense] = useState('');
    const [absenceType, setAbsenceType] = useState([]);
    const [description, setDescription] = useState('');
    const [policyName, setPolicyName] = useState('Default')
    const [PopupViewTimeoffFromCalendar, setPopupViewTimeoffFromCalendar] = useState(false)
    const [popupDate, setpopupDate] = useState('')
    const [popupDateHlidayType, setpopupDateHlidayType] = useState('')
    const [popupDays, setpopupDays] = useState(0)

    const auth = useSelector((state: any) => state.auth);
    function dateTemplate(date: any, arr: any[]) {
        const currentDate = new Date(date.year, date.month, date.day + 1).toISOString()// Convert provided date to ISO string format // Creating a Date object from the provided date

        for (let i = 0; i < arr.length; i++) {
            const startDate = arr[i][0] // Start date from the array
            const endDate = arr[i][1]   // End date from the array

            if (currentDate >= startDate && currentDate <= endDate) {

                return (
                    <div onClick={() => { setPopupViewTimeoffFromCalendar(true); setpopupDate(currentDate); setpopupDateHlidayType(arr[i][3]); setpopupDays(arr[i][2]) }} style={{ backgroundColor: '#7152F3', color: '#ffffff', display: 'flex', justifyContent: 'center', borderRadius: '50%', width: '2em', height: '2em', lineHeight: '2em', padding: 0 }}>
                        {date.day}

                    </div>
                );
            }
        }

        return date.day; // If the date is not within any range, return the day as is
    }

    const disabledDates = timeoffapproved.flatMap(([start, end]) => {
        const disabledRange = [];
        const startDate = new Date(start);
        const endDate = new Date(end);
         endDate.setDate(endDate.getDate() - 1);
    
        // Loop through the range of dates and add them to the disabledRange array
       
        let currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() - 1);

        while (currentDate < endDate) { // Adjust condition to exclude end date
            disabledRange.push(new Date(currentDate));
            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day
        }
    
        // Add end date to the disabled range
        disabledRange.push(new Date(endDate));
    
        return disabledRange;
    });

    const fetchDataAndUpdatePolicy = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/policy/calculate');
            const { daysSinceStartExcludingOffDays, accruedDays, used, available, timeoffapproved, userStartDate, endDate } = response.data;
            console.log(response.data);
            setWorkingDays(daysSinceStartExcludingOffDays);
            setAccrued(accruedDays);
            setUsed(used);
            setAvailable(available);
            setTimeOffApproved(timeoffapproved);
            console.log(timeoffapproved);

            setUserStartDate(userStartDate);
            setEndDate(endDate);

            // Check if the policy has ended and update it if needed

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchDataAndUpdatePolicy();
    }, []);
    const [PopupAddTimeOff, setPopupAddTimeOff] = useState(false);
    const [PopupViewTimeOff, setPopupViewTimeOff] = useState(false);
    const [timeOffs, setTimeOffs] = useState([{}]);
    const errors = useSelector((state: any) => state.errors);
    const [diffdays, setDiffDays] = useState(0);
    const dispatch = useDispatch();
    const [selectedtype, setSelectedType] = useState('')
    const [selecteddescription, setSelectedDescription] = useState('')
    const [selectedstartdate, setSelectedStartDate] = useState('')
    const [selectedenddate, setSelectedEndDate] = useState('')
    const [etat, setEtat] = useState('')
    const [supervisor, setSupervisor] = useState({ firstname: '', lastname: '', profilepicture: '' })
    const [response, setResponse] = useState('')
    


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


    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/policy/get/${auth.user.policy}`);
                setAbsenceType(res.data.policy.absences);
                setPolicyName(res.data.policy.name);
                setmaxcounter(res.data.policy.maxcounter)
            } catch (error) {
                // Handle error
                console.error("Error fetching policy:", error);
            }
        };

        const gettimeoffs = async () => {
            axios.get('http://localhost:5000/api/policy/gettimeoff')
                .then((response) => {
                    setTimeOffs(response.data.timeoffs);
                    console.log(timeOffs.map((timeoff: any) => timeoff.daterange[0]));
                })
                .catch((error) => {
                    console.log(error);
                });
        }

        // Only run the effect once by providing an empty dependency array
        fetchPolicy();
        gettimeoffs();
    }, []); // Empty dependency array to run the effect only once

    function getMonthName(monthIndex: any) {
        switch (monthIndex) {
            case 0: return 'January';
            case 1: return 'February';
            case 2: return 'March';
            case 3: return 'April';
            case 4: return 'May';
            case 5: return 'June';
            case 6: return 'July';
            case 7: return 'August';
            case 8: return 'September';
            case 9: return 'October';
            case 10: return 'November';
            case 11: return 'December';
            default: throw new Error('Invalid month index: ' + monthIndex);
        }
    }

    return (
        <div className={styles.container}>
            {/*popup to view timeoff in calendar */}



            {PopupViewTimeoffFromCalendar && <div className='      p-12 rounded-[10px] w-[300px] h-[70px] absolute right-[7%] top-[350px] z-50 bg-[#515164] flex flex-col justify-center items-center '>
                <IoMdClose onClick={() => { setPopupViewTimeoffFromCalendar(!setPopupViewTimeoffFromCalendar); }} className='absolute right-[5%] top-[5%]  text-[#ffffff]  text-[24px] hover:cursor-pointer' />
                <h1 className='mb-[8px] text-[#ffffff]'>{popupDate.slice(0, 10)}</h1>
                <div className='flex flex-row justify-between items-center'>
                    <div className='p-2 rounded-[5px] mr-8 bg-[#07a2ad]'><h1 className='text-[#ffffff]'>{popupDateHlidayType}</h1></div>
                    <h1 className='text-[#ffffff]'>{popupDays > 1 ? popupDays + ' Days' : popupDays + ' Day'}</h1>
                </div>
            </div>}


            {/*end popup to view timeoff */}

            {/*end popup to view time off */}
            {/*popup to add new leave */}
            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddTimeOff ? 'block' : 'hidden'}           p-4 z-10 bg-[#eee] shadow-lg  absolute w-[500px] translate-x-[300px]  translate-y-[100px] center rounded-[25px] `}>
                <IoMdClose onClick={() => { setPopupAddTimeOff(!PopupAddTimeOff); dispatch({ type: 'ERRORS', payload: {} }); }} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="w-[90vw] max-w-md">

                    <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Add time off </div>
                    <div className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>Request time off and select the type of absence</div>


                    <div className="space-y-4 mb-12">
                        <div className={styles.inputContainer}>
                            <SelectInputt placeholder='choose Type of absence' value={absence} onChange={(e: any) => setAbcense(e.target.value)} label='Type of absence'
                                options={absenceType}
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
                            <Input5 value={description} onChange={(e: any) => setDescription(e.target.value)} label='Description' />
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
                                    console.log(e.value);
                                    if (e.value && e.value.length === 2) {
                                        let startDate = e.value[0];


                                        //increse days by 1

                                        let endDate = e.value[1];

                                        const diffDays = Math.ceil(Math.abs(endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;
                                        setDiffDays(diffDays);

                                    } else {
                                        setDiffDays(0); // Or any default value you prefer if no range is selected
                                    }
                                }}
                                selectionMode="range"
                                readOnlyInput
                                minDate={new Date()} // Set minimum date to today
                                   disabledDates={disabledDates} // Disable dates inside the timeoffapproved array
                                
                            />

                            {errors.daterange && <div className="absolute top-[60px] h-[30px] w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
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
                            <ButtonSubmit fct={AddNewTimeOff} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add {diffdays ? diffdays === 1 ? diffdays + " day" : diffdays + " days" : ""} </h3>} />


                        </div>
                    </div>
                </div>
            </div>
            {/*end popup to add new leave */}
















            <div className=' absolute right-[2%] top-[12%]   w-[150px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit fct={() => setPopupAddTimeOff(true)} timing={200} text="Add Time Off" />
            </div>

            <div className='flex flex-row justify-between items-center '>
                <div className='text-[#16151C] font-lexend font-semibold  text-[20px] leading-[30px]  flex flex-col '>
                    <div className='w-[450px] rounded-[10px] mb-6  mr-6 flex flex-col border border-gray-300 p-2'>


                        <div className='p-2 rounded-[5px]  flex flex-col   border-b border-b-gray-300 justify-center items-center'>
                            <h1 className=' font-lexend font-light text-[18px] leading-[30px]'>Time Off Policy : {policyName}</h1>
                            <h1 className=' font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>From {userStartDate?.slice(0, 10)}  to  {enddate?.slice(0, 10)}</h1>
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
                            <h1 className={` ${maxcounter > 0 ? (available >= maxcounter ? "text-red-500" : "") : (available <= maxcounter ? "text-red-500" : "")} font-lexend font-semibold text-[30px] leading-[40px]`} >{available}</h1>

                                <h1 className={`     font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left `}>{maxcounter > 0 ? (available >= maxcounter ? "Negative Counter" : "Available") : (available <= maxcounter ? "Negative Counter" : "Available")} </h1>
                            </div>
                            <div className='flex flex-col ml-4 justify-center items-center mr-2 '>
                                <h1 className='font-lexend font-semibold text-[30px] leading-[40px]'>{used}</h1>
                                <h1 className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '>Used</h1>


                            </div>
                        </div>

                    </div>


                    <div className='flex flex-col  '>
                        <div className='flex justify-start mb-4'>
                            <IoCalendar className='text-[#7152F3]  text-[24px] mr-3' />
                            <h1 className='mt-1 font-lexend font-semibold text-[20px] leading-[20px]'>Current & Past time off</h1>
                        </div>




                        <div className='flex flex-col border-gray-600 p-8' >


                            {timeOffs.map((timeoff: any) => {
                                // Check if daterange is available before accessing it
                                if (timeoff.daterange && Array.isArray(timeoff.daterange) && timeoff.daterange.length > 0) {
                                    const differenceMs = new Date(timeoff.daterange[1]).getTime() - new Date(timeoff.daterange[0]).getTime();
                                    const differenceDays = Math.round(differenceMs / (1000 * 60 * 60 * 24)) + 1;


                                    const startDate = timeoff.daterange[0];
                                    const startdatevalue = startDate ? new Date(startDate) : null;
                                    const startDateString = startdatevalue ? startdatevalue.toISOString().split('T')[0] : '';
                                    const endDate = timeoff.daterange[1];
                                    const enddatevalue = endDate ? new Date(endDate) : null;
                                    const endDateString = enddatevalue ? enddatevalue.toISOString().split('T')[0] : '';


                                    let startDateMonth, startDateDay;
                                    if (startDate[5] === '0') {
                                        startDateMonth = getMonthName(parseInt(startDate[6]) - 1);
                                    } else {
                                        startDateMonth = getMonthName(parseInt(startDate.slice(5, 7)) - 1);
                                    }
                                    startDateDay = parseInt(startDate.slice(8, 10));


                                    let endDateMonth, endDateDay;
                                    if (endDate[5] === '0') {
                                        endDateMonth = getMonthName(parseInt(endDate[6]) - 1);
                                    } else {
                                        endDateMonth = getMonthName(parseInt(endDate.slice(5, 7)) - 1);
                                    }
                                    endDateDay = parseInt(endDate.slice(8, 10));

                                    const isSameDay = timeoff.daterange[0] === timeoff.daterange[1];


                                    return (
                                        <div key={timeoff._id} onClick={() => { setResponse(timeoff.response); setSupervisor({ firstname: timeoff.supervisor?.firstname, lastname: timeoff.supervisor?.lastname, profilepicture: timeoff.supervisor?.profilepicture }); setPopupViewTimeOff(true); setSelectedType(timeoff.type); setEtat(timeoff.etat); setSelectedDescription(timeoff.description); setSelectedStartDate(startDateString); setSelectedEndDate(endDateString) }} className='hover:cursor-pointer border-b border-gray-200 p-4 flex flex-row mb-6'>
                                            <div className='w-[50px] h-[50px] text-center justify-center items-center flex flex-col mr-6'>
                                                <h1 className="bg-[#7152F3] rounded-[2px] text-[10px] text-[#fff] w-[100%] ">{startDateMonth}</h1>
                                                <h1 className="bg-gray-200 rounded-[2px] w-[100%]">{startDateDay}</h1>
                                            </div>
                                            {isSameDay ? null : (
                                                <>
                                                    <FaArrowRight className='mr-6 mt-4 text-gray-400 text-[20px]' />
                                                    <div className='w-[50px] h-[50px] text-center justify-center items-center flex flex-col mr-12'>
                                                        <h1 className="bg-[#7152F3] rounded-[2px] text-[10px] text-[#fff] w-[100%] ">{endDateMonth}</h1>
                                                        <h1 className="bg-gray-200 rounded-[2px] w-[100%]">{endDateDay}</h1>
                                                    </div>
                                                </>
                                            )}
                                            <div className='flex flex-col '>
                                                <h1 className='font-lexend font-semibold mb-3 text-[16px] leading-[20px]'>{timeoff.type}</h1>
                                                <h1 className='font-lexend font-light text-[14px] leading-[20px]'>
                                                    {isSameDay ? `1 Day` : `${differenceDays} Days`}
                                                </h1>
                                            </div>
                                        </div>
                                    );
                                } else {
                                    // Handle the case where daterange is not available
                                    return null; // Or you can display a placeholder or handle it differently
                                }
                            })}


                        </div>


                        {/*popup to view timeoff */}
                        <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.2)" }} className={` ${PopupViewTimeOff ? 'block' : 'hidden'}           p-10 z-10 bg-[#eee] shadow-lg  absolute w-[500px] translate-x-[300px]  translate-y-[-150px] center rounded-[25px] `}>
                            <IoMdClose onClick={() => { setPopupViewTimeOff(!PopupViewTimeOff); dispatch({ type: 'ERRORS', payload: {} }); }} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                            <div className="w-[90vw] max-w-md">

                                <div className='mb-2 text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Time off </div>



                                <div className="space-y-4 mb-12">
                                    <div className={styles.inputContainer}>
                                        <Input5 isdisabled={true} value={selectedtype} label='Type of absence'

                                        />

                                    </div>
                                    <div className={styles.inputContainer}>
                                        <Input5 isdisabled={true} value={selecteddescription} label='Description' />


                                    </div>

                                    <div className="h-[55px] card flex justify-content-center">

                                        <Input5 isdisabled={true} value={selectedstartdate} label='StartDate' />

                                    </div>
                                    <div className="h-[55px] card flex justify-content-center">
                                        <Input5 isdisabled={true} value={selectedenddate} label='EndDate' />

                                    </div>



                                    {etat === 'Approved' && <div className="relative flex justify-center items-center w-[300px] flex-row justify-between  px-[3px] py-[8px] rounded-[4px] bg-green-500 bg-opacity-10">
                                        <p className="font- font-lexend  font-light leading-[18px] text-[14px] text-[#3FC28A]">Approved</p>
                                        <p className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '> by {supervisor.firstname} {supervisor.lastname}</p>
                                        <img className='w-[30px] h-[30px] rounded-[50%] ml-2' src={supervisor.profilepicture} alt='profilepicture' />
                                        <p className='font-lexend font-light text-[18px] leading-[30px] flex justify-center items-center w-[300px] flex-row justify-between  px-[3px] py-[8px] rounded-[4px]  absolute top-[82%]' >Response : {response}</p>
                                    </div>}

                                    {etat === 'Rejected' && <div className="relative flex justify-center items-center w-[300px] flex-row justify-between  px-[3px] py-[8px] rounded-[4px] bg-red-500 bg-opacity-10">
                                        <p className="font- font-lexend  font-light leading-[18px] text-[14px] text-red-500">Rejected</p>
                                        <p className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '> by {supervisor.firstname} {supervisor.lastname}</p>
                                        <img className='w-[30px] h-[30px] rounded-[50%] ml-2' src={supervisor.profilepicture} alt='profilepicture' />
                                        <p className='font-lexend font-light text-[18px] leading-[30px] flex justify-center items-center w-[300px] flex-row justify-between  px-[3px] py-[8px] rounded-[4px]   absolute top-[82%]' >Response : {response}</p>
                                    </div>}
                                    {etat === 'Pending' && <div className="flex justify-center items-center w-[66px]  px-[3px] py-[8px] rounded-[4px] bg-red-500 bg-opacity-10">
                                        <p className="font- font-lexend  font-light leading-[18px] text-[14px] text-[#ffab70]">Pending</p>
                                    </div>}





                                </div>

                            </div>
                        </div>
                        {/*end popup to view time off */}


                    </div>
                </div>








                <div className="card flex justify-content-center absolute right-[-2%] top-[147px] mr-[50px]">

                    <Calendar
                        value={date}
                        inline
                        showWeek
                        selectionMode="single"
                        readOnlyInput={true}

                        dateTemplate={(date) => dateTemplate(date, timeoffapproved)}
                    />
                </div>
            </div>
        </div>
    );
}

export default Leaves;


