'use client'

import React from 'react'
import styles from './page.module.css'
import { IoMdClose } from 'react-icons/io';
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { MdOutlineDeleteOutline, MdOutlineGroups3 } from 'react-icons/md';
import { IoAddCircleOutline } from 'react-icons/io5';
import { FaArrowRight, FaCheckSquare } from "react-icons/fa";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { GetAllEmployees } from '@/redux/actions/usersActions/getAllEmployees';
import { IoCloseOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";

const Projects = () => {

    const [PopupAddProject, setPopupAddProject] = React.useState(false)
    const [PopupAddProject1, setPopupAddProject1] = React.useState(true)
    const [PopupAddProject11, setPopupAddProject11] = React.useState(false)
    const [PopupAddProject2, setPopupAddProject2] = React.useState(false)
    const [ProjectName, setProjectName] = React.useState('')
    const [ProjectStartDate, setProjectStartDate] = React.useState('')
    const [ProjectEndDate, setProjectEndDate] = React.useState('')
    const [AddEmployeeTable , setAddEmployeeTable] = React.useState(false)


    const [ProjectBudget, setProjectBudget] = React.useState<number>(0);

    const projects = useSelector((state: any) => state.projects)
    const users = useSelector((state: any) => state.users)
    const user = useSelector((state: any) => state.auth.user)
    const [filteredUsers, setfilteredUsers] = React.useState<any[]>([])

    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);



    const dispatch = useDispatch()
    const router = useRouter()




    // Check if any users were found



    const handleButton = () => {
        dispatch({ type: 'ERRORS', payload: {} })
        if (PopupAddProject1) {
            if (ProjectName === '' || ProjectStartDate === '' || ProjectEndDate === '') {
                toast.error('Please fill all fields')
            } else {
                setPopupAddProject1(false)
                setPopupAddProject11(true)
            }
        }
        else if (PopupAddProject11) {
            setPopupAddProject11(false)
                setPopupAddProject2(true)


            
        }
        else if (PopupAddProject2) {
            if (ProjectBudget === 0) {
                toast.error('Please fill all fields')
            } else {
                AddProject()


            }
        }
    }


    const AddProject = () => {
        const projectemployees = []
        for (let i = 0; i < selectedUsers.length; i++) {
            if (i === 0)
                projectemployees.push({ user: selectedUsers[i], position: 'team leader' });
            else
                projectemployees.push({ user: selectedUsers[i], position: 'member' });
        }

        dispatch({
            type: 'Chnage_State',
            payload: true
        })

        axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/addnewproject',
            { name: ProjectName, startdate: ProjectStartDate, enddate: ProjectEndDate, budget: ProjectBudget  , projectemployees :projectemployees }
        )
            .then((res) => {
                dispatch({ type: 'SET_PROJECTS', payload: res.data.projects })
                setPopupAddProject(false)
                setPopupAddProject1(true)
                setPopupAddProject11(false)
                setPopupAddProject2(false)
                setProjectName('')
                setProjectStartDate('')
                setProjectEndDate('')
                setProjectBudget(0)
                setSelectedUsers([])
                toast.success('Project created successfully');
                dispatch({
                    type: 'Chnage_State',
                    payload: false
                })
            })
            .catch((err) => {
                dispatch({
                    type: 'Chnage_State',
                    payload: false
                })
                dispatch({ type: 'ERRORS', payload: err.response.data })
            })


    }

    React.useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects')
            .then((res) => {
                dispatch({ type: 'SET_PROJECTS', payload: res.data.projects })
            })
            .catch((err) => {
                console.log(err)
            })

        dispatch(GetAllEmployees() as any);
        setSelectedUsers([...selectedUsers, user]); // Fix: Pass the spread argument as an array
      
        setfilteredUsers(users.filter((connecteduser: any) => connecteduser._id !== user._id))

    }, [])
   
    const StatusCellRenderer = (props: { row: any }) => {
        const { row } = props;

        return (
            <div className={`flex flex-row justify-center items-center translate-x-[-10px] ${row.status === 'Active' ? "bg-[#C9F1F5]" : "bg-[#E2E2E5]"} rounded-[10px] p-1 w-[100px] h-[30px] `}>
                <div className="_1f91gq20">
                    <div className={`${row.status === 'Active' ? "_1m2pwdr0 _1m2pwdr6 _1m2pwdr8" : "_1m2pwdr0 _1m2pwdr6 _1m2pwdr8"} mr-3 w-[10px] mr-3`} style={{ minWidth: '10px', minHeight: '10px', borderRadius: '50%', backgroundColor: row.status === 'Active' ? 'rgb(57, 181, 190)' : 'rgb(174, 174, 184)' }}></div>
                </div>
                <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>{row.status}</p>
            </div>
        )
    };

    const ActionsCellRenderer = (props: { row: any }) => {
        const { row } = props;





        return (
            <>
                <div onClick={() => { router.push('/projects/' + row.projectid + '/projectemployees') }} className='p-2 mr-4 ml-[-10px] rounded-[50%] w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
                    <button type="submit"      ><FaArrowRight className='  font-lexend font-lexend  leading-[20px] text-[#7152F3] text-[20px]' /></button>
                </div>
                <div onClick={() => { axios.delete(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/deleteproject/' + row.projectid).then((res) => { dispatch({ type: 'SET_PROJECTS', payload: res.data.projects });toast.success('Project Deleted');  }).catch((err) => console.log(err)) }} className='p-2 rounded-[50%] mr-4 w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
                    <button type="submit"      ><MdOutlineDeleteOutline className='  font-lexend font-light  leading-[20px] text-red-500 text-[20px]' /></button>
                </div>
                {row.status === 'Active' &&   <div onClick={() => { axios.put(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/closeproject/' + row.projectid).then((res) => { dispatch({ type: 'SET_PROJECTS', payload: res.data.projects });toast.success('Project Closed'); }).catch((err) => console.log(err)) }} className='p-2 rounded-[50%] w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
                    <button type="submit"      ><IoCloseOutline  className='  font-lexend font-light  leading-[20px] _1m2pwdr0 _1m2pwdr6 _1m2pwdr8 text-[20px]' /></button>
                </div> }


            </>

        );
    };



    const columns: GridColDef[] = [
        {
            field: 'vide',

            headerName: '',
            width: 20,


        },

        {
            field: 'name',
            headerName: 'Name',
            width: 150,


        },


        {
            field: 'employees',
            headerName: 'Collaborators',
            width: 130,
            renderCell: (params) => <div className='translate-x-[30px]'>{params.row.employees}</div>
        },

        {
            field: 'hoursworked',

            headerName: 'Hours Worked',
            width: 150,
            renderCell: (params) => <div className='translate-x-[30px]'>{params.row.hoursworked}</div>
        },




        {
            field: 'startdate',
            headerName: 'Start Date',

            width: 150,

        },
        {
            field: 'enddate',
            headerName: 'End Date',

            width: 150,

        },
        {
            field: 'status',
            headerName: 'Status',

            width: 150,
            renderCell: (params) => <StatusCellRenderer row={params.row} />

        },
        {
            field: 'actions',
            headerName: 'Actions',

            width: 150,
            renderCell: (params) => <ActionsCellRenderer row={params.row} />

        },

    ];


    const rows = projects.map((project: any, index: number) => {
        const hoursSinceCreation = Math.floor((Date.now() - Number(new Date(project.createdAt))) / (1000 * 60 * 60));
        return {
            id: index + 1,
            projectid: project._id,
            name: project.name,
            employees: project.users.length,
            hoursworked: hoursSinceCreation,
            startdate: project.createdAt.slice(0, 10),
            enddate: project.enddate.slice(0, 10),
            status: project.status
        }
    })

    const handleSelectionChange = (userId: any) => {
        if (selectedUsers.some((user: any) => user._id === userId)) {
            setSelectedUsers(selectedUsers.filter((user: any) => user._id !== userId));
        } else {
            setSelectedUsers([...selectedUsers, filteredUsers.find((user: any) => user._id === userId)]);
        }
        
    
    };
    
    function CheckboxCell(params: any) {
        return (
            <input
                type="checkbox"
                checked={selectedUsers.some((user: any) => user._id === params.row.userid)}
                onChange={() => handleSelectionChange(params.row.userid)}
            />
        );
    }

    const usercolumns: GridColDef[] = [

        { field: 'checkbox', headerName: '', width: 50, renderCell: CheckboxCell },

        {
            field: 'vide',

            headerName: '',
            width: 20,
            renderCell: (params) => <figure className="flex items-center">
                <img className="w-[36px] h-[36px] rounded-[50%]" src={params.row.profilepicture} />
                <figcaption className="ml-2 font-lexend font-light text-[16px] leading-[24px] text-[#16151C] ">{params.row.name}</figcaption>

            </figure>

        },
        {
            field: 'name',

            headerName: 'Name',
            width: 220,

        },
    ]

    const userrows = filteredUsers.map((user: any, index: number) => {
        return {
            id: index + 1,
            userid: user._id,
            user: user,
            name: user.firstname + ' ' + user.lastname,
            profilepicture: user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png',

        }
    })












    const isbuttondisabled = useSelector((state: any) => state.isbuttondisabled);

    return (
        <div className={styles.container}>

            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${PopupAddProject ? 'block' : 'hidden'}  w-[1200px]  mt-10        p-4 z-10 bg-[#FCFCFC] shadow-lg  absolute  h-[460px] translate-x-[-10px] p-8 translate-y-[80px] center rounded-[25px] `}>
                <IoMdClose onClick={() => { dispatch({ type: 'ERRORS', payload: {} }); setProjectName(''); setPopupAddProject(false); setPopupAddProject2(false); setPopupAddProject11(false), setPopupAddProject1(true);setSelectedUsers([]) }} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="flex flex-row justify-center items-center">

                    <div className=' flex flex-col justify-center items-center w-[30%]  mr-4'>
                        <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-6'>New Project</h2>

                     
                        <div className='flex flex-row mb-6 text-center'>
                            {PopupAddProject1 && <span className='bg-[#16151C] text-[#ffffff] w-[22px] h-[22px] rounded-[5px] text-center mr-3 font-semibold '>1</span>}
                            {(PopupAddProject11 || PopupAddProject2) && <FaCheckSquare className='text-[#7152F3] w-[22px] h-[22px] rounded-[5px] text-center mr-3 font-semibold ' />}
                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] '>Basic Informations</p>
                        </div>
                        <div className='flex ml-[-30px] flex-row mb-6 text-center'>
                            {!PopupAddProject2 && <span className='bg-[#16151C] text-[#ffffff] w-[22px] h-[22px] rounded-[5px] text-center mr-3 font-semibold '>2</span>}
                            {(PopupAddProject2) && <FaCheckSquare className='text-[#7152F3] w-[22px] h-[22px] rounded-[5px] text-center mr-3 font-semibold ' />}
                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] '>Project Roles</p>
                        </div>

                        <div className='flex flex-row ml-[-10px] text-center'>
                            <span className='bg-[#16151C] text-[#ffffff] w-[22px] h-[22px] rounded-[5px] text-center mr-3 font-semibold '>3</span>
                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Financial Details</p>
                        </div>
                   
                    </div>







                    

                    <div className='flex flex-col justify-center items-center w-[60%]  '>

                        <div className={`${PopupAddProject1 ? "block" : "hidden"}`}>

                            <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-6'>Fill in the project basic information</h2>

                            <Input5 onChange={(e: any) => { setProjectName(e.target.value) }} value={ProjectName} label="Project Name" type="text" />

                            <Input5 onChange={(e: any) => { setProjectStartDate(e.target.value) }} value={ProjectStartDate} label="Start Date" type="date" />
                            <Input5 onChange={(e: any) => { setProjectEndDate(e.target.value) }} value={ProjectEndDate} label="End Date" type="date" />
                        </div>

                        <div className={`${PopupAddProject11 ? "block" : "hidden"}`}>

                            <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-6'>Define the roles for your project</h2>

                            <div className='w-[350px] border border-gray-300 justify-center items-center flex flex-row rounded-[10px] p-2'>
                                <img src={user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png'} alt="" className='w-[40px] h-[40px] rounded-[50%] mr-6' />
                                <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mr-6'>{user.firstname} {user.lastname}</p>
                                <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] p-2 rounded-[10px] bg-[#cce6ff]'>team leader</p>
                                <button onClick={()=>setAddEmployeeTable(!AddEmployeeTable)} className='bg-[#eee] text-[#16151C] rounded-[10px] p-3 mt-1 translate-x-[100px]'>Add</button>
                            </div>
                            {selectedUsers.length >1 &&   <div className='w-[350px] pr-12 py-2 border border-gray-300 flex flex-row justify-center items-center flex flex-row rounded-[10px] mt-3'>
                                {selectedUsers.filter((userc: any) => userc._id !== user._id).slice(0,2).map((user: any, index: number) => {
                                    return (
                                        
                                            <img key={user._id} src={user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png'} alt="" className='w-[40px] h-[40px] rounded-[50%] mr-6' />

                                           
                                        
                                    )

                                })}
                                {selectedUsers.length >3 && <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mr-6'>+{selectedUsers.length - 3}</p>}
                                 <p className='text-[#16151C] font-lexend font-light text-[14px] w-[90px] text-center leading-[22px] p-2 rounded-[10px] bg-[#cce6ff] translate-x-[10px]'>member</p>
                            </div> }

                            

                         {AddEmployeeTable &&   <Box sx={{ height: 200, width: '200', marginTop: '20px'}}>
                                <DataGrid

                                    rows={userrows}
                                    columns={usercolumns}

                                    initialState={{
                                        pagination: {
                                            paginationModel: {
                                                pageSize: 8,
                                            },
                                        },
                                    }}


                                    localeText={{
                                        footerRowSelected: (count: number) => null, // This will remove the "1 row selected" text
                                    }}

                                    pageSizeOptions={[5]}




                                />
                            </Box> }
                        </div>



                        <div className={`${PopupAddProject2 ? "block" : "hidden"}   `}>

                            <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-6'>Financial details</h2>

                            <Input5 onChange={(e: any) => { setProjectBudget(e.target.value) }} value={ProjectBudget} label="Project Budget" type="text" />


                        </div>

                      




                        <div className=' bg-white-500 border-[2px] absolute right-[10%] top-[83%] flex justify-center items-center border-[#7152F3] w-[90px] h-[40px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit isbuttondisabled={isbuttondisabled} fct={handleButton} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Next</h3>} />


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
                <div onClick={() => setPopupAddProject(true)} className=' mb-4 w-[241px] h-[50px] absolute top-[13%] right-[5%] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]'>
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




            <Box sx={{ height: 450, width: '90%', marginTop: '-120px', transform: 'translateX(40px)' }}>
                <DataGrid

                    rows={rows}
                    columns={columns}

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 8,
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

export default Projects
function moment() {
    throw new Error('Function not implemented.');
}

