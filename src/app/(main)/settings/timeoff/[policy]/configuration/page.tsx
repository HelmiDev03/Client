'use client'
import React from 'react'
import { FaPen } from "react-icons/fa6";
import { IoTimerSharp } from "react-icons/io5";
import styles from '../../../company/page.module.css'
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import { useSelector } from 'react-redux';
import { SelectInput6, SelectInput7 } from '@/app/(components)/Inputs/SelectInput';
import {  CheckboxGroup } from '@/app/(components)/Inputs/checkbox';
import { FaCalendarDays } from "react-icons/fa6";
const Config = () => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [StartMonth, setStartMonth] = React.useState('');
  const [duration, setDuration] = React.useState('');
  const [Abscence, setAbsence] = React.useState('');
  const [workingDays, setWorkingDays] = React.useState('');
  const [timeOffDays, setTimeOffDays] = React.useState('');
  const [maxTimeOffDays, setMaxTimeOffDays] = React.useState('');
  const [bankHoliday, setBankHoliday] = React.useState('');
  const [canbeused  , setCanbeused] = React.useState('');
  const errors = useSelector((state: any) => state.errors);
  return (
    <div>
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
          <div style={{marginRight : '100px'}} className={styles.inputContainer}>
            <CheckboxGroup
              options={[
                'Holidays',
                'Sick leave',
                'Compassionate leave',
                'Parental leave',
              ]}
              name="absenceTypes" // Provide a unique name for the checkbox group
              onChange={(e:any)=>setAbsence(e.target)} // Pass the handler function to update the selected absences
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

          <div className={styles.inputContainer}>
            <SelectInput7
              onChange={(e: any) => { setStartMonth(e.target.value) }}
              value={StartMonth}
              label="Cycle begin on"
              placeholder='Choose Start month'

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
                'December',

              ]}


            />
          </div>
          <div className={styles.inputContainer}>
            <SelectInput7
              onChange={(e: any) => { setDuration(e.target.value) }}
              value={duration}
              placeholder='Choose duration'

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
              placeholder='Choose'

              options={[
               "dont't count is as absence day",
                "count it as absence day",

              ]}


            />
          </div>
          <div className={styles.inputContainer}>
            <SelectInput7
              onChange={(e: any) => { setCanbeused(e.target.value) }}
              value={canbeused}
              label="When timeoff days can they be used?"
              placeholder='Choose'

              options={[
               "in the same cycle they has been acquired",
                "anytime after they has been acquired",

              ]}


            />
          </div>









        </div>


      </div>
      


    </div>
  )
}

export default Config
