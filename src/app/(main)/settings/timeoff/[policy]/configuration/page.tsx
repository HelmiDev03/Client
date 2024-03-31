'use client'
import React, { useEffect } from 'react'
import { useParams } from 'next/navigation';
import { FaPen } from "react-icons/fa6";
import { IoTimerSharp } from "react-icons/io5";
import styles from '../../../company/page.module.css'
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { SelectInput6, SelectInput7, SelectInput8 } from '@/app/(components)/Inputs/SelectInput';
import { CheckboxGroup } from '@/app/(components)/Inputs/checkbox';
import { FaCalendarDays } from "react-icons/fa6";
import axios from 'axios';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { Modal } from 'flowbite-react';
import { MdSecurityUpdateGood } from 'react-icons/md'
const Config = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [StartMonth, setStartMonth] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [absence, setAbsence] = React.useState<string[]>(['']);
  const [workingDays, setWorkingDays] = React.useState<number>(0);
  const [timeOffDays, setTimeOffDays] = React.useState<number>(0);
  const [maxTimeOffDays, setMaxTimeOffDays] = React.useState<number>(0);
  const [bankHoliday, setBankHoliday] = React.useState('');
  const [canbeused, setCanbeused] = React.useState('');
  const [includerest, setIncluderest] = React.useState('');
  const errors = useSelector((state: any) => state.errors);
  const { policy } = useParams();
  const success = useSelector((state: any) => state.success);
  const dispatch = useDispatch();
  const closeModel = () => {
    dispatch({
      type: 'SUCCESS',
      payload: ''
    });
    window.location.reload();
  }
  const updatePolicy = () => {
    const data = {
      name,
      description,
      startMonth: StartMonth,
      duration,
      absences: absence,
      workingDays,
      TimeOffDaysPerWorkingDays: timeOffDays,
      maxTimeOffDays,
      nationaldays: bankHoliday === "do not count is as absence day" ? true : false,
      timeofflastforever: canbeused === "in the same cycle they has been acquired" ? false : true,
      includerest: includerest === "count only the main day" ? false : true
    }
   

    axios.put(`http://localhost:5000/api/policy/update/${policy}`, data)
      .then(res => {
        dispatch({
          type: 'SUCCESS',
          payload: 'updated'
        });
        dispatch({
          type: 'SET_POLICIES',
          payload: res.data.policies
        })
      })

  }

