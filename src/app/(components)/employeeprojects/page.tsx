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
            .then((res:any) => {

                setProjects(res.data.projects);
                console.log(res.data.projects)
            })
    }, [])




    return (

        <div className="overflow-x-hidden rounded-lg shadow-md">
        <table className="w-full table-auto">
            <thead className="bg-gray-100">
                <tr>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Name</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Start Date</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Finish Date</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Budget</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Status</th>
                    <th className="py-3 px-4 text-sm font-semibold text-gray-600">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {projects?.map((project: any) => (
                    <tr key={project._id} className="bg-white translate-x-[15px] ">
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{project.name}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{project.startdate.slice(0, 10)}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">{project.enddate.slice(0, 10)}</td>
                        <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-800">${project.budget}</td>
                        <td className="py-4 px-6 whitespace-nowrap">
                            <div className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${project.status === 'Active' ? 'bg-green-500 text-green-800' : 'bg-yellow-500 text-yellow-800'}`}>
                                {project.status}
                            </div>
                        </td>
                        <td className="py-4 px-6 whitespace-nowrap">
                            <button onClick={() => { router.push('/projects/' + project._id) }} className="p-2 rounded-full  bg-[#7152F3] text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2">
                                <MdOutlineRemoveRedEye className="w-6 h-6" />
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    
    


    );
}

export default EmployeeProject;