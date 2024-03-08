'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import ButtonCancel from '@/app/(components)/ButtonCancel/Button'
import { Input4 } from '@/app/(components)/Inputs/TextInput'
import DateInput from '@/app/(components)/Inputs/DateInput'
import { SelectInput2 } from '@/app/(components)/Inputs/SelectInput'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '@/app/(main)/profile/profile.module.css'
import axios from 'axios'
import { useParams } from 'next/navigation'

const Prof = () => {
    
    const [inputDisble, setInputDisable] = useState(true)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [matricule, setMatricule] = useState('')
    const { employeeId } = useParams()
    const [createdAt, setCreatedAt] = useState('');
    const edit = () => { setInputDisable(!inputDisble) }
    const Update = () => { }
    const Cancel = () => { }

    useEffect(() => {


        axios.get(`http://localhost:5000/api/employees/employee/${employeeId}`)
            .then((res) => {

                setEmail(res.data.employee.email)
                setRole(res.data.employee.role)
                setMatricule(res.data.employee.matricule)

                const createdAtValue = res.data.employee.createdAt ? new Date(res.data.employee.createdAt) : null;
                const createdAtString = createdAtValue ? createdAtValue.toISOString().split('T')[0] : '';
                setCreatedAt(createdAtString)




            })

    })

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
                <h3 className={styles.InputLabel}>Role</h3>

                <SelectInput2
                    placeholder={role}
                    options={['Admin', 'Manager', 'Employee']}
                    isDisabled={true}

                />
            </div>
            <div className={styles.InputContainer}>
                <h3 className=" font-lexend font-light  text-[14px] leading-[22px] text-[#A2A1A8] mb-1">Joining Date</h3>

                <DateInput value={createdAt} type='date' isDisabled={true} />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Matricule</h3>
                <Input4 isDisabled={inputDisble} value={matricule} type='text' />
            </div>


            {!inputDisble && <div className=' absolute   top-[81%] right-[5%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit spincol='#7152F3' timing={200} text="Update" fct={Update} />
            </div>}
            {!inputDisble && <div className=' absolute   top-[81%] right-[13%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#eee]   ' >
                <ButtonCancel text="Cancel" fct={Cancel} />
            </div>}

        </div>
    )
}

export default Prof