const [editpolicyconfig, setEditpolicyconfig] = React.useState(false);
  useEffect(() => {
    axios.get(`http://localhost:5000/api/policy/get/${policy}`)
      .then((res: any) => {
        setName(res.data.policy.name);
        setDescription(res.data.policy.description);
        setStartMonth(res.data.policy.startMonth);
        setDuration(res.data.policy.duration);
        setWorkingDays(res.data.policy.workingDays);
        setAbsence(res.data.policy.absences);
        setTimeOffDays(res.data.policy.TimeOffDaysPerWorkingDays);
        setMaxTimeOffDays(res.data.policy.MaxTimeOffDays);
        setBankHoliday(res.data.policy.nationaldays ? "do not count is as absence day" : "count it as absence day");
        setCanbeused(!res.data.policy.timeofflastforever ? "in the same cycle they has been acquired" : "anytime after they has been acquired");
        setIncluderest(!res.data.policy.includerest ? "count only the main day" : "count the main day and the rest");
        
      })
     
            axios.get(`http://localhost:5000/api/permissions/usergroup`)   
    
            .then((res) => {
                
                      setEditpolicyconfig(res.data.group.editpolicyconfig)
            })
            .catch((err) => {
              console.log(err)
            })
     
 

  }, [policy]);

  return (
    <div>
     {editpolicyconfig && <div className=' absolute right-[3%] top-[23%]   w-[150px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
        <ButtonSubmit fct={updatePolicy} timing={100} text="Edit Policy" />
      </div> }


      <Modal className='absolute w-[400px] translate-x-[520px] center rounded-[25px] ' show={success.message != ''} onClose={closeModel} size="md" popup>
        <Modal.Header />
        <Modal.Body className='bg-lavender '>
          <div className="text-center">
            <MdSecurityUpdateGood className="mx-auto mb-4 h-14 w-14 text-[#7152F3] " />
            <h3 className="mb-5 text-lg font-normal  text-[#7152F3] dark:text-gray-400">
              Successfully Updated
            </h3>
            <div className="flex justify-center gap-4">

            </div>

          </div>
        </Modal.Body>
      </Modal>
      <div className='flex flex-row justify-between mb-[30px]'>
        <div className='flex flex-col justify-center items-start h-[150px] w-[350px]   rounded-[36px] hover:cursor-pointer'>
          <FaPen className='text-[24px] text-[#7152F3] mb-4' />
          <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Policy basics</h2>
          <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Add the name and, if necessary, a short description for this time off policy</p>
        </div>

        <div className=" flex flex-col      translate-x-[-160px]  w-[350px]  flex justify-center items-center rounded-[36px]  ">

          <div className={styles.inputContainer}>
            <Input5 onChange={(e: any) => { setName(e.target.value) }} value={name} label="Policy Name" type="text" />
            {errors.name && <div className=" h-[30px] mb-4  w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                {errors.name}
              </div>
            </div>}
          </div>
          <div className={styles.inputContainer}>
            <Input5 onChange={(e: any) => { setDescription(e.target.value) }} value={description} label="Policy description (optional)" type="text" />

          </div>
          <div style={{ marginRight: '100px' }} className={styles.inputContainer}>
            <CheckboxGroup
              options={[
                'Holidays',
                'Sick leave',
                'Compassionate leave',
                'Parental leave',
              ]}
              value={absence} // Provide the selected absences
              name="absenceTypes" // Provide a unique name for the checkbox group
              onChange={(selectedOptions: string[]) => setAbsence(selectedOptions)} // Pass the selected options directly
              label="Absence types"
            />
          </div>








        </div>


      </div>


      <div className='flex flex-row justify-between mb-[30px]'>
        <div className='flex flex-col justify-center items-start h-[150px] w-[350px]   rounded-[36px] hover:cursor-pointer'>
          <IoTimerSharp className='text-[24px] text-[#7152F3] mb-4' />
          <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Cycle Settings</h2>
          <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Add the name and, if necessary, a short description for this time off policy</p>
        </div>

        <div className=" flex flex-col      translate-x-[-160px]  w-[350px]  flex justify-center items-center rounded-[36px]  ">

          <SelectInput8
            onChange={(e: any) => { setStartMonth(e.target.value) }}
            placeholder={StartMonth}
            label="Cycle begin on"
            value={StartMonth}
            options={[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ]}
          />

          <div className={styles.inputContainer}>
            <SelectInput8
              onChange={(e: any) => { setDuration(e.target.value) }}
              value={duration}
              placeholder={duration}


              label="Cycle duration"
              options={[
                '1 month',
                '2 months',
                '3 months',
                '4 months',
                '6 months',
                '12 months',

              ]}


            />
          </div>








        </div>


      </div>


      <div className='flex flex-row justify-between mb-[30px]'>
        <div className='flex flex-col justify-center items-start h-[150px] w-[350px]   rounded-[36px] hover:cursor-pointer'>
          <FaCalendarDays className='text-[24px] text-[#7152F3] mb-4' />
          <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Policy Settings</h2>
          <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Set up how this policy will be measured and earned.</p>
        </div>


        <div className=" flex flex-col      translate-x-[-160px]  w-[350px]  flex justify-center items-center rounded-[36px]  ">

          <div className={styles.inputContainer}>
            <Input5 onChange={(e: any) => { setWorkingDays(e.target.value) }} value={workingDays} label="Working Days" type="text" />
            {errors.name && <div className=" h-[30px] mb-4  w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
              <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span className="sr-only">Info</span>
              <div>
                {errors.name}
              </div>
            </div>}
          </div>
          <div className={styles.inputContainer}>
            <Input5 onChange={(e: any) => { setTimeOffDays(e.target.value) }} value={timeOffDays} label="Time Off Days Per Working Days" type="text" />

          </div>

          <div className={styles.inputContainer}>
            <Input5 onChange={(e: any) => { setMaxTimeOffDays(e.target.value) }} value={maxTimeOffDays} label="Max TimeOff Days" type="text" />

          </div>
          <div className={styles.inputContainer}>
            <SelectInput7
              onChange={(e: any) => { setBankHoliday(e.target.value) }}
              value={bankHoliday}
              label="If a bank holiday falls on the absence"


              options={[

                bankHoliday === "do not count is as absence day" ? "do not count is as absence day" : "count it as absence day",
                bankHoliday === "count it as absence day" ? "do not count is as absence day" : "count it as absence day",

              ]}


            />
          </div>
          <div className={styles.inputContainer}>
            <SelectInput7
              onChange={(e: any) => { setCanbeused(e.target.value) }}
              value={canbeused}
              label="When timeoff days can they be used?"


              options={[
                canbeused === "in the same cycle they has been acquired" ? "in the same cycle they has been acquired" : "anytime after they has been acquired",
                canbeused === "anytime after they has been acquired" ? "in the same cycle they has been acquired" : "anytime after they has been acquired",

              ]}


            />
          </div>

          <div className={styles.inputContainer}>
            <SelectInput7
              onChange={(e: any) => { setIncluderest(e.target.value)}}
              value={includerest}
              label="If an absence occurs on the last day "


              options={[
                includerest === "count only the main day" ? "count only the main day" : "count the main day and the rest",
                includerest === "count the main day and the rest" ? "count only the main day" : "count the main day and the rest",

              ]}


            />
          </div>









        </div>


      </div>



    </div>
  )
}

export default Config
