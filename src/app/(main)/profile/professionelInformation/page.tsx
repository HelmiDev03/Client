'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import ButtonCancel from '@/app/(components)/ButtonCancel/Button'
import { Input4 } from '@/app/(components)/Inputs/TextInput'
import DateInput from '@/app/(components)/Inputs/DateInput'
import { SelectInput2 } from '@/app/(components)/Inputs/SelectInput'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../profile.module.css'

const Prof = () => {
    const auth = useSelector((state: any) => state.auth)
    const [inputDisble, setInputDisable] = useState(true)
    const [email, setEmail] = useState(auth.user.email)
    const [role, setRole] = useState(auth.user.role)
    const [matricule, setMatricule] = useState(auth.user.matricule)
    const createdAtValue = auth.user.createdAt ? new Date(auth.user.createdAt) : null;
    const createdAtString = createdAtValue ? createdAtValue.toISOString().split('T')[0] : '';

    const [createdAt, setCreatedAt] = useState(createdAtString);
    const edit = () => { setInputDisable(!inputDisble) }
    const Update = () => { }
    const Cancel = () => { }

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
                    placeholder={auth.user.role}
                    options={['Admin', 'Manager', 'Employee']}
                    isDisabled={true}

                />
            </div>
            <div className={styles.InputContainer}>
                <h3 className=" font-lexend font-light  text-[14px] leading-[22px] text-[#A2A1A8] mb-1">Joining Date</h3>

                <DateInput value={auth.user.createdAt} type='date' isDisabled={true} />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Matricule</h3>
                <Input4 isDisabled={inputDisble} value={auth.user.matricule} type='text' />
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
