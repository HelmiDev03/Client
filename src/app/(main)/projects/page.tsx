'use client'

import React from 'react'
import styles from './page.module.css'
import { IoMdClose } from 'react-icons/io';
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { MdOutlineGroups3 } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';

const Projects = () => {

    const [PopupAddProject, setPopupAddProject] = React.useState(false)
    const [ProjectName, setProjectName] = React.useState('')
    const [ProjectStartDate, setProjectStartDate] = React.useState('')
    const [ProjectEndDate, setProjectEndDate] = React.useState('')
    const errors = useSelector((state: any) => state.Errors)
    const dispatch = useDispatch()

    const handleButton = () => {}

    const AddProject = () => {

    }
    return (
        <div className={styles.container}>

            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${true ? 'block' : 'hidden'}  w-[1000px]         p-4 z-10 bg-[#FCFCFC] shadow-lg  absolute w-[1000px] translate-x-[100px] p-8 translate-y-[80px] center rounded-[25px] `}>
                <IoMdClose onClick={() => { dispatch({ type: 'ERRORS', payload: {} }); setProjectName(''); setPopupAddProject(!PopupAddProject) }} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="flex flex-row justify-center items-center">

                    <div className='flex flex-col justify-center items-center w-[30%] mr-4'>
                        <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-6'>New Project</h2>
                        <div className='flex flex-row mb-6 text-center'>
                            <span className='bg-[#16151C] text-[#ffffff] w-[22px] h-[22px] rounded-[5px] text-center mr-3 font-semibold '>1</span>
                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] '>Basic Informations</p>
                        </div>

                        <div className='flex flex-row ml-[-10px] text-center'>
                            <span className='bg-[#16151C] text-[#ffffff] w-[22px] h-[22px] rounded-[5px] text-center mr-3 font-semibold '>2</span>
                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Financial Details</p>
                        </div>

                    </div>

                    <div className='flex flex-col justify-center items-center w-[60%] '>

                        <div>

                            <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-6'>Fill in the project basic information</h2>

                            <Input5 onChange={(e: any) => { setProjectName(e.target.value) }} value={ProjectName} label="Project name" type="text" />

                            <Input5 onChange={(e: any) => { setProjectStartDate(e.target.value) }} value={ProjectStartDate} label="Start Date" type="date" />
                            <Input5 onChange={(e: any) => { setProjectEndDate(e.target.value) }} value={ProjectEndDate} label="End Date" type="date" />
                        </div>


                        <div className=' bg-white-500 border-[2px] translate-y-[20px]  translate-x-[280px] flex justify-center items-center border-[#7152F3] w-[90px] h-[40px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={handleButton} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Next</h3>} />


                        </div>
                    </div>



                </div>
            </div>







            <div className='flex flex-col justify-between items-start'>
                <div className='flex flex-col justify-start items-start h-[200px] w-[600px] mr-[44px] mb-[44px]   rounded-[36px] hover:cursor-pointer'>
                    <MdOutlineGroups3 className='text-[27px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Projects</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Create and track the time worked on your projects.</p>
                </div>
                <div className=' mb-4 w-[241px] h-[50px] absolute top-[13%] right-[5%] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]'>
                    <ButtonSubmit
                        fct={() => setPopupAddProject(true)}
                        timing={200}
                        text={
                            <div className='flex'>
                                <IoAddCircleOutline className='text-[24px] mr-[6px]' /> Create a Project
                            </div>
                        }

                    />

                </div>

            </div>



        </div>
    )
}

export default Projects
