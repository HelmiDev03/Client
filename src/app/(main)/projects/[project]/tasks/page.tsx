'use client'
import styles from '@/app/(main)/page.module.css';
import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { FiEye } from 'react-icons/fi';
import { FaArrowRight } from 'react-icons/fa';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoAddCircleOutline, IoDocumentOutline } from 'react-icons/io5';
import { IoMdClose } from 'react-icons/io';
import { SelectInputt } from '@/app/(components)/Inputs/SelectInput';
import { Input5 } from '@/app/(components)/Inputs/TextInput';

const Tasks = () => {
    
    const router = useRouter()
    const { project } = useParams();
    const dispatch = useDispatch();
    const tasks = useSelector((state: any) => state.tasks)

   /* React.useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/' + project + '/tasks')
            .then((res) => {
                dispatch(
                    {
                        type: 'SET_TASKS',
                        payload: res.data.tasks
                    }
                )

            })
    }, [])*/


    const ActionsCellRenderer = (props: { row: any }) => {
        const { row } = props;





       

        return (
            <>
                <div onClick={() => { router.push('/projects/' + row.projectid + '/projectemployees') }} className='p-2 mr-4 ml-[-10px] rounded-[50%] w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
                    <button type="submit"      ><FaArrowRight className='  font-lexend font-lexend  leading-[20px] text-[#7152F3] text-[20px]' /></button>
                </div>
                <div onClick={() => { axios.delete(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/deleteproject/' + row.projectid).then((res) => { dispatch({ type: 'SET_TASKS', payload: res.data.tasks }) }).catch((err) => console.log(err)) }} className='p-2 rounded-[50%] w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
                    <button type="submit"      ><MdOutlineDeleteOutline className='  font-lexend font-light  leading-[20px] text-red-500 text-[20px]' /></button>
                </div>


            </>

        );
    };


    const columns: GridColDef[] = [
        {
            field: 'vide',

            headerName: '',
            width: 40,



        },

        {
            field: 'name',
            headerName: 'Task Name',
            width: 180,


        },
        {
            field: 'vide2',

            headerName: '',
            width: 100,


        },


        {
            field: 'assignedto',
            headerName: 'Assigned to',
            width: 130,

        },
        {
            field: 'createdby',
            headerName: 'Created By',
            width: 130,
            renderCell: (params) => <figure className="flex items-center">
                <img className="w-[36px] h-[36px] rounded-[50%]" src={params.row.profilepicture} />
                <figcaption className="ml-2 font-lexend font-light text-[16px] leading-[24px] text-[#16151C] ">{params.row.author}</figcaption>

            </figure>

        },

        {
            field: 'duedate',
            headerName: 'Due Date',
            width: 130,

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
            author : tak.author.firstname + ' ' + tak.author.lastname,
            profilepicture: tak.author.profilepicture ? tak.author.profilepicture : '/defaultprofilepicture.png',
            duedate: tak.duedate,
    }
    })

    const [ addtask, setPopupAddTask ]  = React.useState(false);
    const errors = useSelector((state: any) => state.errors);
    const [taskname, setTaskName] = React.useState('');
    const [descriptions, setDescrition] = React.useState('');
    const [file, setFile] = React.useState<any>();
    const [fileName, setFileName] = React.useState('');
    const [base64, setBase64] = React.useState('');
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


    const AddNewTask = ()=>{}



    return (
        <div>

<div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.1)" }} className={` ${addtask ? 'block' : 'hidden'}           p-4 z-10 bg-[#FCFBFB] shadow-lg  absolute w-[500px] translate-x-[100px]  translate-y-[-100px] center rounded-[25px] `}>
                <IoMdClose onClick={() => { setPopupAddTask(!addtask); dispatch({ type: 'ERRORS', payload: {} }); }} className='absolute right-[5%] text-[24px] hover:cursor-pointer' />
                <div className="w-[90vw] max-w-md ">

                    <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Create a task</div>
                    <div className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>What needs to get done today?</div>


                    <div className="space-y-4 mb-12">
                        
                        <div className={styles.inputContainer}>
                            <Input5 value={taskname} onChange={(e: any) => setTaskName(e.target.value)} label='Task Name' />
                          

                        </div>
                        <div className={styles.inputContainer}>
                            <Input5 value={descriptions} onChange={(e: any) => setDescrition(e.target.value)} label='Description' />
                          

                        </div>
                        <div style={{ position: 'relative' }} className="border border-gray-300 relative mb-6 w-[300px] h-[80px] flex justify-center items-center rounded-[10px] border-[1px] bg-white">
                            <label className="z-50  absolute font-lexend  top-0 left-0 px-2 pt-1 font-light text-[11px] leading-[16px] text-indigo-600 ">Choose File (Otpional)</label>
                            <label htmlFor="fileInput" className="absolute inset-0 flex justify-center items-center cursor-pointer">
                                <IoDocumentOutline className="text-[24px] text-[#7152F3]" />
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

                       




                    </div>
                    <div>
                        <div className=' bg-white-500 border-[2px] translate-x-[200px] flex justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={AddNewTask} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Add </h3> } />


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

            <Box sx={{ height: 450, width: '90%', transform: 'translateX(-30px)' }}>
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
