'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { GetAllEmployees } from '@/redux/actions/usersActions/getAllEmployees';
import { AppDispatch } from '@/redux/store';
import React, { useEffect } from 'react'
import { IoIosPeople } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { FaArrowRight } from "react-icons/fa6";
import axios from 'axios';
import { HiDotsVertical } from "react-icons/hi";
import { useParams } from 'next/navigation';
import {  SelectInput8 } from '@/app/(components)/Inputs/SelectInput';

const Employees = () => {
    const [Name, setName] = React.useState('')
    const [employeeName , setemployeeName] = React.useState('')
    const [employeeId , setemployeeId] = React.useState('')
    const policies = useSelector((state: any) => state.policies)
    const users = useSelector((state: any) => state.users)
    const dispatch = useDispatch<AppDispatch>()
    const [inputseacrh, setinputseacrh] = React.useState('')
    const { policy } = useParams()
    const [PolicyEmployees, setPolicyEmployees] = React.useState<any[]>([])
    const [filteredUsers, setfilteredUsers] = React.useState<any[]>([])
    const [selectedUserIds, setSelectedUserIds] = React.useState<string[]>([]);
    const handleCheckboxChange = (userId:string) => {
        
       
         if (selectedUserIds.includes(userId)) 
            setSelectedUserIds(selectedUserIds.filter((id) => id !== userId));
          else
            setSelectedUserIds((prev) => [...prev, userId]);


       
         
        };

    const AddNewEmployeeToPolicy = async ()=>{
       
        if (selectedUserIds.length === 0) {
            return;
        }
        axios.put(`http://localhost:5000/api/policy/addemployeestopolicy/${policy}`, {employeesId: selectedUserIds})
        .then((res: any) => {
            dispatch({
                type: 'SET_POLICIES',
                payload: res.data.policies
            });
            window.location.reload()
        })
    }    
        
 

    useEffect(() => {
        dispatch(GetAllEmployees());
        axios.get(`http://localhost:5000/api/policy/get/${policy}`)
            .then((res: any) => {
                setPolicyEmployees(res.data.policy.employees)
                setName(res.data.policy.name)
                setfilteredUsers(users.filter((user: any) => !res.data.policy.employees.some((employee: any) => employee._id === user._id)));
                 

            })
     
          
          
             
                
               
               
           
        

    }, [policy]);
    
   







    const resultsearchjsx = filteredUsers.filter((user: any) => user.firstname?.includes(inputseacrh) || user.lastname?.includes(inputseacrh)).map((user: any) => (
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
                <input  onChange={() => handleCheckboxChange( user._id)}   type="checkbox" className="rounded-md border-gray-300 text-primary-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" />
            </td>
        </tr>
    ));

    // Check if any users were found
    const noUsersFound = resultsearchjsx.length === 0;
    useEffect(() => {
        dispatch(GetAllEmployees())
    }, [])

    const ActionCellRenderer = (props: { row: any }) => {
        const { row } = props;





        return (

            <div onClick = {()=>{setPopupAssignPolicy(!PopupAssignPolicy) ; setemployeeName(row.fullname) ; setemployeeId(row.userid)}} className='p-2 rounded-[50%] w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
                <button type="submit"      ><HiDotsVertical className='  font-lexend font-light  leading-[24px] text-red-500 text-[20px]' /></button>
                </div>

        );
    };
    const EmployeeName = (props: { row: any }) => {
        const { row } = props;

        return (
            <figure className="flex items-center">
                <img className="w-[36px] h-[36px] rounded-[50%]" src={row.profilepicture} />
                <figcaption className="ml-2 font-lexend font-light text-[16px] leading-[24px] text-[#16151C]">{row.fullname}</figcaption>
            </figure>
        );
    };
    const columns: GridColDef[] = [
        {
            field: 'vide',

            headerName: '',
            width: 50,
            renderCell: (params) => <EmployeeName row={params.row} />,

        },

        {
            field: 'fullname',
            headerName: 'Fullname',
            width: 150,


        },



        {
            field: 'vide3',

            headerName: '',
            width: 450,
        },


        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => <ActionCellRenderer row={params.row} />,
            width: 100,

        },

    ];
    const rows = PolicyEmployees.map((user: any, index: number) => ({
        id: index + 1, // You can use the index as an id
        userid: user._id,
        fullname: user.firstname + ' ' + user.lastname,
        profilepicture: user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png',
    }));
    const [PopupAddEmployee, setPopupAddEmployee] = React.useState(false)
    const [PopupAssignPolicy, setPopupAssignPolicy] = React.useState(false)
    const [newPolicy, setnewPolicy] = React.useState('')

   const AssignNewPolicy = () => {
    if (newPolicy) {
        axios.put(`http://localhost:5000/api/policy/updateemployeepolicy/${employeeId}`, {
            name: newPolicy
        }).then((res: any) => {
            console.log(res.data.policies)
            dispatch({
                type: 'SET_POLICIES',
                payload: res.data.policies
            });
        })
        setPopupAssignPolicy(false)
        window.location.reload()
    }
    else{
        return ;
    }
   }








    return (
        <div>
            {/* popup add employee to policy*/}
            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddEmployee ? 'block' : 'hidden'}             p-4 z-10 bg-[#eee] shadow-lg  absolute w-[500px] translate-x-[180px]  translate-y-[-20px] center rounded-[25px] `}>
                <IoMdClose onClick={() => setPopupAddEmployee(!PopupAddEmployee)} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
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
                                            filteredUsers.length > 0 ? (
                                                filteredUsers.slice(0, 3).map((user: any) => (
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
                                                            <input  onChange={() => handleCheckboxChange(user._id)}  type="checkbox" className="rounded-md border-gray-300 text-primary-500 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50" />
                                                        </td>
                                                    </tr>
                                                ))
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
                        <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={AddNewEmployeeToPolicy} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add Employees</h3>} />


                        </div>
                    </div>
                </div>
            </div>

            {/* end popup add employee to policy*/}

              {/* popup assign different policy*/}
              <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${ PopupAssignPolicy? 'block' : 'hidden'}  h-[300px]           p-4 z-10 bg-[#eee] shadow-lg  absolute w-[500px] translate-x-[180px]  translate-y-[-20px] center rounded-[25px] `}>
                <IoMdClose onClick={() => setPopupAssignPolicy(!PopupAssignPolicy)} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="w-[90vw] max-w-md">
                    <div className='mb-3'>
                        <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Assign to different Policy</div>
                        <div className='mb-3 font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>Choose the new time off policy for {employeeName}.</div>
                    </div>
                    <div className='mb-6 flex flex-row justify-evenly'>
                    <div className='translate-x-[-80px] font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>Current Policy</div>
                    <div className=' font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>New Policy</div>
                    </div>
                    <div className="mb-[60px] flex flex-row justify-evenly">
                    <div className='translate-x-[-10px] translate-y-[10px]  mb-3 font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left'>{Name}</div>
                <div className='translate-x-[40px] flex' > <FaArrowRight className='translate-y-[10px] translate-x-[-10px] text-gray-500' style={{fontSize: '20px'}} />  <SelectInput8
                    label='New Policy'
                    placeholder='Select new Policy'
                    options={policies.map((policy: any) => policy.name).filter((name: any) => name !== Name)}
                    value={newPolicy}
                    onChange={(e:any) => {setnewPolicy(e.target.value)}}
                     /></div>
                    </div>
                    <div>
                        <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={AssignNewPolicy} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Save</h3>} />


                        </div>
                    </div>
                </div>
            </div>

            {/* end popup assign different policy*/}





            <div className=' absolute right-[3%] top-[23%]   w-[150px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit fct={() => setPopupAddEmployee(!PopupAddEmployee)} timing={200} text="Add Employee" />
            </div>
            <IoIosPeople className='text-[25px] text-[#7152F3]' /><h1 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] '>Employees</h1>
            <p className="font-lexend text-body-2 font-normal text-gray-500 text-sm leading-5 tracking-normal text-left   ">Here you can assign as many employees as you want to this policy.</p>


            <Box sx={{ height: 350, width: '80%', marginTop: '30px', }}>
                <DataGrid

                    rows={rows}
                    columns={columns}

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box>
        </div>
    )
}

export default Employees
