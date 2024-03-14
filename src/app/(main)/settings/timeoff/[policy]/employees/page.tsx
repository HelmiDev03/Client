'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { GetAllEmployees } from '@/redux/actions/usersActions/getAllEmployees';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react'
import { IoIosPeople } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
const Employees = () => {
    const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
        dispatch(GetAllEmployees())
    }, [])
    const users = useSelector((state: any) => state.users)
    const [PopupAddEmployee , setPopupAddEmployee] = React.useState(false)
    return (
        <div>
            <div className={ ` ${PopupAddEmployee ? 'block' : 'hidden'}            relative p-4 z-[10px] bg-[#eee] shadow-lg  absolute w-[500px] translate-x-[180px]  translate-y-[-20px] center rounded-[25px] `}>
            <IoMdClose onClick={()=>setPopupAddEmployee(!PopupAddEmployee)} className='absolute right-[5%] text-[24px] hover:cursor-pointer'  />
                <div className="w-[90vw] max-w-md">
                    <div>
                        <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Assign Employees</div>
                        <div className='mb-3 font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>Select the employees you would like to assign to this time off policy.</div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4 text-gray-500 dark:text-gray-400"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </svg>
                            <input
                                type="search"
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                placeholder="Search employees..."
                            />
                        </div>
                        <div className="grid gap-4">
                            <div className="relative w-full overflow-auto">
                                <table className="w-full caption-bottom text-sm">
                                    <thead className="[&amp;_tr]:border-b">
                                        <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0 w-[32px]"></th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                Name
                                            </th>
                                            <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&amp;:has([role=checkbox])]:pr-0">
                                                Role
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="[&amp;_tr:last-child]:border-0">
                                        {users.slice(0, 2).map((user: any) => (
                                            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                                    <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                                                        <img src={user.profilepicture} />
                                                    </span>
                                                </td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">{user.firstname} {user.lastname}</td>
                                                <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{user.role}</td>
                                            </tr>
                                        ))}
                                       
                                       
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                    <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                              <ButtonSubmit spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add Employee</h3>}  />


                                </div>
                    </div>
                </div>
            </div>

            <div className=' absolute right-[3%] top-[23%]   w-[150px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit fct={()=>setPopupAddEmployee(!PopupAddEmployee)}  timing={200} text="Add Employee" />
            </div>
            <IoIosPeople className='text-[25px] text-[#7152F3]' /><h1 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] '>Employees</h1>
            <p className="font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">Here you can assign as many employees as you want to this policy.</p>
        </div>
    )
}

export default Employees
