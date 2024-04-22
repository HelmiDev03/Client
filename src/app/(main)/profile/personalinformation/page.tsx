'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button'
import {Input4} from '@/app/(components)/Inputs/TextInput'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { SelectInput2 } from '@/app/(components)/Inputs/SelectInput'
import ButtonCancel from '@/app/(components)/ButtonCancel/Button'
import styles from '../profile.module.css'
import { AppDispatch } from '@/redux/store'
import { EditPersonalInformation } from '@/redux/actions/userActions/editAction'
import {  Modal } from 'flowbite-react';
import { MdSecurityUpdateGood } from 'react-icons/md'
import { PiPencilSimpleLineLight } from 'react-icons/pi'

const Personnel = () => {
    const dispatch = useDispatch<AppDispatch>()
    const closeModel = () => {
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
    }


    const errors = useSelector((state: any) => state.errors)
    const success = useSelector((state: any) => state.success)
    const auth  = useSelector((state: any) => state.auth)
    const [inputDisble , setInputDisable] = useState(true)
    const [firstname, setFirstname] = useState(auth.user.firstname)
    const [lastname, setLastname] = useState(auth.user.lastname)
    const [phonenumber, setPhonenumber] = useState(auth.user.phonenumber)
    const birthdayValue = auth.user.dateofbirth ? new Date(auth.user.dateofbirth) : null;
    const birthdayString = birthdayValue ? birthdayValue.toISOString().split('T')[0] : '';
    const [birthday, setBirthday] = useState(birthdayString);
    const [maritalstatus, setMaritalstatus] = useState(auth.user.maritalstatus)
    const [gender , setGender] = useState(auth.user.state)
    const [country, setCountry] = useState(auth.user.country)
    const [adress, setAdress] = useState(auth.user.adress)
    const [city, setCity] = useState(auth.user.city)
    const [postalcode, setPostalcode] = useState(auth.user.postalcode)
   
    const edit = () => {setInputDisable(!inputDisble) }

    const Cancel=()=>{
        //reset all state with their iitiail state wich is the user data
        setFirstname(auth.user.firstname)
        setLastname(auth.user.lastname)
        setPhonenumber(auth.user.phonenumber)
        setBirthday(auth.user.birthday)
        setMaritalstatus(auth.user.maritalstatus)
        setGender(auth.user.state)
        setCountry(auth.user.country)
        setAdress(auth.user.adress)
        setCity(auth.user.city)
        setPostalcode(auth.user.postalcode)
        setInputDisable(!inputDisble)
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
        dispatch(EditPersonalInformation(data))
        setInputDisable(!inputDisble)
       
    }
    return (
        <div className="h-full py-14 px-12 flex flex-col" >
            <Modal className ='absolute w-[400px] translate-x-[520px] translate-y-[20px] center rounded-[25px] ' show={success.message!=''}  onClose={ closeModel} size="md"  popup>
                <Modal.Header />
                <Modal.Body className=''>
                <div className="text-center">
                    <MdSecurityUpdateGood  className="mx-auto mb-4 h-14 w-14 text-[#ffffff] " />
                    <h3 className="mb-5 text-lg font-normal  text-[#ffffff] dark:text-gray-400">Successfully Updated</h3>
                    <div className="flex justify-center gap-4">
                    </div>
                </div>
                </Modal.Body>
            </Modal>
            <button onClick={edit} className="absolute top-[25%] right-[5%] bg-blue-500 text-white hover:bg-blue-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8">
                <PiPencilSimpleLineLight size={20} />
                <p className="font-medium">Edit Profile</p>
            </button>
            <section className="flex gap-12 pb-4">
              <div className="mb-3 w-full">
                <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900">
                  First Name
                </label>
                <input
                  type="text"
                  id="first_name"
                  value={firstname}
                  onChange={(e:any) => {setFirstname(e.target.value)}}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={inputDisble}
                />
                {errors.firstname && <div className="h-[30px] w-full flex items-center p-4 text-sm text-red-500" role="alert">
                    {errors.firstname}
                </div>}
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900">
                  Last Name
                </label>
                <input
                  type="text"
                  id="last_name"
                  value={lastname}
                  onChange={(e:any)=>setLastname(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={inputDisble}
                />
                {errors.lastname && <div className="h-[30px] w-full flex items-center p-4 text-sm text-red-500" role="alert">
                    {errors.lastname}
                </div>}
              </div>
            </section>
            <section className="flex gap-12 pb-4">
                <div className="mb-3 w-full">
                    <label htmlFor="mobile" className="block mb-2 text-sm font-medium text-gray-900">
                    Mobile Number
                    </label>
                    <input
                    type="text"
                    id="mobile"
                      value={phonenumber}
                      onChange={(e:any)=>setPhonenumber(e.target.value)}
                    maxLength={8}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled={inputDisble}
                    />
                    {errors.phonenumber && <div className="h-[30px] w-full flex items-center p-4 text-sm text-red-500" role="alert">
                    {errors.phonenumber}
                </div>}
                </div>
                <div className="mb-3 w-full">
                    <label htmlFor="cin" className="block mb-2 text-sm font-medium text-gray-900">
                    CIN
                    </label>
                    <input
                    type="text"
                    id="cin"
                    value={auth.user.cin }
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled
                    />
                </div>
            </section>
            <section className="flex gap-12 pb-4">
              <div className="mb-3 w-full">
                <label htmlFor="birth" className="block mb-2 text-sm font-medium text-gray-900">
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="birth"
                  value={birthday}
                  onChange={(e:any)=>setBirthday(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={inputDisble}
                />
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="matrialstatus" className="block mb-2 text-sm font-medium text-gray-900">
                  Marital Status
                </label>
                <SelectInput2
                   placeholder={auth.user.maritalstatus ? auth.user.maritalstatus : 'not mentionned'}
                    options={['Single', 'Married', 'Divorced', ]}
                    isDisabled={inputDisble}
                    onChange={(e:any) => setMaritalstatus(e.target.value)}
                />
              </div>
            </section>
            <section className="flex gap-12 pb-4">
              <div className="mb-3 w-full">
                <label htmlFor="gender" className="block mb-2 text-sm font-medium text-gray-900">
                  Gender
                </label>
                <SelectInput2
                    placeholder={auth.user.gender ? auth.user.gender : 'not mentionned'}
                    options={['Male', 'Female']}
                    isDisabled={inputDisble}
                    onChange={(e:any)=>setGender(e.target.value)} 
               
                />
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                    Country
                </label>
                <input
                  type="text"
                  id="address"
                    value={country}
                    onChange={(e:any)=>setCountry(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    disabled={inputDisble}
                />
              </div>
            </section>
            <section className="flex gap-12 pb-4">
              <div className="mb-3 w-full">
                <label htmlFor="Address" className="block mb-2 text-sm font-medium text-gray-900">
                Address
                </label>
                <input
                  type="text"
                  id="Address"
                  value={adress}
                  onChange={(e:any)=>setAdress(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={inputDisble}
                />
                {errors.adress && <div className="h-[30px] w-full flex items-center p-4 text-sm text-red-500" role="alert">
                    {errors.adress}
                </div>}
              </div>
              <div className="mb-3 w-full">
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                  City
                </label>
                <input
                  type="text"
                  id="city"
                  value={city}
                  onChange={(e:any)=>setCity(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={inputDisble}
                />
                {errors.city && <div className="h-[30px] w-full flex items-center p-4 text-sm text-red-500" role="alert">
                    {errors.city}
                </div>}
              </div>
            </section>
            <section className="flex gap-12 pb-4">
              <div className="mb-3 w-full">
                <label htmlFor="Postal Code" className="block mb-2 text-sm font-medium text-gray-900">
                Postal Code
                </label>
                <input
                  type="text"
                  id="Postal Code"
                  value={postalcode}
                  onChange={(e:any)=>setPostalcode(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  disabled={inputDisble}
                />
                {errors.postalcode && <div className="h-[30px] w-full flex items-center p-4 text-sm text-red-500" role="alert">
                    {errors.postalcode}
                </div>}
              </div>
            </section>
            { !inputDisble && 
            <div className="flex gap-4 self-end mt-4">
                <button onClick={Cancel} className="bg-gray-200 hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                        <p className="font-medium">Cancel</p>
                </button>
                <button onClick={Update} className="bg-pink-500 text-white hover:bg-pink-300 shadow-md rounded-md flex h-12 items-center p-4">
                    <p className="font-medium">Update information</p>
                </button>
            </div>            
            }
        </div>
        
    )
}

export default Personnel