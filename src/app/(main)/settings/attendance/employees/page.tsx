'use client'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from "react-icons/io";
import { FaSignOutAlt, FaUser, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { AppDispatch } from '@/redux/store';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaRegSquarePlus } from "react-icons/fa6";
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { TbLocationCog } from "react-icons/tb";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { GetAllEmployees } from '@/redux/actions/usersActions/getAllEmployees';
import { MdOutlineTimer } from "react-icons/md";


const CompanySettings = () => {
    const router = useRouter()

  const employees= useSelector((state:any)=>state.users)
    const columns: GridColDef[] = [
      // { field: 'id', headerName: 'ID', width: 120 },
      {
        field: 'profilePhoto',
        headerName: 'Profile Photo',
        align: 'center',
        disableColumnMenu: true,
        sortable: false,
        width: 110,
        renderCell: (params: any) => (
          <div className="w-8 h-8 bg-transparent rounded-lg border-solid border border-gray-200">
            <img className="object-fill w-full h-full rounded-lg"
              src={params.row.profilePhoto}
              alt="Profile Picture"
            />
          </div>
        ),
      },
      {
        field: 'fullName',
        headerName: 'Full name',
        width: 720,
        valueGetter: (params: any) => {
          return `${params.row.firstName || ''} ${params.row.lastName || ''}`;
        },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        disableColumnMenu: true,
        sortable: false,
        align: 'center',
        width: 150,
        renderCell: (params: any) => (
          <div className='flex flex-row translate-x-[-22px]'>
            <button onClick={() => router.push(`/employeesclockin?employeeId=${params.row.id}`+"&fullname="+params.row.fullName +"&profilepicture="+params.row.profilePhoto)} className="border-2 p-2 rounded-full mr-4">
              <MdOutlineTimer size={18} />
            </button>

            <button className="border-2 p-2 rounded-full mr-4">
              <FaSignOutAlt size={18} />
            </button>
          </div>
        ),
      },
    ];
      const rows = employees.slice(0,5).map((employee:any) => ({
        id: employee._id,
        profilePhoto: employee.profilepicture ? employee.profilepicture : '/defaultprofilepicture.png',
        firstName: employee.firstname,
        lastName: employee.lastname,
        fullName: `${employee.firstname} ${employee.lastname}`,
      }));


    const pathname = usePathname();
    const [PopupAddEmployee, setPopupAddEmployee] = React.useState(false)
    const activeLinkStyle = "text-blue-500 font-bold border-b-2 border-blue-500 rounded-sm pr-2";
    const [Name, setName] = React.useState('')
    const [employeeName, setemployeeName] = React.useState('')
    const [employeeId, setemployeeId] = React.useState('')
    const permissionGroups = useSelector((state: any) => state.permissionGroups)
    const users = useSelector((state: any) => state.users)
    const dispatch = useDispatch<AppDispatch>()
    const [inputseacrh, setinputseacrh] = React.useState('')
    const { group } = useParams()
    const [groupEmployees, setgroupEmployees] = React.useState<any[]>([])
    const [filteredUsers, setfilteredUsers] = React.useState<any[]>([])
    const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
    const permission = useSelector((state: any) => state.permission);
    const handleCheckboxChange = (userId: string) => {
  
  
      if (selectedUserIds.includes(userId))
        setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
      else
        setSelectedUserIds((prev) => [...prev, userId]);
  
  
  
  
    };
  
    const AddNewEmployeeToPermissionGroup = async () => {
  
      if (selectedUserIds.length === 0) {
        toast.error('Please select at least one employee');
        return;
      }
      axios.put(process.env.NEXT_PUBLIC_DOMAIN+`/api/permissions/addemployeestopermissiongroup/${group}`, { employeesId: selectedUserIds })
        .then((res: any) => {
          dispatch({
            type: 'SET_PERMISSION_GROUPS',
            payload: res.data.permissionGroups
          });
          toast.success('Employees added successfully');
          window.location.reload()
        })
    }
  
    useEffect(() => {
      dispatch(GetAllEmployees());
      
    }, []);

    const resultsearchjsx = employees.slice(6).filter((user: any) => user.firstname?.includes(inputseacrh) || user.lastname?.includes(inputseacrh)).map((user: any) => (
        <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
          <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
              <img src={user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png'} alt={`${user.firstname} ${user.lastname}`} />
            </span>
          </td>
          <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">{user.firstname} {user.lastname}</td>
          <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{user.role}</td>
          {/*checkbox*/}
          <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
            <input onChange={() => handleCheckboxChange(user._id)} type="checkbox" className="rounded-md border-gray-300 text-primary-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" />
          </td>
        </tr>
      ));

      const noUsersFound = resultsearchjsx.length === 0;

    return (
        
        <div className="mt-20 flex flex-col ml-5 p-16 ">
            <div className="flex w-full h-14 justify-between items-center border-b-2 p-2">
                <h1 className="font-semibold"></h1>
                <ul className="flex gap-4">
                    <li className={`pr-2 ${pathname === '/settings/attendance' ? activeLinkStyle : ''}`}>
                        <Link href={'/settings/attendance'} className="flex gap-2"><TbLocationCog size={20} />Configuration</Link>
                    </li>
                    <li className={`${pathname === '/settings/attendance/employees' ? activeLinkStyle : ''}`}>
                        <Link href={'/settings/attendance/employees'} className="flex gap-2"><FaUser size={20} />Employees</Link>
                    </li>
                </ul>
                <button ><FaRegSquarePlus onClick={() => setPopupAddEmployee(!PopupAddEmployee)} className="text-blue-600"  size={30} /></button>
            </div>
            <section className=" h-full py-14 px-12 flex flex-col gap-20">
                <div id="Description">
                    <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <FaUsers size={25} className="text-blue-600" />
                        Employees
                    </h1>
                    <p className="text-gray-400 text-sm ">
                        List of all Employees that have illimited access work range.
                    </p>
                </div>
                <Box sx={{ height: '400px', width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                    />
                </Box>
            </section>





                  {/* popup add employee to group*/}
      <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddEmployee ? 'block' : 'hidden'} p-4 z-10 bg-[#FCFCFC] shadow-lg absolute w-[500px] translate-x-[280px] translate-y-[40px] center rounded-[25px] `}>
        <IoMdClose onClick={() => setPopupAddEmployee(!PopupAddEmployee)} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
        <div className="w-[90vw] max-w-md">
          <div>
            <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Assign Employees</div>
            <div className='mb-3 font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>Select the employees you would like to assign to this Attendance Policy.</div>
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
                value={inputseacrh}
                onChange={(e) => setinputseacrh(e.target.value)}

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
                  <tbody>
                    {inputseacrh ? (
                      noUsersFound ? (
                        <tr>
                          <td colSpan={4} className="text-center py-4">No users found</td>
                        </tr>
                      ) : (
                        resultsearchjsx
                      )
                    ) : (
                      employees.slice(5,7).length > 0 ? (
                        <>
                          {employees.slice(5,7).map((user: any) => (
                            <tr key={user.id} className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
                                  <img src={user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png'} alt={`${user.firstname} ${user.lastname}`} />
                                </span>
                              </td>
                              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0 font-medium">{user.firstname} {user.lastname}</td>
                              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">{user.role}</td>
                              {/*checkbox*/}
                              <td className="p-4 align-middle [&amp;:has([role=checkbox])]:pr-0">
                                <input onChange={() => handleCheckboxChange(user._id)} type="checkbox" className="rounded-md border-gray-300 text-primary-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" />
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td colSpan={4} className="text-center py-4">Showing {employees.slice(5,7).length > 2 ? 2 : employees.slice(5,7).length} from {employees.length} users</td>
                          </tr>
                        </>
                      ) : (
                        <tr>
                          <td colSpan={4} className="text-center py-4">No users available</td>
                        </tr>
                      )
                    )}
                  </tbody>


                </table>
              </div>
            </div>
          </div>
          <div>
            <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
              <ButtonSubmit fct={AddNewEmployeeToPermissionGroup} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add Employees</h3>} />


            </div>
          </div>
        </div>
      </div>

      {/* end popup add employee to group*/}
        </div>

    )
}

export default CompanySettings