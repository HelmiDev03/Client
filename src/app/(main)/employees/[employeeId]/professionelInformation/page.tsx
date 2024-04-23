'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import ButtonCancel from '@/app/(components)/ButtonCancel/Button'
import { Input4 } from '@/app/(components)/Inputs/TextInput'
import DateInput from '@/app/(components)/Inputs/DateInput'
import { SelectInput2, SelectInput22 } from '@/app/(components)/Inputs/SelectInput'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '@/app/(main)/profile/profile.module.css'
import axios from 'axios'
import { useParams } from 'next/navigation'
import { Modal } from 'flowbite-react';
import { MdSecurityUpdateGood } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { heIL } from '@mui/x-data-grid'

const Prof = () => {
    const dispatch = useDispatch()
    const [inputDisble, setInputDisable] = useState(true)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [matricule, setMatricule] = useState('')
    const { employeeId } = useParams()
    const [createdAt, setCreatedAt] = useState('');


    const [allmanagers, setAllManagers] = useState([])
    const [newmanagerid, setNewManagerId] = useState()
    const [manager, setManager] = useState<{ firstname: string, lastname: string, profilepicture: string }>({ firstname: '', lastname: '', profilepicture: '' });
    const edit = () => { setInputDisable(!inputDisble) }
    const Update = () => {


        axios.put(process.env.NEXT_PUBLIC_DOMAIN + `/api/employees/updatemanager/${employeeId}/${newmanagerid}`)
            .then((res) => {

                toast.success('Manager Successfully Updated')

            })
            .catch((res) => {

                toast.error('Error Updating Manager')

            })

        setInputDisable(!inputDisble)
    }
    const Cancel = () => { window.location.reload() }
    const success = useSelector((state: any) => state.success)
    useEffect(() => {


        const fetchdata = async () => {

            await axios.get(process.env.NEXT_PUBLIC_DOMAIN + `/api/permissions/managers`)
                .then((res) => {
                    setAllManagers(res.data.managers)
                    console.log(res.data.managers)
                })
            axios.get(process.env.NEXT_PUBLIC_DOMAIN + `/api/employees/employee/${employeeId}`)
                .then((res) => {

                    setEmail(res.data.employee.email)
                    setRole(res.data.employee.role)
                    setMatricule(res.data.employee.matricule)
                    axios.get(process.env.NEXT_PUBLIC_DOMAIN + `/api/employees/employee/${res.data.employee.manager}`)
                        .then((res) => {

                            setManager({ firstname: res.data.employee.firstname, lastname: res.data.employee.lastname, profilepicture: res.data.employee.profilepicture })
                            //exclude manager from all managers


                        })
                        .catch
                        (err => {
                            console.log(err)
                        })


                    const createdAtValue = res.data.employee.createdAt ? new Date(res.data.employee.createdAt) : null;
                    const createdAtString = createdAtValue ? createdAtValue.toISOString().split('T')[0] : '';
                    setCreatedAt(createdAtString)




                })
        }
        fetchdata()
    }, [])
    const closeModel = () => {
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
        window.location.reload()
    }

    return (
        <div className=" flex flex-row flex-wrap " >

            <div className=' absolute   top-[25%] right-[6%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit timing={200} text="Edit" fct={edit} />
            </div>

            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Email Adress</h3>
                <Input4 isDisabled={true} value={email} type='text' />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Matricule</h3>
                <Input4 isDisabled={true} value={matricule} type='text' />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Role</h3>

                <select
                    className='w-[330px] h-[56px] p-[16px] md:p-[16px] lg:p-[20px] font-lexend font-light text-[16px] leading-[24px] text-[#16151C] xl:p-[16px] mb-2 border border-solid border-gray-300 rounded-[10px] border-solid border-[1px] border-gray-300 focus:border-indigo-600 focus:outline-none focus:ring-indigo-600 transition-colors duration-300 ease-in-out'
                    value={role}
                    disabled={true}
                >
                    <option value={role}>
                        {role}
                    </option>
                </select>


                



            </div>







            <div style={{ position: 'relative' }} className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Manager</h3>
                <img src={manager.profilepicture ? manager.profilepicture : '/defaultprofilepicture.png'} className='absolute w-[40px] h-[40px] translate-x-[260px] translate-y-[30px] rounded-[50%] ' />
                <SelectInput22

                    placeholder={manager.firstname + ' ' + manager.lastname}
                    options={allmanagers.map((manager: any) => ({
                        label: manager.firstname + ' ' + manager.lastname,
                        value: manager._id
                    }))}
                    onChange={(e: any) => {
                        setNewManagerId(e.target.value);
                        let newmanager = { firstname: '', lastname: '', profilepicture: '' }
                        newmanager = allmanagers.find((manager: any) => manager._id === e.target.value) ?? { firstname: '', lastname: '', profilepicture: '' };

                        setManager({ firstname: newmanager.firstname, lastname: newmanager.lastname, profilepicture: newmanager.profilepicture });


                    }}

                />
            </div>


            {!inputDisble && <div className=' absolute   top-[88%] right-[5%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit spincol='#7152F3' timing={200} text="Update" fct={Update} />
            </div>}
            {!inputDisble && <div className=' absolute   top-[88%] right-[13%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#eee]   ' >
                <ButtonCancel text="Cancel" fct={Cancel} />
            </div>}

        </div>
    )
}

export default Prof
