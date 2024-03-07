'use client'


import styles from './employees.module.css'

import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { FiEye } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import {  useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { GetAllEmployees } from '@/redux/actions/usersActions/getAllEmployees';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { IoAddCircleOutline, IoPersonAdd } from 'react-icons/io5';
import { useRouter } from 'next/navigation';
import {  Modal } from 'flowbite-react';
import { useState } from 'react';

const Employees = () => {
    const router = useRouter();
    const users = useSelector((state:any) => state.users);
    const dispatch  = useDispatch<AppDispatch>();
    const success = useSelector((state: any) => state.success);
    const [openModal, setOpenModal] = useState(false);
    const closeModel = () => {
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
    }

    useEffect(() => {
          
          
            dispatch(GetAllEmployees());
            
        
       
       
    }, []);
   









    const ActionCellRenderer = (id:any ) => {
      
        return (
       
          <>  <button type="submit"    ><FiEye className=' font-lexend font-light  leading-[24px] text-[#16151C] text-[20px] mr-2' /></button>
          <button type="submit"      ><AiOutlineDelete className='  font-lexend font-light  leading-[24px] text-[#16151C] text-[20px]' /></button></>
          
        );
      };
      const EmployeeName = (props: { value: string, row: any }) => {
        const { value: fullName, row } = props;
    
        return (
            <figure className="flex items-center">
                <img className="w-[36px] h-[36px] rounded-[50%]" src={row.profilepicture }  />
                <figcaption className="ml-2 font-lexend font-light text-[16px] leading-[24px] text-[#16151C]">{fullName}</figcaption>
            </figure>
        );
    };



    

    const columns: GridColDef[] = [
        {
            field: 'vide',
            
            headerName: '',
            width: 50,
            renderCell: (params) => <EmployeeName value={params.value} row={params.row} />,

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
        
       
        {
            field: 'Action',
            headerName: 'Action',
            renderCell: (params) => <ActionCellRenderer id={params.row.id} />,
            width: 150,
          
          },
    
      ];
      
   
      const rows = users.map((user:any, index:number) => ({
        id: index + 1, // You can use the index as an id
        fullname : user.firstname + ' ' + user.lastname, 
        profilepicture: user.profilepicture ? user.profilepicture : '/defaultprofilepicture.png',
        role: user.role,
    }));

   
return (

    <div className={styles.EmployeesContainer}>
         
         <Modal className='absolute w-[400px] translate-x-[520px] center rounded-[25px] ' show={success.message!=''}  onClose={ closeModel} size="md"  popup>
        <Modal.Header />
        <Modal.Body className='bg-lavender'>
          <div className="text-center">
            <IoPersonAdd className="mx-auto mb-4 h-14 w-14 text-[#7152F3] " />
            <h3 className="mb-5 text-lg font-normal  text-[#7152F3] dark:text-gray-400">
                        Employee Successfully Added
            </h3>
            <div className="flex justify-center gap-4">
            
            </div>
          
          </div>
        </Modal.Body>
      </Modal>
       

        <div className=' mb-4 w-[221px] h-[50px] absolute top-[13%] right-[5%] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]'>
            <ButtonSubmit
                text={
                    <div className='flex'>
                        <IoAddCircleOutline className='text-[24px] mr-[6px]' /> Add New Employee
                    </div>
                }
                fct={()=>router.push('employees/addnewemployee')}
            />
        </div>
        <Box sx={{ height: 550, width: '100%'  , marginTop : '30px'}}>
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
        </Box>
    </div>
);
}

export default Employees