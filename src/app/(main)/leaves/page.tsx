'use client'
import React, { useEffect, useState } from 'react';
import { Calendar } from 'primereact/calendar';
import styles from '@/app/(main)/page.module.css';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios';
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { SelectInputt } from "@/app/(components)/Inputs/SelectInput";
import { FaArrowRight } from "react-icons/fa";
import { CiLogout } from 'react-icons/ci';
import toast, { Toaster } from "react-hot-toast";
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
    const [file, setFile] = useState('')
    const [base64, setBase64] = useState('')
    const [fileName, setFileName] = useState('')
    const [absence, setAbcense] = useState('');
    const [absenceType, setAbsenceType] = useState([]);
    const [description, setDescription] = useState('');
    const [policyName, setPolicyName] = useState('Default')
    const [PopupViewTimeoffFromCalendar, setPopupViewTimeoffFromCalendar] = useState(false)
    const [popupDate, setpopupDate] = useState('')
    const [popupDateHlidayType, setpopupDateHlidayType] = useState('')
    const [popupDays, setpopupDays] = useState(0)



    const convertBase64 = (file: File) => {
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
            const response = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/policy/calculate');
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
    const [selectedmedia, setSelectedMedia] = useState('')
    const [etat, setEtat] = useState('')
    const [supervisor, setSupervisor] = useState({ firstname: '', lastname: '', profilepicture: '' })
    const [response, setResponse] = useState('')
    const [isbuttondisabled , setIsbuttondisabled] = useState(false)


    const AddNewTimeOff = () => {
        setIsbuttondisabled(true)
        dispatch({ type: 'ERRORS', payload: {  } });
        if (!absence || !description ||  ! dates.length ) {
            toast.error('All fields are required')
            setIsbuttondisabled(false)
            return ;
        }

        console.log(file)
        console.log(fileName)
        if (!fileName.endsWith('.pdf') && fileName !="" ) {
             toast.error('File must be a pdf')
            setIsbuttondisabled(false)
            return; // Exit the function if fileName doesn't end with .pdf

        }
        axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/policy/createtimeoff', {
            type: absence,
            description,
            daterange: dates,
            file: fileName ? base64 : ""
        })
            .then((response) => {
                
                dispatch({ type: 'ERRORS', payload: {} });
                toast.success('Time off added successfully');
                window.location.reload();
            })
            .catch((error) => {
                
                
                toast.error(error.response.data.daterange)
                
              
            })
            .finally(() => {
                setIsbuttondisabled(false); // Reset isbuttondisabled to false after the function completes (whether it succeeds or fails)
            });
    }


    useEffect(() => {
        const fetchPolicy = async () => {
            try {
                const res = await axios.get(process.env.NEXT_PUBLIC_DOMAIN + `/api/policy/get/${auth.user.policy}`);
                setAbsenceType(res.data.policy.absences);
                setPolicyName(res.data.policy.name);
                setmaxcounter(res.data.policy.maxcounter)
            } catch (error) {
                // Handle error
                console.error("Error fetching policy:", error);
            }
        };

        const gettimeoffs = async () => {
            axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/policy/gettimeoff')
                .then((response) => {
                    console.log(response.data.timeoffs);
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
    const [currentPage, setCurrentPage] = useState(1);
    const MAX_ENTRIES = 3; // Maximum entries to display at once

    const paginatedTimeOffs = timeOffs.slice((currentPage - 1) * MAX_ENTRIES, currentPage * MAX_ENTRIES);

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    return (
        <div className={styles.container} style={{ overflowY: 'hidden' }}>
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
            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddTimeOff ? 'block' : 'hidden'}           p-4 z-10 bg-[#FCFBFB] shadow-lg  absolute w-[500px]       translate-x-[300px]  translate-y-[50px] center rounded-[25px] `}>
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
                        <div style={{ position: 'relative' }} className="border border-gray-300 relative mb-6 w-[300px] h-[80px] flex justify-center items-center rounded-[10px] border-[1px] bg-white">
                            <label className="z-50  absolute font-lexend  top-0 left-0 px-2 pt-1 font-light text-[11px] leading-[16px] text-indigo-600 ">Choose File (Otpional)</label>
                            <label htmlFor="fileInput" className="absolute inset-0 flex justify-center items-center cursor-pointer">
                                <CiLogout className="text-[24px] text-[#7152F3]" />
                                <input type="file" id="fileInput" className="hidden" accept='.pdf'
                                    onChange={async (e: any) => {
                                        const file = e.target.files[0];
                                        console.log(file)

                                        setFile(file);
                                        setFileName(file.name);
                                        const base64 = await convertBase64(file);
                                        setBase64(base64 as any);


                                    }}
                                />
                            </label>
                            <div className="absolute bottom-0 w-full text-center">{fileName}</div>



                            {errors.file && (
                                <div className="h-[30px] w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50" role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>{errors.file}</div>
                                </div>
                            )}
                        </div>

                        <div className=" relative  h-[55px] card flex justify-content-center">
                            <label className="z-50  absolute font-lexend  top-0 left-0 px-2 pt-1 font-light text-[11px] leading-[16px] text-indigo-600 ">Date range</label>
                            <Calendar
                                className='w-[300px] h-[56px] mt-[-50px]'
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
                            <ButtonSubmit isbuttondisabled={isbuttondisabled} fct={AddNewTimeOff} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add {diffdays ? diffdays === 1 ? diffdays + " day" : diffdays + " days" : ""} </h3>} />


                        </div>
                    </div>
                </div>
            </div>
            {/*end popup to add new leave */}



















            <div className=' absolute right-[2%] top-[12%]   w-[150px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit fct={() => setPopupAddTimeOff(true)} timing={200} text="Add Time Off" />
            </div>



            <div className='flex flex-row justify-between items-center '>
                <div className='text-[#16151C]  h-[660px]  font-lexend font-semibold  text-[20px] leading-[30px]  flex flex-col '>
                    <div className='w-[450px] h-[170px] rounded-[10px] mb-6  mr-6 flex flex-col border border-gray-300 p-2'>


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


                    <div className='flex flex-col h-[450px] '>
                        <div className='flex justify-start mb-4'>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" viewBox="0 0 32 32"
                                style={{ fill: "#7152f3", marginRight: "15px", marginTop: "-5px" }} >
                                <path d="M 9 4 L 9 5 L 5 5 L 5 6 L 5 10 L 5 12.34375 C 5 15.884947 4.5874347 18.859831 2.2929688 21.154297 L 2 21.447266 L 2 23 L 5 23 L 5 27 L 27 27 L 27 12.34375 L 27 6 L 27 5 L 23 5 L 23 4 L 21 4 L 21 5 L 11 5 L 11 4 L 9 4 z M 7 7 L 9 7 L 9 8 L 11 8 L 11 7 L 21 7 L 21 8 L 23 8 L 23 7 L 25 7 L 25 9 L 7 9 L 7 7 z M 7 11 L 25 11 L 25 12.34375 C 25 15.745962 24.564015 18.744764 22.509766 21 L 4.8867188 21 C 6.5973984 18.434293 7 15.406839 7 12.34375 L 7 11 z M 9 13 L 9 15 L 11 15 L 11 13 L 9 13 z M 13 13 L 13 15 L 15 15 L 15 13 L 13 13 z M 17 13 L 17 15 L 19 15 L 19 13 L 17 13 z M 21 13 L 21 15 L 23 15 L 23 13 L 21 13 z M 8.6894531 17 L 8 19 L 10 19 L 10.689453 17 L 8.6894531 17 z M 12.689453 17 L 12 19 L 14 19 L 14.689453 17 L 12.689453 17 z M 16.689453 17 L 16 19 L 18 19 L 18.689453 17 L 16.689453 17 z M 25 20.972656 L 25 25 L 7 25 L 7 23 L 23.414062 23 L 23.707031 22.707031 C 24.24315 22.170912 24.621007 21.571262 25 20.972656 z"></path>
                            </svg>
                            <h1 className='mt-1 font-lexend font-semibold text-[20px] leading-[20px]'>Current & Past time off</h1>
                        </div>




                        <div className='flex flex-col border-gray-600 p-8 mt-[-40px] h-[380px]' >


                            {paginatedTimeOffs.map((timeoff: any) => {
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
                                        <div key={timeoff._id} onClick={() => { setResponse(timeoff.response); setSupervisor({ firstname: timeoff.supervisor?.firstname, lastname: timeoff.supervisor?.lastname, profilepicture: timeoff.supervisor?.profilepicture }); setPopupViewTimeOff(true); setSelectedType(timeoff.type); setEtat(timeoff.etat); setSelectedDescription(timeoff.description); setSelectedStartDate(startDateString); setSelectedEndDate(endDateString); setSelectedMedia(timeoff.file ? timeoff.file : '') }} className='hover:cursor-pointer border h-[80px] border-gray-200 rounded-[10px] p-4 flex flex-row mb-6'>
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




                            {timeOffs.length > MAX_ENTRIES && (
                                <div className="flex justify-center fixed  mt-[300px] translate-x-[50px]">
                                    <button onClick={handlePrevPage} hidden={currentPage === 1} className="bg-gray-200 text-gray-600 px-4 py-2 mr-[150px] rounded-md">Previous</button>
                                    <button onClick={handleNextPage} hidden={currentPage * MAX_ENTRIES >= timeOffs.length} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md">Next</button>
                                </div>

                            )}

                        </div>


                        {/*popup to view timeoff */}
                        <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.2)" }} className={` ${PopupViewTimeOff ? 'block' : 'hidden'}           p-10 z-10 bg-[#FCFBFB] shadow-lg  absolute w-[500px] translate-x-[300px] translate-y-[-250px]  z-[1000]  center rounded-[25px] `}>
                            <IoMdClose
                                onClick={() => {
                                    setPopupViewTimeOff(!PopupViewTimeOff);
                                    dispatch({ type: 'ERRORS', payload: {} });
                                }}
                                className="hover:cursor-pointer absolute right-[5%] text-[24px] "
                            />

                            <div className="w-[90vw] max-w-md">

                                <div className='mb-2 flex flex-row text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>
                                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0,0,256,256" style={{ fill: "#7152f3", }}>
                                        <g fill="#7152f3" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" >
                                            <g transform="scale(2.56,2.56)">
                                                <path d="M28,16c-3.85433,0 -7,3.14567 -7,7v54c0,3.85433 3.14567,7 7,7h39c3.85433,0 7,-3.14567 7,-7v-6c0.0051,-0.36064 -0.18438,-0.69608 -0.49587,-0.87789c-0.3115,-0.18181 -0.69676,-0.18181 -1.00825,0c-0.3115,0.18181 -0.50097,0.51725 -0.49587,0.87789v6c0,2.77367 -2.22633,5 -5,5h-39c-2.77367,0 -5,-2.22633 -5,-5v-54c0,-2.77367 2.22633,-5 5,-5h39c2.77367,0 5,2.22633 5,5v6c-0.0051,0.36064 0.18438,0.69608 0.49587,0.87789c0.3115,0.18181 0.69676,0.18181 1.00825,0c0.3115,-0.18181 0.50097,-0.51725 0.49587,-0.87789v-6c0,-3.85433 -3.14567,-7 -7,-7zM31.5,22c-2.47926,0 -4.5,2.02074 -4.5,4.5v47c0,2.47926 2.02074,4.5 4.5,4.5h32c2.47926,0 4.5,-2.02074 4.5,-4.5v-3c0.00255,-0.18032 -0.09219,-0.34804 -0.24794,-0.43894c-0.15575,-0.0909 -0.34838,-0.0909 -0.50413,0c-0.15575,0.0909 -0.25049,0.25863 -0.24794,0.43894v3c0,1.93874 -1.56126,3.5 -3.5,3.5h-32c-1.93874,0 -3.5,-1.56126 -3.5,-3.5v-47c0,-1.93874 1.56126,-3.5 3.5,-3.5h17c0.18032,0.00255 0.34804,-0.09219 0.43894,-0.24794c0.0909,-0.15575 0.0909,-0.34838 0,-0.50413c-0.0909,-0.15575 -0.25863,-0.25049 -0.43894,-0.24794zM50.5,22c-0.18032,-0.00255 -0.34804,0.09219 -0.43894,0.24794c-0.0909,0.15575 -0.0909,0.34838 0,0.50413c0.0909,0.15575 0.25863,0.25049 0.43894,0.24794h4c0.18032,0.00255 0.34804,-0.09219 0.43894,-0.24794c0.0909,-0.15575 0.0909,-0.34838 0,-0.50413c-0.0909,-0.15575 -0.25863,-0.25049 -0.43894,-0.24794zM56.5,22c-0.18032,-0.00255 -0.34804,0.09219 -0.43894,0.24794c-0.0909,0.15575 -0.0909,0.34838 0,0.50413c0.0909,0.15575 0.25863,0.25049 0.43894,0.24794h1c0.18032,0.00255 0.34804,-0.09219 0.43894,-0.24794c0.0909,-0.15575 0.0909,-0.34838 0,-0.50413c-0.0909,-0.15575 -0.25863,-0.25049 -0.43894,-0.24794zM72.98438,34c-0.25977,0.00414 -0.50774,0.10921 -0.69141,0.29297l-5,5c-0.39037,0.39053 -0.39037,1.02353 0,1.41406l4.29297,4.29297h-31.58594c-0.55226,0.00006 -0.99994,0.44774 -1,1v8c0.00006,0.55226 0.44774,0.99994 1,1h31.58594l-4.29297,4.29297c-0.39037,0.39053 -0.39037,1.02353 0,1.41406l5,5c0.39053,0.39037 1.02353,0.39037 1.41406,0l15,-15c0.39037,-0.39053 0.39037,-1.02353 0,-1.41406l-15,-15c-0.19132,-0.19141 -0.45205,-0.29711 -0.72266,-0.29297zM73,36.41406l13.58594,13.58594l-13.58594,13.58594l-3.58594,-3.58594l5.29297,-5.29297c0.28583,-0.28603 0.37129,-0.71604 0.21656,-1.08963c-0.15474,-0.37359 -0.51922,-0.61724 -0.92359,-0.6174h-33v-6h33c0.40437,-0.00016 0.76885,-0.24381 0.92359,-0.6174c0.15474,-0.37359 0.06927,-0.8036 -0.21656,-1.08963l-5.29297,-5.29297z"></path>
                                            </g>
                                        </g>
                                    </svg>
                                    <span className='translate-y-[30%]'>Time off</span>




                                </div>



                                <div className="space-y-4 mb-12">
                                    <div className={styles.inputContainer}>
                                        <Input5 isdisabled={true} value={selectedtype} label='Type of absence'

                                        />

                                    </div>
                                    <div className={styles.inputContainer}>
                                        <Input5 isdisabled={true} value={selecteddescription} label='Description' />


                                    </div>

                                    <div className={styles.inputContainer}>

                                        <Input5 isdisabled={true} value={selectedstartdate} label='StartDate' />

                                    </div>
                                    <div className={styles.inputContainer}>
                                        <Input5 isdisabled={true} value={selectedenddate} label='EndDate' />

                                    </div>


                                    {selectedmedia !== '' && <div className=' bg-white-500 border-[2px]  flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                                        <ButtonSubmit fct={() => { window.location.href = selectedmedia }} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>View Media Attached </h3>} />


                                    </div>}
                                    {selectedmedia === '' && <div className=' bg-white-500 border-[2px]  flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                                        <h3 className='text-[14px] text-[#7152F3]'>No Media Attached </h3>


                                    </div>}






                                    {(etat === 'Approved' || etat === 'approved') && <div className="relative flex justify-center items-center w-[300px] flex-row justify-between  px-[3px] py-[8px] rounded-[4px] bg-green-500 bg-opacity-10">
                                        <p className="font- font-lexend  font-light leading-[18px] text-[14px] text-[#3FC28A]">Approved</p>
                                        <p className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '> by {supervisor.firstname} {supervisor.lastname}</p>
                                        <img className='w-[30px] h-[30px] rounded-[50%] ml-2' src={supervisor.profilepicture} alt='profilepicture' />
                                        <p className='font-lexend font-light text-[18px] leading-[30px] flex justify-center items-center w-[300px] flex-row justify-between  px-[3px] py-[8px] rounded-[4px]  absolute top-[82%]' >Response : {response}</p>
                                    </div>}

                                    {(etat === 'Rejected' || etat === 'rejected') && <div className="relative flex justify-center items-center w-[300px] flex-row justify-between  px-[3px] py-[8px] rounded-[4px] bg-red-500 bg-opacity-10">
                                        <p className="font- font-lexend  font-light leading-[18px] text-[14px] text-red-500">Rejected</p>
                                        <p className='font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left '> by {supervisor.firstname} {supervisor.lastname}</p>
                                        <img className='w-[30px] h-[30px] rounded-[50%] ml-2' src={supervisor.profilepicture} alt='profilepicture' />
                                        <p className='font-lexend font-light text-[18px] leading-[30px] flex justify-center items-center w-[300px] flex-row justify-between  px-[3px] py-[8px] rounded-[4px]   absolute top-[82%]' >Response : {response}</p>
                                    </div>}
                                    {(etat === 'Pending' || etat === 'pending') && <div className="flex justify-center items-center w-[66px]  px-[3px] py-[8px] rounded-[4px] bg-red-500 bg-opacity-10">
                                        <p className="font- font-lexend  font-light leading-[18px] text-[14px] text-[#ffab70]">Pending</p>
                                    </div>}





                                </div>

                            </div>
                        </div>
                        {/*end popup to view time off */}


                    </div>
                </div>








                <div className="card flex justify-content-center h-[510px]  absolute right-[-2%] top-[-80px] mr-[80px]">

                    <Calendar
                        value={date}
                        inline
                        showWeek
                        selectionMode="single"
                        readOnlyInput={true}
                        className='border border-gray-200 rounded-[10px] '

                        dateTemplate={(date) => dateTemplate(date, timeoffapproved)}
                    />
                </div>



            </div>
        </div >
    );
}

export default Leaves;


