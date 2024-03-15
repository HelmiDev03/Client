'use client'
import React, { useEffect, useState } from 'react'
import styles from './page.module.css'
import { IoCameraOutline } from 'react-icons/io5'
import { FaPen } from "react-icons/fa";
import { IoMdSettings } from 'react-icons/io';
import { FaMapMarkerAlt } from "react-icons/fa";
import { Input5 } from '@/app/(components)/Inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { SelectInput7 } from '@/app/(components)/Inputs/SelectInput';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import {  Modal } from 'flowbite-react';
import { MdSecurityUpdateGood } from 'react-icons/md'
import { AppDispatch } from '@/redux/store';
import {UpdateCompany} from '@/redux/actions/companyActions/updateCompany'



const CompanySettings = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [fileName, setFileName] = useState('');
    const [base64, setBase64] = useState('' as any); // State to store the base64 string of the selected file
    const [fileError, setFileError] = useState('');

    const errors = useSelector((state: any) => state.errors);


    const company = useSelector((state: any) => state.company);
    const [name, setName] = useState(company.name);
    const [number, setNumber] = useState(company.phonenumber);
    const [industry, setIndustry] = useState(company.domaine);
    const anniversaryValue = company.anniversaire ? new Date(company.anniversaire) : null;
    const anniversaryString = anniversaryValue ? anniversaryValue.toISOString().split('T')[0] : '';
    const [anniversary, setAnniversary] = useState(anniversaryString);
    const [adress, setAdress] = useState(company.adress);
    const [city, setCity] = useState(company.city);
    const [zip, setZip] = useState(company.zip);
    const [country, setCountry] = useState(company.country);
    const success = useSelector((state: any) => state.success)
    const closeModel = () => {
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
    }
    const convertBase64 = (file: any) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result);
            };

            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleFileChange = async (event: any) => {
        setFileError('');
        const file = event.target.files[0];
        console.log(file);

        setBase64(await convertBase64(file));
        let filename = file.name;
        // Take only the first 10 characters of the file name
        if (file.name.length > 10) {
            filename = file.name.substring(0, 11);
        }
        setFileName(file ? filename : '');
        const allowedExtensions = ['jpg', 'jpeg', 'png',];
        if (fileName) {
            const fileExtension = fileName.split('.').pop()?.toLowerCase() ?? '';
            if (!allowedExtensions.includes(fileExtension)) {
                setFileError('Please select a valid image file (jpg, jpeg, png)');
                return;
            }

            const maxSizeInBytes = 10 * 1024 * 1024; // wanna max 1.5mb
            if (file.size > maxSizeInBytes) {
                setFileError('File size exceeds 1.5MB');
                return;
            }

        }
    };



   const update = () => {
    dispatch(UpdateCompany({ name, phonenumber:number, domaine:industry, anniversaire:anniversary,adress,city, country, zip, logo: fileName ? base64 : ""}));
   }

   





    return (
        <div className={styles.container}>
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

            <div className='flex flex-row justify-between mb-[30px]'>
                <div className='flex flex-col justify-center items-center h-[200px] w-[350px]    bg-[#dedede] rounded-[36px] hover:cursor-pointer'>
                    <FaPen className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Company Logo</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Upload your company logo here</p>
                </div>

                <div className="relative translate-x-[-160px]  w-[350px] h-[200px] flex justify-center items-center rounded-[36px] border-[1px] bg-[#dedede]">
                    <label htmlFor="fileInput" className="absolute inset-0 flex justify-center items-center cursor-pointer">
                        <IoCameraOutline className="text-[24px]" />
                        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                    </label>
                    <div className="absolute bottom-0 w-full text-center">{fileName}</div>

                </div>
            </div>


            <div className='flex flex-row justify-between mb-[30px]'>


                <div className='flex flex-col justify-center items-center h-[200px] w-[350px]    bg-[#dedede] rounded-[36px] hover:cursor-pointer'>
                    <IoMdSettings className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>General Information</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Put your company information</p>
                </div>

                <div className="border-[#7152F3] p-4 flex flex-col      translate-x-[-160px]  w-[350px]  flex justify-center items-center rounded-[36px] border-[1px] ">

                    <div className={styles.inputContainer}>
                        <Input5  onChange={(e:any) => {setName(e.target.value)}}  value={name} label="Comany Name" type="text" />
                        {errors.name && <div className=" h-[30px] mb-4  w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {errors.name}
                            </div>
                        </div>}
                    </div>
                    <div className={styles.inputContainer}>
                        <Input5  onChange={(e:any) => {setNumber(e.target.value)}}  value={number} label="Comany Phone Number" type="text" />
                        {errors.phonenumber && <div className=" h-[30px] mb-4  w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {errors.phonenumber}
                            </div>
                        </div>}
                    </div>


                    <div className={styles.inputContainer}>
                        <SelectInput7
                         onChange={(e:any) => {setIndustry(e.target.value)}}
                            label="Industry"
                            placeholder={industry}
                            options={[
                                'Administration Publique',
                                'Agriculture',
                                'Alimentation, Boissons & Tabac',
                                'Automobiles & Composants',
                                'Autre',
                                'Aérospatial & Défense',
                                'Banque & Assurance',
                                'Biens Durables & Habillement',
                                'Construction & Ingénierie',
                                'Contenants & Emballages',
                                'Couverture & Services Médicaux',
                                'Distribution',

                                'Fabrication',
                                'Finances Diversifiées',
                                'Hôtellerie',
                                'Immobilier',
                                'Internet & Marketing Commercial Direct',
                                'Logiciels & Services Informatiques',
                                'Machinerie',
                                'Marchandises',
                                'Matériel & Equipement Technologique',
                                'Militaire',
                                'Médias & Divertissements',
                                'Métaux & Activité minière',
                                'Organisation à But Non Lucratif',
                                'Produits Chimiques',
                                'Produits pharmaceutiques et biotechnologie',
                                'Semi-conducteurs',
                                'Service Client',
                                'Services Commerciaux & Professionnels',
                                'Services Juridiques',
                                'Services Publics',
                                'Services de Recherche & de Conseil',
                                'Sociétés Commerciales & Distributeurs',
                                'Transport',
                                'Télécommunications',
                                'Voyages & Tourisme',
                                'Education'
                            ]}


                        />
                    </div>

                    <div className={styles.inputContainer}>

                        <Input5  onChange={(e:any) => {setAnniversary(e.target.value)}} value={anniversary} label="Anniversary" type="date" />

                    </div>





                </div>







            </div>







            <div className='flex flex-row justify-between mb-[30px]'>


                <div className='flex flex-col justify-center items-center h-[200px] w-[350px]    bg-[#dedede] rounded-[36px] hover:cursor-pointer'>
                    <FaMapMarkerAlt  className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Adress</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Put your company adress</p>
                </div>

                <div className="border-[#7152F3] p-4 flex flex-col      translate-x-[-160px]  w-[350px]  flex justify-center items-center rounded-[36px] border-[1px] ">

                    <div className={styles.inputContainer}>
                        <Input5  onChange={(e:any) => {setAdress(e.target.value)}} value={company.adress} label="Adress" type="text" />
                    
                        {errors.adress && <div className=" h-[30px] mb-4  w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {errors.adress}
                            </div>
                        </div>}
                    </div>


                    <div className={styles.inputContainer}>
                        <Input5   onChange={(e:any) => {setCity(e.target.value)}} value={company.city} label="City" type="text" />
                        {errors.city && <div className=" h-[30px] mb-4  w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {errors.city}
                            </div>
                        </div>}
                    </div>

                    <div className={styles.inputContainer}>
                        <Input5  onChange={(e:any) => {setZip(e.target.value)}} value={company.zip} label="Zip Code" type="text" />
                        {errors.zip && <div className=" h-[30px] mb-4  w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {errors.zip}
                            </div>
                        </div>}
                    </div>
                    <div className={styles.inputContainer}>
                        <Input5  onChange={(e:any) => {setCountry(e.target.value)}} value={company.country} label="Country" type="text" />
                        {errors.country && <div className=" h-[30px] mb-4  w-[300px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50  " role="alert">
                            <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                            </svg>
                            <span className="sr-only">Info</span>
                            <div>
                                {errors.country}
                            </div>
                        </div>}
                    </div>
                





                </div>




              


            </div>





            <div className=' translate-x-[1050px]   w-[82px] h-[24px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
                <ButtonSubmit timing={200} text="Update" fct={update}  />
            </div> 


                 


        </div>

    )
}

export default CompanySettings
