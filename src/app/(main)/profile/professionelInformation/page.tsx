'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import ButtonCancel from '@/app/(components)/ButtonCancel/Button'
import { Input4 } from '@/app/(components)/Inputs/TextInput'
import DateInput from '@/app/(components)/Inputs/DateInput'
import { SelectInput2, SelectInput22, SelectInput222 } from '@/app/(components)/Inputs/SelectInput'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styles from '../profile.module.css'
import axios from 'axios'

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
    
    const [manager, setManager] = useState<{ firstname: string, lastname: string, profilepicture: string }>({ firstname: '', lastname: '', profilepicture: '' });


    useEffect(() => {
        axios.get(process.env.NEXT_PUBLIC_DOMAIN+`/api/employees/employee/${auth.user.manager}`)
            .then((res:any) => {
               
                setManager({firstname: res.data.employee.firstname, lastname: res.data.employee.lastname, profilepicture: res.data.employee.profilepicture})
                //exclude manager from all managers
                
                
            })
            .catch((err) => {
                setManager({firstname: 'No Manager Yet', lastname: '', profilepicture: ''})
            })
    }, [])


    return (
        <div className=" flex flex-row flex-wrap " >
          

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

            <div style={{position : 'relative'}} className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Manager</h3>
                <img src={manager.profilepicture ? manager.profilepicture : '/defaultprofilepicture.png'} className='absolute w-[40px] h-[40px] translate-x-[260px] translate-y-[30px] rounded-[50%] ' />
                <SelectInput222
                    
                    placeholder={manager.firstname + ' ' + manager.lastname }
                    options={[{label: manager.firstname + ' ' + manager.lastname, value: auth.user.manager}]}
                   
                   
                  
                />
            </div>


            

        </div>
    )
}

export default Prof
