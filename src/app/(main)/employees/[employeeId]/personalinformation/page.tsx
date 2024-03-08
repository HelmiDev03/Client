
'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import {Input4} from '@/app/(components)/Inputs/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { SelectInput2 } from '@/app/(components)/Inputs/SelectInput'
import ButtonCancel from '@/app/(components)/ButtonCancel/Button'
import styles from '@/app/(main)/profile/profile.module.css'
import { AppDispatch } from '@/redux/store'
import {  Modal } from 'flowbite-react';
import { MdSecurityUpdateGood } from 'react-icons/md'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import axios from 'axios'
const Personnel = () => {
    const [openModal, setOpenModal] = useState(false);
    const { employeeId } = useParams()
    const dispatch = useDispatch<AppDispatch>()
    const closeModel = () => {
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
    }



    const errors = useSelector((state: any) => state.errors)
    const success = useSelector((state: any) => state.success)
  
    const [inputDisble , setInputDisable] = useState(true)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [phonenumber, setPhonenumber] = useState('')
    const [cin , setCin] = useState('')
 
    const [birthday, setBirthday] = useState('');
    const [maritalstatus, setMaritalstatus] = useState('')
    const [gender , setGender] = useState('')
    const [country, setCountry] = useState('')
    const [adress, setAdress] = useState('')
    const [city, setCity] = useState('')
    const [postalcode, setPostalcode] = useState('')
   
    const edit = () => {setInputDisable(!inputDisble) }

    const Cancel=()=>{
        //reset all state with their iitiail state wich is the data i got from useeffect
        
    
     
        dispatch({
            type: 'ERRORS',
            payload: {}
        });
    }


    
    const Update = () => {
        
        dispatch({
            type: 'ERRORS',
            payload: {}
        });
        const data = {
            firstname,
            lastname,
            phonenumber,
            birthday,
            maritalstatus,
            gender,
            country,
            adress,
            city,
            postalcode,
        }
       
        setInputDisable(!inputDisble)
       
    }

    



           useEffect(() => {


                axios.get(`http://localhost:5000/api/employees/employee/${employeeId}`)
                .then((res) => {
                    console.log(res.data)
                    setFirstname(res.data.employee.firstname)
                    setLastname(res.data.employee.lastname)
                    setPhonenumber(res.data.employee.phonenumber)
                    setCin(res.data.employee.cin)
                    const birthdayValue = res.data.employee.dateofbirth ? new Date(res.data.employee.dateofbirth) : null;
                    const birthdayString = birthdayValue ? birthdayValue.toISOString().split('T')[0] : '';
                    setBirthday(birthdayString)
                    setMaritalstatus(res.data.employee.maritalstatus)
                    setGender(res.data.employee.gender)
                    setCountry(res.data.employee.country)
                    setAdress(res.data.employee.adress)
                    setCity(res.data.employee.city)
                    setPostalcode(res.data.employee.postalcode)


                })







           })











    return (
        
        <div className="flex flex-row flex-wrap " >
             
            <Modal className ='absolute w-[400px] translate-x-[520px] center rounded-[25px] ' show={success.message!=''}  onClose={ closeModel} size="md"  popup>
        <Modal.Header />
        <Modal.Body className='bg-lavender '>
          <div className="text-center">
            <MdSecurityUpdateGood  className="mx-auto mb-4 h-14 w-14 text-[#7152F3] " />
            <h3 className="mb-5 text-lg font-normal  text-[#7152F3] dark:text-gray-400">
                        Successfully Updated
            </h3>
            <div className="flex justify-center gap-4">
            
            </div>
          
          </div>
        </Modal.Body>
      </Modal>

            <div className=' absolute   top-[25%] right-[6%]   top-[-50%] right-[5%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit timing={200} text="Edit" fct={edit} />
            </div>
        
           

            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>First Name</h3>
                <Input4 onChange={(e:any) => {setFirstname(e.target.value)}} isDisabled={true} value={firstname} type='text'      />
                {errors.firstname && <div className=" h-[30px] w-[330px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                       {errors.firstname}
                            </div>
                        </div>}
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Last Name</h3>
                <Input4 onChange={(e:any)=>setLastname(e.target.value)}   isDisabled={true} value={lastname} type='text'      />
                {errors.lastname  && <div className=" h-[30px] w-[330px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                       {errors.lastname}
                            </div>
                        </div>}
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Phone Number</h3>
                <Input4 onChange={(e:any)=>setPhonenumber(e.target.value)}   isDisabled={true} value={phonenumber} type='text'      />
                {errors.phonenumber  && <div className=" h-[30px] w-[330px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                       {errors.phonenumber}
                            </div>
                        </div>}
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Cin</h3>
                <Input4  isDisabled={true} value={cin } type='text'      />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Date Of Birth</h3>
                <Input4 onChange={(e:any)=>setBirthday(e.target.value)}  isDisabled={true}  value={birthday} type='date'      />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Marital Status</h3>
                <SelectInput2
                   placeholder={maritalstatus ? maritalstatus : 'not mentionned'}
                    options={['Single', 'Married', 'Divorced', ]}
                    isDisabled={true}
                    onChange={(e:any) => setMaritalstatus(e.target.value)}
                />
                </div>
                <div className={styles.InputContainer}>
                    <h3 className={styles.InputLabel}>Gender</h3>
                    <SelectInput2
                    placeholder={gender ? gender : 'not mentionned'}
                    options={['Male', 'Female']}
                    isDisabled={true}
                  onChange={(e:any)=>setGender(e.target.value)} 
               
            />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Country</h3>
                <Input4 onChange={(e:any)=>setCountry(e.target.value)}  isDisabled={true} value={country} type='text'      />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Adress</h3>
                <Input4  onChange={(e:any)=>setAdress(e.target.value)}  isDisabled={true} value={adress} type='text'      />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>City</h3>
                <Input4 onChange={(e:any)=>setCity(e.target.value)}  isDisabled={true}  value={city} type='text'      />
            </div>
            <div className={styles.InputContainer}>
                <h3 className={styles.InputLabel}>Postal Code</h3>
                <Input4 onChange={(e:any)=>setPostalcode(e.target.value)}   isDisabled={true} value={postalcode} type='text'      />
            </div>
            { !inputDisble &&  <div className=' absolute   top-[145%] right-[5%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit timing={200} text="Update" fct={Update} />
            </div> }
            { !inputDisble &&   <div className= ' absolute   top-[145%] right-[13%]     w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#eee]   ' >
                <ButtonCancel text="Cancel" fct={Cancel} />
            </div>}
           
        </div>
        
    )
}

export default Personnel
