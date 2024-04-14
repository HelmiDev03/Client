'use client'
import React from 'react'
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import { FiEye } from 'react-icons/fi';

const ProjectEmployees = () => {
  const [users, setUsers] = React.useState([])
  const router = useRouter()
  const { project } = useParams();

  React.useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_DOMAIN +'/api/projects/'+project)
      .then((res) => {
        setUsers(res.data.project.users)
        console.log(res.data.project.users)
      })
  }, [])
  const columns: GridColDef[] = [
    {
      field: 'vide',

      headerName: '',
      width: 40,
      renderCell: (params) => <figure className="flex items-center">
                <img className="w-[36px] h-[36px] rounded-[50%]" src={params.row.profilepicture} />
                <figcaption className="ml-2 font-lexend font-light text-[16px] leading-[24px] text-[#16151C] ">{params.row.name}</figcaption>

            </figure>


    },

    {
      field: 'name',
      headerName: 'Name',
      width: 180,


    },
    {
      field: 'vide2',

      headerName: '',
      width: 400,


    },


    {
      field: 'position',
      headerName: 'Position',
      width: 130,
      renderCell: (params) => <div >{params.row.position}</div>
    },

    {
      field: 'actions',
      headerName: 'Action',

      width: 150,
      renderCell: (params) => <button className='translate-x-[10px]' onClick={() => router.push(`/employees/${params.row.userid}`)} type="submit"    ><FiEye className=' font-lexend font-light  leading-[24px] text-[#7152F3] text-[20px] mr-2' /></button>


    },

  ];


  const rows = users.map((user: any, index: number) => {
    
    return {
      id: index + 1,
      userid : user.user._id,
      name: user.user.firstname + ' ' + user.user.lastname,
      profilepicture: user.user.profilepicture ? user.user.profilepicture : '/defaultprofilepicture.png',
      position: user.position,
    }
  })


  
  return (
    <div>
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

export default ProjectEmployees
