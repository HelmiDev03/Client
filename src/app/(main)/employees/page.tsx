'use client'


import styles from './employees.module.css'

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FiEye } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { extractPublicId } from 'cloudinary-build-url'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoAddCircleOutline, IoPersonAdd } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import { Modal } from 'flowbite-react';
import { useState } from 'react';
import { Input2 } from '@/app/(components)/Inputs/TextInput';
import { GetAllEmployees } from '@/redux/actions/usersActions/getAllEmployees';
import { Deleteemployee } from '@/redux/actions/usersActions/deleteEmployee';
import axios from 'axios';

const Employees = () => {
    const router = useRouter();
    const users = useSelector((state: any) => state.users);
    const dispatch = useDispatch<AppDispatch>();
    const success = useSelector((state: any) => state.success);
    const errors = useSelector((state: any) => state.errors);
    const [openModal, setOpenModal] = useState(false);
    const [openPopupDelete, setOpenPopupDelete] = useState(false);
    const [popupDeletePage, setPopupDeletePage] = useState(1);
    const [employeeName, setEmployeeName] = useState('')
    const [employeeSelected, setEmployeeSelected] = useState('')
    const [employeeId, setEmployeeId] = useState('')
    const [employeeImage, setEmployeeImage] = useState('')


    //to check permissions
    const [addnewemployee, setAddNewEmployee] = useState(false)
    const [viewemployeedetails , setViewEmployeeDetails] = useState(false)
    const [deleteemployee, setDeleteEmployee] = useState(false)
    const [viewallemployees, setViewAllEmployees] = useState(false)


    const handleEmployeeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmployeeName(e.target.value)
    }

    const closeModel = () => {
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
    }

    useEffect(() => {


        dispatch(GetAllEmployees());
        axios.get(`http://localhost:5000/api/permissions/usergroup`)

            .then((res) => {
     
                
                    setAddNewEmployee(res.data.group.addnewemployee)
                    setViewEmployeeDetails(res.data.group.viewemployeedetails)
                    setDeleteEmployee(res.data.group.deleteemployee)
                    setViewAllEmployees(res.data.group.viewallemployees)

                
            })
            .catch((err) => {
                console.log(err)
            })




    }, []);


    const deleteEmployee = () => {
        dispatch({ type: 'ERRORS', payload: {} })
        if (popupDeletePage === 1) {
            setPopupDeletePage(2)
        }
        else if (popupDeletePage === 2) {
            if (employeeName !== employeeSelected) {
                dispatch({ type: 'ERRORS', payload: { message: 'The name you entered does not match the employee name' } })

            }
            else {
                let publicId = ""
                if (employeeImage !== 'defaultprofilepicture.png') {
                    publicId = extractPublicId(
                        employeeImage
                    )
                }

                dispatch(Deleteemployee(employeeId, publicId !== '/defaultprofilepicture.png' ? publicId : "error"))
            }
        }

    }









    const ActionCellRenderer = (props: { row: any }) => {
        const { row } = props;





        return (

            <div>  { viewemployeedetails && <button onClick={() => router.push(`/employees/${row.userid}`)} type="submit"    ><FiEye className=' font-lexend font-light  leading-[24px] text-[#7152F3] text-[20px] mr-2' /></button>}
               {deleteemployee && <button onClick={() => { setPopupDeletePage(1); setOpenPopupDelete(true); setEmployeeSelected(row.fullname); setEmployeeId(row.userid); setEmployeeImage(row.profilepicture) }} type="submit"      ><AiOutlineDelete className='  font-lexend font-light  leading-[24px] text-red-500 text-[20px]' /></button>}</div>

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
            field: 'vide2',

            headerName: '',
            width: 500,
        },

        {
            field: 'role',
            headerName: 'Role',

            width: 180,

        },
        {
            field: 'vide3',

            headerName: '',
            width: 50,
        },


      
deleteemployee || viewemployeedetails ?{
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => <ActionCellRenderer row={params.row} />,
            width: 150,

        }:{field: ''},

    ];


    const rows = users.map((user: any, index: number) => ({
        id: index + 1, // You can use the index as an id
        userid: user._id,
        fullname: user.firstname + ' ' + user.lastname,
        profilepicture: user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png',
        role: user.role,
    }));


    return (

        <div className={styles.EmployeesContainer}>
            {/*in case employee added*/}
            <Modal className='absolute w-[400px] translate-x-[520px] translate-y-[180px]  center rounded-[25px] ' show={success.message != ''} onClose={closeModel} size="md" popup>
                <Modal.Header />
                <Modal.Body className=''>
                    <div className="text-center">
                        <IoPersonAdd className="mx-auto mb-4 h-14 w-14 text-[#7152F3] " />
                        <h3 className="mb-5 text-lg font-normal  text-[#ffffff] ">
                            Employee Successfully Added
                        </h3>
                        <div className="flex justify-center gap-4">

                        </div>

                    </div>
                </Modal.Body>
            </Modal>
            {/*end in case employee added*/}


            {/*in case employee deleted*/}
            {openPopupDelete && <div id="static-modal" data-modal-backdrop="static" aria-hidden="true" className="bg-[#eee] overflow-y-auto overflow-x-hidden absolute w-[500px] right-[40%] center rounded-[25px]  z-50 justify-center items-center ">
                <div className="bg-[#eee] relative  w-full max-w-2xl max-h-full">

                    <div className="bg-[#eee]  relative  rounded-lg shadow ">

                        <div className=" bg-[#eee] flex items-center justify-between p-4 md:p-5 border-b border-red-200 rounded-t">
                            <h3 className="text-xl font-semibold text-gray-900 ">
                                Delete {employeeSelected}
                            </h3>
                            <div onClick={() => { setOpenPopupDelete(!openPopupDelete); setPopupDeletePage(1) }} >
                                <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="static-modal">
                                    <svg className="w-3 h-3 text-red-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                        </div>

                        <div className={`  ${popupDeletePage === 1 ? 'block' : 'hidden'}        p-4 md:p-5 space-y-4`}>
                            <p className="text-base leading-relaxed text-gray-500 ">
                                This action will permanently remove all records related to the {employeeSelected} from our  systems. This includes any documentation, discussions, contributions, packages, confidential information, and any affiliations with other individuals or organizations. Once completed, there will be no way to recover this data. Are you certain you wish to proceed ?
                            </p>

                        </div>
                        <div className={`  ${popupDeletePage === 2 ? 'block' : 'hidden'}  flex justify-center items-center flex-col      p-4 md:p-5 space-y-4`}>
                            <h3 className="text-xl font-semibold text-gray-500">To confirm, type "{employeeSelected}" in the box below</h3>
                            <Input2 type="text" width="510px" onChange={handleEmployeeName} />
                            {errors.message && <div className=" h-[30px] w-[350px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    {errors.message}
                                </div>
                            </div>}
                        </div>

                        <div className='translate-x-[60%] w-[221px] h-[50px] flex justify-center items-center rounded-[10px] p-[20px] bg-red-500'>
                            <ButtonSubmit
                                text={
                                    <div className='flex'>
                                        {popupDeletePage === 1 ? 'I have read and understand these effects' : 'Delete this employee'}
                                    </div>
                                }
                                fct={deleteEmployee}

                            />
                        </div>
                    </div>
                </div>
            </div>}










            {/*end in case employee deleted*/}






        { addnewemployee &&    <div className=' mb-4 w-[221px] h-[50px] absolute top-[13%] right-[5%] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]'>
                <ButtonSubmit
                    text={
                        <div className='flex'>
                            <IoAddCircleOutline className='text-[24px] mr-[6px]' /> Add New Employee
                        </div>
                    }
                    fct={() => router.push('employees/addnewemployee')}
                />
            </div> }
        {viewallemployees &&    <Box sx={{ height: 550, width: '100%', marginTop: '30px' }}>
                <DataGrid

                    rows={rows}
                    columns={columns}

                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                />
            </Box> }
            {!viewallemployees && <div className="flex justify-center items-center h-[500px] w-[100%]">
                <h1 className="text-red-500 text-[24px] font-lexend font-light">You do not have permission to view all employees</h1></div>
                    }
        </div>
    );
}

export default Employees