'use client'

import React from 'react'
import styles from '../company/page.module.css'
import {  MdOutlineGroups3 } from 'react-icons/md'
import { IoMdClose, IoMdSettings } from 'react-icons/io';
import { FaRegUser, FaSquarePen } from "react-icons/fa6";
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoAddCircleOutline } from 'react-icons/io5';
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { PiCrownLight } from 'react-icons/pi';



const TimeOff = () => {
    const company = useSelector((state: any) => state.company)
    const permissionGroups = useSelector((state: any) => state.permissionGroups)
    const auth = useSelector((state: any) => state.auth)
    const errors = useSelector((state: any) => state.errors)
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>()
    const [isulhidden, setisulhidden] = React.useState(false)
    const [GroupName, setGroupName] = React.useState('')
    const [PopupAddGroup, setPopupAddGroup] = React.useState(false)
    const [PopupAddDay, setPopupAddDay] = React.useState(false)
    const [Day, setDay] = React.useState('')
    const [Name, setName] = React.useState('')
    const permission = useSelector((state: any) => state.permission);
   
    const [isHidden, setIsHidden] = React.useState(new Array(permissionGroups.length).fill(false))
    const toggleVisibility = (index: number) => {
        const newIsHidden = isHidden.map((item, i) => i === index ? !item : false)
        setIsHidden(newIsHidden)
    }


    React.useEffect(() => {

        const fetchdata = async () => {
          

            axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/permissions')
                .then(res => {
                    dispatch({
                        type: 'SET_PERMISSION_GROUPS',
                        payload: res.data.permissionGroups
                    });
                })
        }
        fetchdata()
    }, [])


    const AddGroup = () => {

        if (GroupName) {
            axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/permissions/create', { name: GroupName })
                .then(res => {
                    dispatch({
                        type: 'SET_PERMISSION_GROUPS',
                        payload: res.data.permissionGroups
                    });
                    setGroupName('')

                    setPopupAddGroup(false)
                    dispatch({
                        type: 'ERRORS',
                        payload: {}

                    })

                    return res.data.permissionGroups
                })
                .catch((err: any) => {
                    dispatch({
                        type: 'ERRORS',
                        payload: err.response.data

                    })
                })
                .then((newdata) => {
                    setIsHidden(new Array(newdata.length).fill(false))
                })
                .catch((err) => {
                    console.log(err)
                })

        }
        else {
            return;
        }
    }


    const deletegroup = (id: string) => () => {
        axios.delete(process.env.NEXT_PUBLIC_DOMAIN + `/api/permissions/delete/${id}`)
            .then(res => {
                dispatch({
                    type: 'SET_PERMISSION_GROUPS',
                    payload: res.data.permissionGroups
                });
                return res.data.permissionGroups

            })
            .catch(err => {
                console.log(err)
            })
            .then((newdata) => {
                setIsHidden(new Array(newdata?.length).fill(false))
            })
    }
    const setnewdefaultgroup = (id: string) => () => {
        axios.put(process.env.NEXT_PUBLIC_DOMAIN + `/api/group/setnewdefaultgroup/${id}`)
            .then(res => {
                dispatch({
                    type: 'SET_permissionGroups',
                    payload: res.data.permissionGroups
                });
                setIsHidden(isHidden.map(() => false))
                return res.data.permissionGroups
            })
            .catch(err => {
                console.log(err)
            })
            .then((newdata) => {
                setIsHidden(new Array(newdata?.length).fill(false))
            })
    }







    return (
        <div className={styles.container}>

            {/* in case add group */}
            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddGroup ? 'block' : 'hidden'}           p-4 z-10 bg-[#FCFCFC] shadow-lg  absolute w-[500px] translate-x-[300px]  translate-y-[100px] center rounded-[25px] `}>
                <IoMdClose onClick={() => { dispatch({ type: 'ERRORS', payload: {} }); setGroupName(''); setPopupAddGroup(!PopupAddGroup) }} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="w-[90vw] max-w-md">

                    <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Name the permissions group</div>
                    <div className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>Give a name to this group of employees and customize their permissions.</div>


                    <div className="space-y-4 mb-12">
                        <div className={styles.inputContainer}>
                            <Input5 onChange={(e: any) => { setGroupName(e.target.value) }} value={GroupName} label="Group name" type="text" />
                            {errors.name && <div className=" h-[30px] w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {errors.name}
                                </div>
                            </div>}
                        </div>





                    </div>
                    <div>
                        <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={AddGroup} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add </h3>} />


                        </div>
                    </div>
                </div>
            </div>






            <div className='flex flex-col justify-between items-start'>
                <div className='flex flex-col justify-start items-start h-[200px] w-[600px] mr-[44px] mb-[44px]   rounded-[36px] hover:cursor-pointer'>
                    <MdOutlineGroups3 className='text-[27px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Permission groups</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Manage employees access in NRH</p>
                </div>
                {permission.isadministrators && <div className=' mb-4 w-[241px] h-[50px] absolute top-[13%] right-[5%] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]'>
                    <ButtonSubmit
                        fct={() => setPopupAddGroup(true)}
                        timing={200}
                        text={
                            <div className='flex'>
                                <IoAddCircleOutline className='text-[24px] mr-[6px]' /> Create a custom group
                            </div>
                        }

                    />
                </div>}
            </div>


            {/* available permissionGroups*/}
            <div className='flex flex-wrap flex-row mb-[30px] mt-[-40px] ml-[50px]'>

                {permissionGroups.map((group: any, index: any) => (
                    <div key={group.name} className='relative w-[450px] border border-gray-300 rounded-lg flex flex-col items-center relative mr-[120px] mb-[75px]'>
                        {group.isadministrators && <div className="border border-gray-300 w-20 h-20 rounded-3xl flex justify-center items-center text-[#7152F3] bg-white absolute top-[-45px]">
                            <PiCrownLight size={30} />
                        </div>}
                        { group.isdefault &&   <div className="border border-gray-300 w-20 h-20 rounded-3xl flex justify-center items-center text-[#7152F3] bg-white absolute top-[-45px]">
                        <FaRegUser size={20} />
                     </div> }
                        {group.iscustom && <div className="border border-gray-300 w-20 h-20 rounded-3xl flex justify-center items-center text-[#7152F3] bg-white absolute top-[-45px]">
                            <FaSquarePen size={30} className='text-[#7152F3]' />
                        </div>}
                        {group.iscustom && permission.isadministrators && (
                            <IoMdSettings onClick={() => toggleVisibility(index)} className='absolute text-[24px] text-[#7152F3] hover:cursor-pointer right-[1%] top-[5%]' />
                        )}
                        {group.isdefault && <div className='rounded-[5px] p-1 mt-[35px] flex justify-center items-center bg-red-500'>
                            <h1 className='text-[#fff] font-lexend font-semibold text-[20px]'>Default</h1>
                        </div>}
                        {group.iscustom && <div className='rounded-[5px] p-1  mt-[35px]  flex justify-center items-center  bg-red-500'>
                            <h1 className='text-[#fff] font-lexend font-semibold text-[20px]'>Custom</h1>
                        </div>}
                        {group.isadministrators && <div className='rounded-[5px] p-1  mt-[35px]  flex justify-center items-center  '>
                            <h1 className='text-[#fff] font-lexend font-semibold text-[20px]'>nothing</h1>
                        </div>}
                        {group.iscustom && isHidden[index] && (
                            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className="rounded-[10px] absolute z-50 flex flex-col top-[20%] bg-white p-6  right-[-4%]">
                                <>
                                    <h3 onClick={deletegroup(group._id)} className='hover:cursor-pointer hover:bg-gray-200 p-3 text-[14px] font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>Remove</h3>
                                </>
                            </div>
                        )}
                        <div className='flex flex-col items-center gap-4 mt-10'>
                            <h1 className='font-semibold text-xl'>{group.name}</h1>
                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>
                                {Object.keys(group.users).length != 1 ? Object.keys(group.users).length + " employees assigned to this group" : Object.keys(group.users).length + " employee assigned to this group"}
                            </p>
                        </div>
                        {(auth.user.permissionGroup === group._id || permission.isadministrators) && <div className='flex flex-row justify-center mt-2'>
                            <h1 onClick={() => router.push(`/settings/permissionsgroups/${group._id}/permissions`)} className='hover:cursor-pointer text-[#7152F3] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>See Group</h1>
                        </div>}
                        {(auth.user.permissionGroup !== group._id && !permission.isadministrators) && <div className='flex flex-row justify-center mt-2'>
                            <h1 className='text-red-500 font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Access is Restricted</h1>
                        </div>}
                    </div>
                ))}



            </div>
            {/* end of available permissionGroups */}


























        </div>
    )
}

export default TimeOff
