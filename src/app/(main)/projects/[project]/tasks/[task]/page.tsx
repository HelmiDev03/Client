'use client'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import { TfiWrite } from "react-icons/tfi";
import { LuPen } from "react-icons/lu";
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import toast from 'react-hot-toast';






const Taks = () => {
    const router = useRouter()
    const taskid = useParams().task
    const [task, setTask] = React.useState({} as any)
    React.useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/tasks/' + taskid).then((res) => {
            setTask(res.data.task)
        }).catch((err) => {
        })
    }, [])

    const Update = () => {
        axios.put(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/tasks/update/' + taskid,
         { status: task.status === 'in progress' ? 'completed' : 'in progress' }
          )
          .then(() =>{ window.location.reload() ; toast.success('Task Updated Successfully')})
            .catch((err) => console.log(err))


            
    }
    return (
        <div className='flex flex-row justify-between'>
            <div className='flex flex-col justify-between'>
                <TfiWrite className='text-[20px] text-[#7152F3] mb-2' />
                <h1 className='text-gray-600 text-[20px] font-bold translate-y-[-220px]'>{task.name}</h1>

            </div>


            <div className='flex flex-col mr-[250px]'>

                <div className='flex flex-row justify-center items-center mb-6'>

                    <div className='mr-2  bg-white-500 border-[2px]  flex justify-center items-center border-[#7152F3] w-[120px] h-[40px] w-[250px] text-white rounded-[15px] p-1  ' >
                        <ButtonSubmit fct={Update} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>{task.status === 'in progress' ? "Mark as done" : "Mark as undone"}</h3>} />

                    </div>
                    <LuPen className='text-[20px] text-[#7152F3] mr-2' />

                </div>

                <div className='p-8 flex flex-col  border border-gray-300 rounded-[20px] w-[400px] mr-3 '>
                    <div className='flex flex-row justify-between items-center mb-8' >
                        <h1 className='font-lexend text-[15px] font-bold'>Due Date</h1>
                        <h1 className='text-gray-400 text-[20px] font-bold'>{task.deadline?.slice(0, 10)}</h1>
                    </div>
                    <div className='flex flex-row justify-between items-center mb-8' >
                        <h1 className='font-lexend text-[15px] font-bold'>Author</h1>
                        <figure onClick={() => { router.push('/employees/' + task.author._id) }} className="flex items-center mr-10 hover:cursor-pointer">
                            <img className="w-[36px] h-[36px] rounded-[50%]" src={task.author?.profilepicture ? task.author.profilepicture : "/defaultprofilepicture.png"} />


                        </figure>
                    </div>

                    <div className='flex flex-row justify-between items-center mb-8' >
                        <h1 className='font-lexend text-[15px] font-bold'>Status</h1>
                        <div className={`flex flex-row justify-center items-center translate-x-[-10px] ${task.status === 'in progress' ? "bg-[#C9F1F5]" : "bg-[#D4F5C9]"} rounded-[10px] p-2 w-[100px] h-[30px] `}>

                            <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>{task.status}</p>
                        </div>
                    </div>


                    {task.status !== 'in progress' &&

                        <div className='flex flex-row justify-between items-center mb-8' >
                            <h1 className='font-lexend text-[15px] font-bold'>Completed At</h1>
                            <h1 className='text-gray-400 text-[20px] font-bold'>{task.updatedAt?.slice(0, 10)}</h1>

                        </div>




                    }

                </div>


            </div>

        </div>
    )
}

export default Taks
