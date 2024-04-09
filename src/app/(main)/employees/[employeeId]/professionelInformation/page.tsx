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
import {  Modal } from 'flowbite-react';
import { MdSecurityUpdateGood } from 'react-icons/md'
import { useDispatch } from 'react-redux'

const Prof = () => {
    const dispatch = useDispatch()
    const [inputDisble, setInputDisable] = useState(true)
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [matricule, setMatricule] = useState('')
    const { employeeId } = useParams()
    const [createdAt, setCreatedAt] = useState('');

    
    const [allmanagers , setAllManagers] = useState([])
    const [newmanagerid , setNewManagerId] = useState()
    const [manager, setManager] = useState<{ firstname: string, lastname: string, profilepicture: string }>({ firstname: '', lastname: '', profilepicture: '' });
    const edit = () => { setInputDisable(!inputDisble) }
    const Update = () => { 
        
        
        axios.put(process.env.NEXT_PUBLIC_DOMAIN+`/api/employees/updatemanager/${employeeId}/${newmanagerid}`)
        .then((res) => {
            
            dispatch({
                type: 'SUCCESS',
                payload: res.data.message
            });
           
        })

        setInputDisable(!inputDisble)
    }
    const Cancel = () => { window.location.reload() }
    const success = useSelector((state: any) => state.success)
    useEffect(() => {


    const fetchdata = async () => {
       
        await axios.get(process.env.NEXT_PUBLIC_DOMAIN+`/api/permissions/managers`)
        .then((res) => {
            setAllManagers(res.data.managers)
            console.log(res.data.managers)
        })
        axios.get(process.env.NEXT_PUBLIC_DOMAIN+`/api/employees/employee/${employeeId}`)
        .then((res) => {

            setEmail(res.data.employee.email)
            setRole(res.data.employee.role)
            setMatricule(res.data.employee.matricule)
             axios.get(process.env.NEXT_PUBLIC_DOMAIN+`/api/employees/employee/${res.data.employee.manager}`)
            .then((res) => {
               
                setManager({firstname: res.data.employee.firstname, lastname: res.data.employee.lastname, profilepicture: res.data.employee.profilepicture})
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
    },[])
    const closeModel = () => {
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
        window.location.reload()
    }

    return (
        <div className=" flex flex-row flex-wrap " >
              <Modal className ='absolute w-[400px] translate-x-[520px] translate-y-[160px] center rounded-[25px] ' show={success.message!=''}  onClose={ closeModel} size="md"  popup>
        <Modal.Header />
        <Modal.Body className=''>
          <div className="text-center">
            <MdSecurityUpdateGood  className="mx-auto mb-4 h-14 w-14 text-[#ffffff] " />
            <h3 className="mb-5 text-lg font-normal  text-[#ffffff] dark:text-gray-400">
                        Successfully Updated
            </h3>
            <div className="flex justify-center gap-4">
            
            </div>
          
          </div>
        </Modal.Body>
      </Modal>
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
            <div style={{position : 'relative'}} className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Manager</h3>
                <img src={manager.profilepicture ? manager.profilepicture : '/defaultprofilepicture.png'} className='absolute w-[40px] h-[40px] translate-x-[260px] translate-y-[30px] rounded-[50%] ' />
                <SelectInput22
                    
                    placeholder={manager.firstname + ' ' + manager.lastname}
                    options={allmanagers.map((manager: any) => ({
                        label: manager.firstname + ' ' + manager.lastname,
                        value: manager._id
                    }))}
                    onChange={(e:any) => {
                        setNewManagerId(e.target.value);
                        let newmanager = {firstname: '', lastname: '', profilepicture: ''}
                         newmanager = allmanagers.find((manager: any) => manager._id === e.target.value) ?? {firstname: '', lastname: '', profilepicture: ''};
                      
                        setManager({firstname: newmanager.firstname , lastname: newmanager.lastname, profilepicture: newmanager.profilepicture});
                        
                       
                    }}
                  
                />
            </div>
 

            {!inputDisble && <div className=' absolute   top-[91%] right-[5%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit spincol='#7152F3' timing={200} text="Update" fct={Update} />
            </div>}
            {!inputDisble && <div className=' absolute   top-[91%] right-[13%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#eee]   ' >
                <ButtonCancel text="Cancel" fct={Cancel} />
            </div>}

        </div>
    )
}

export default Prof
