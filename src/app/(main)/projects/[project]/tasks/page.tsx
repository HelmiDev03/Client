'use client'
import styles from '@/app/(main)/page.module.css';
import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { FaArrowRight } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoAddCircleOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import toast from 'react-hot-toast';

const Tasks = () => {

    const router = useRouter()
    const { project } = useParams();
    const dispatch = useDispatch();
    const tasks = useSelector((state: any) => state.tasks)
    console.log(tasks)
    const [selectedUsers, setSelectedUsers] = React.useState<string[]>([]);
    const [projectUsers, setProjectUsers] = React.useState<string[]>([]);

    React.useEffect(() => {


        axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/' + project + '/tasks')
            .then((res) => {
                dispatch(
                    {
                        type: 'SET_TASKS',
                        payload: res.data.tasks
                    }
                )
            })

        axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/' + project)
            .then((res) => {


                setProjectUsers(res.data.project.users.map((projectUser: any) => projectUser.user));
            })

    }, [])


    const ActionsCellRenderer = (props: { row: any }) => {
        const { row } = props;







        return (
            <>
                <div onClick={() => { router.push('tasks/'+ row.taskid ) }} className='p-2 mr-4 ml-[-10px] rounded-[50%] w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
                    <button type="submit"      ><FaArrowRight className='  font-lexend font-lexend  leading-[20px] text-[#7152F3] text-[20px]' /></button>
                </div>
                <div onClick={() => { axios.delete(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/'+project+'/tasks/delete/' + row.taskid).then((res) => { dispatch({ type: 'SET_TASKS', payload: res.data.tasks }) ; toast.success('Task deleted ') }).catch((err) => console.log(err)) }}   className='p-2 rounded-[50%] w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
                    <button type="submit"      ><MdOutlineDeleteOutline className='  font-lexend font-light  leading-[20px] text-red-500 text-[20px]' /></button>
                </div>


            </>

        );
    };



    const StatusCellRenderer = (props: { row: any }) => {
        const { row } = props;

        return (
            <div className={`flex flex-row justify-center items-center translate-x-[-10px] ${row.status === 'in progress' ? "bg-[#C9F1F5]" : "bg-[#D4F5C9]"} rounded-[10px] p-2 w-[100px] h-[30px] `}>

                <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>{row.status}</p>
            </div>
        )
    };
    const AssignedToRenderCell = (props: { row: any }) => {
        const { row } = props;

        return (
           
               
                    <div  className={`${row.taskUsers.length >2 ? "translate-x-[20px]": ""} w-[150px] pr-12 py-2 flex flex-row justify-center items-center flex flex-row `}>
                        {row.taskUsers.slice(0, 2).map((user: any) => (
                            <img onClick={()=>{router.push('/employees/'+user._id)}}  key={user.id} src={user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png'} alt="" className='w-[36px] h-[36px] rounded-[50%] mr-2 hover:cursor-pointer' />
                        ))}
                        {row.taskUsers.length > 2 && (
                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mr-6'>+{row.taskUsers.length - 2}</p>
                        )}
                      
                    </div>
                
           
        );
    };


    const columns: GridColDef[] = [

        {
            field: 'vide',
            headerName: '',
            width: 10,


        },
        {
            field: 'name',
            headerName: 'Task Name',
            width: 130,


        },




        {
            field: 'assignedto',
            headerName: 'Assigned to',
            width: 200,
            renderCell: (params) => <AssignedToRenderCell row={params.row} />

        },
        {
            field: 'createdby',
            headerName: 'Created By',
            width: 200,
            renderCell: (params) => <div > <figure className="flex items-center justify-center">
                <img onClick={()=>{router.push('/employees/'+params.row.authorid)}} className="hover:cursor-pointer w-[36px] h-[36px] rounded-[50%]" src={params.row.profilepicture} />
                <figcaption className="ml-2 font-lexend font-light text-[14px] mr-[20px] leading-[24px] text-[#16151C] ">{params.row.author}</figcaption>

            </figure></div>

        },

        {
            field: 'duedate',
            headerName: 'Due Date',
            width: 130,

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


    const rows = tasks.map((tak: any, index: number) => {

        return {
            id: index + 1,
            taskid: tak._id,
            name: tak.name,
            assignedto: 55,
            author: tak.author.firstname + ' ' + tak.author.lastname,
            authorid : tak.author._id,
            profilepicture: tak.author.profilepicture ? tak.author.profilepicture : '/defaultprofilepicture.png',
            duedate: tak.deadline.slice(0, 10),
            status: tak.status,
            taskUsers: tak.assignedto,
        }
    })

    const [addtask, setPopupAddTask] = React.useState(false);
    const [taskname, setTaskName] = React.useState('');
    const [deadlines, setDeadline] = React.useState('');



    const handleSelectionChange = (userId: any) => {
        if (selectedUsers.some((user: any) => user._id === userId)) {
            setSelectedUsers(selectedUsers.filter((user: any) => user._id !== userId));
        } else {
            setSelectedUsers([...selectedUsers as any, projectUsers.find((user: any) => user._id === userId)]);
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
    console.log(projectUsers)
    console.log(selectedUsers)


    const usercolumns: GridColDef[] = [

        { field: 'checkbox', headerName: '', width: 50, renderCell: CheckboxCell },

        {
            field: 'vide',

            headerName: '',
            width: 10,
            renderCell: (params) => <figure className="flex items-center">
                <img className="w-[36px] h-[36px] rounded-[50%]" src={params.row.profilepicture} />
                <figcaption className="ml-2 font-lexend font-light text-[16px] leading-[24px] text-[#16151C] ">{params.row.name}</figcaption>

            </figure>

        },
        {
            field: 'name',

            headerName: 'Name',
            width: 170,

        },
    ]

    const userrows = projectUsers.map((user: any, index: number) => {
        return {
            id: index + 1,
            userid: user._id,
            user: user,
            name: user.firstname + ' ' + user.lastname,
            profilepicture: user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png',

        }
    })


    const formvalid = taskname !== '' && deadlines !== '' && selectedUsers.length !== 0;
    


    const AddNewTask = () => {
        if (!formvalid) {
            toast.error('Please fill all the fields');
            return;
        }
        axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/' + project + '/tasks/create', {
            name: taskname,
            deadline: deadlines,
            assignedto: selectedUsers.map((user: any) => user._id),

        })
            .then((res) => {
                dispatch(
                    {
                        type: 'SET_TASKS',
                        payload: res.data.tasks
                    }
                )
                toast.success('Task created successfully');
                setPopupAddTask(false);
            })
            .catch((res) => {
              
                toast.error('Task name already exists');
                setPopupAddTask(false);
            })
    }



    return (
        <div>

            <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${addtask ? 'block' : 'hidden'} h-[700px]          p-4  bg-[#FCFBFB] shadow-lg  absolute w-[500px] translate-x-[100px] z-[1000]  translate-y-[-230px] center rounded-[25px] `}>
                <IoMdClose onClick={() => { setPopupAddTask(!addtask); dispatch({ type: 'ERRORS', payload: {} }); }} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="w-[90vw] max-w-md ">

                    <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Create a task</div>
                    <div className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>What needs to get done today?</div>


                    <div className="space-y-4 mb-12">

                        <div className={styles.inputContainer}>
                            <Input5 value={taskname} onChange={(e: any) => setTaskName(e.target.value)} label='Task Name' />


                        </div>
                        <div className={styles.inputContainer}>
                            <Input5 value={deadlines} onChange={(e: any) => setDeadline(e.target.value)} type='date' label='deadline' />


                        </div>

                        <div className='w-[300px] '>  <Box sx={{ height: 290, width: '300', marginTop: '20px' }}>
                            <DataGrid

                                rows={userrows}
                                columns={usercolumns}

                                initialState={{
                                    pagination: {
                                        paginationModel: {
                                            pageSize: 3,
                                        },
                                    },
                                }}


                                localeText={{
                                    footerRowSelected: (count: number) => null, // This will remove the "1 row selected" text
                                }}

                                pageSizeOptions={[5]}




                            />
                        </Box>  </div>







                    </div>
                    <div>
                        <div className=' bg-white-500 border-[2px] translate-x-[200px] translate-y-[30px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit isdisabled={!formvalid} fct={AddNewTask} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add </h3>} />


                        </div>
                    </div>
                </div>
            </div>

            <div className=' mb-4 w-[200px] h-[50px] absolute top-[23%] right-[5%] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]'>
                <ButtonSubmit
                    fct={() => setPopupAddTask(true)}
                    timing={200}
                    text={
                        <div className='flex'>
                            <IoAddCircleOutline className='text-[24px] mr-[6px]' /> Create a Task
                        </div>
                    }

                />

            </div>

            <Box sx={{ height: 450, width: '100%', transform: 'translateX(-140px)' }}>
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

        </div >
    )
}

export default Tasks
