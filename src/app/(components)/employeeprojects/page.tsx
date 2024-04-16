'use client'
import axios from 'axios';
import { Table } from 'flowbite-react';
import { useRouter } from 'next/navigation';
import {  useEffect, useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';


function EmployeeProject(props: any) {
    const router = useRouter();
    const [projects, setProjects] = useState([]);
    const EmployeeID = props.id;



    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DOMAIN + `/api/projects/employee/${EmployeeID}/`)
            .then((res) => {

                setProjects(res.data.projects);
            })
    }, [])




    return (



        <div className="overflow-x-auto h-auto rounded-[10px]  ">
            <Table striped >

                <Table.Head>

                    <Table.HeadCell className="normal-case text-gray-400 dark:text-white font-lexend font-light  leading-[24px] text-[16px] ">Name</Table.HeadCell>
                    <Table.HeadCell className="normal-case text-gray-400 dark:text-white font-lexend font-light  leading-[24px] text-[16px] ">Start Date</Table.HeadCell>
                    <Table.HeadCell className="normal-case text-gray-400 dark:text-white font-lexend font-light  leading-[24px] text-[16px] ">Finish Date</Table.HeadCell>
                    <Table.HeadCell className="normal-case text-gray-400 dark:text-white font-lexend font-light  leading-[24px] text-[16px] ">Bidget</Table.HeadCell>
                    <Table.HeadCell className="normal-case text-gray-400 dark:text-white font-lexend font-light  leading-[24px] text-[16px] ">Status</Table.HeadCell>
                    <Table.HeadCell className="normal-case text-gray-400 dark:text-white font-lexend font-light  leading-[24px] text-[16px] ">Action</Table.HeadCell>

                </Table.Head>


                <Table.Body className="divide-y">


                   

                    {projects?.map((project: any) => (
                        <Table.Row key={project._id} className="bg-white  ">
                            <Table.Cell className="whitespace-nowrap  font-lexend font-light text-[16px] leading-[24px] text-[#16151C]" >{project.name}</Table.Cell>
                            <Table.Cell className=" font-lexend font-light text-[16px] leading-[24px] text-[#16151C]">{project.startdate.slice(0, 10)}</Table.Cell>
                            <Table.Cell className=" font-lexend font-light text-[16px] leading-[24px] text-[#16151C]">{project.enddate.slice(0, 10)}</Table.Cell>
                            <Table.Cell className=" font-lexend font-light text-[16px] leading-[24px] text-[#16151C] mt-[5px] flex flex-row">{project.budget} $</Table.Cell>
                            <Table.Cell>
                            {project.status==='Active'  &&<div className="flex justify-center items-center w-[66px] h-[24px]  px-[3px] py-[8px] rounded-[4px] bg-green-500 bg-opacity-10">
                                    <p className="font- font-lexend  font-light leading-[18px] text-[14px] text-[#3FC28A]">{project.status}</p>
                                </div>}
                                {project.status==='Closed' &&<div className="flex justify-center items-center w-[66px] h-[24px]  px-[3px] py-[8px] rounded-[4px] bg-[#EFBE12] bg-opacity-10">
                                    <p className="font- font-lexend  font-light leading-[18px] text-[14px]  text-[#EFBE12]">{project.status}</p>
                                </div> }
                            </Table.Cell>
                            <Table.Cell>
                                <div onClick={() => { router.push('/projects/' + project._id) }} className='p-2 rounded-[50%] w-[35px] height-[35px] flex justify-center items-center '>
                                    <button type="submit"      ><MdOutlineRemoveRedEye className='  font-lexend font-lexend  leading-[20px] text-[#7152F3] text-[20px]' /></button>
                                </div>
                            </Table.Cell>
                        </Table.Row>
                    ))}





                </Table.Body>
            </Table>
        </div>
    );
}

export default EmployeeProject;