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
import { IoTodaySharp } from "react-icons/io5";
import { CheckboxGroup } from '@/app/(components)/Inputs/checkbox';
import axios from 'axios';
import { FiLock, FiUnlock } from "react-icons/fi";
import { HiOutlineFingerPrint } from "react-icons/hi";
import { LiaUserLockSolid, LiaUserShieldSolid } from "react-icons/lia";
import { CiMail } from "react-icons/ci";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import toast, { Toaster } from 'react-hot-toast';
import { FaArrowLeftLong } from "react-icons/fa6";
import { PiPencilSimpleLineLight } from "react-icons/pi";


const CompanySettings = () => {
    const dispatch = useDispatch<AppDispatch>()
    const [fileName, setFileName] = useState('');
    const [base64, setBase64] = useState('' as any); // State to store the base64 string of the selected file
    
    const errors = useSelector((state: any) => state.errors);

    const company = useSelector((state: any) => state.company);
    const [workingDays, setWorkingDays] = useState(company.workingdays);
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
    const [editcompanyinfo , setEditCompanyInfo] = useState(false);
    const [pwdVisible , setPwdVisible] = useState(false);

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
        setFileName('');
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
                return toast.error('Please select a valid image file (jpg, jpeg, png)');
            }

            const maxSizeInBytes = 10 * 1024 * 1024; // wanna max 1.5mb
            if (file.size > maxSizeInBytes) {
                return toast.error('File size exceeds 1.5MB');
            }

        }
    };

  const permission = useSelector((state: any) => state.permission)

   const update = () => {
    dispatch(UpdateCompany({ workingdays:workingDays,name, phonenumber:number, domaine:industry, anniversaire:anniversary,adress,city, country, zip, logo: fileName ? base64 : ""}));
   }

   
    




    return (
        <div className="mt-20 flex flex-col ml-5 p-16 ">
       
           
            {permission.editcompanyinfo && 
                <button onClick={update} className="self-end bg-blue-500 text-white hover:bg-blue-300 shadow-md rounded-md flex gap-2 h-12 items-center p-4 m-8">
                    <PiPencilSimpleLineLight size={20} />
                    <p className="font-medium">Update</p>
                </button>
            }
            <section className="h-full flex flex-col py-24 gap-20">
                <div id="two_factor" className="flex justify-evenly">
                    <div id="Description">
                        <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <HiOutlinePaintBrush size={25} color="rgb(59 130 246)" />
                        Company Logo
                        </h1>
                        <p className="text-gray-400 text-xs ">
                        Upload your company’s logo here (max. 1MB). <br />
                        We recommend a PNG image with transparent background.
                        </p>
                    </div>
                    <div id="inputs" className="bg-blue-100 rounded-md w-[370px] flex flex-col gap-4 p-8 relative">
                        <label htmlFor="fileInput" className="absolute inset-0 flex justify-center items-center cursor-pointer">
                            <IoCameraOutline className="text-[24px]" />
                            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                        </label>
                        <div className="absolute top-0 text-center">{fileName}</div>
                    </div>
                </div>
                <div id="change_password" className="flex justify-center gap-x-44">
                    <div id="Description">
                        <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <HiOutlineOfficeBuilding size={25} color="rgb(59 130 246)" />
                        General Information
                        </h1>
                        <p className="text-gray-400 text-xs ">
                        Just a bit of info about your company, and the<br />default language your employees will see when invited.
                        </p>
                    </div>
                    <div id="inputs" className="bg-blue-100 rounded-md w-[370px] flex flex-col gap-4 p-8">
                        <div className="mb-3 relative">
                            <label htmlFor="Comany Name" className="block mb-2 text-sm font-medium text-gray-900">
                            Comany Name
                            </label>
                            <input
                                type="text"
                                id="Comany Name"
                                onChange={(e:any) => {setName(e.target.value)}}
                                value={name}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.name && <div className="h-[30px] flex items-center p-4 text-sm font-semibold text-red-500" role="alert">{errors.name}</div>}
                        </div>
                        <div className="mb-3 relative">
                            <label htmlFor="Comany Phone Number" className="block mb-2 text-sm font-medium text-gray-900">
                                Comany Phone Number
                            </label>
                            <input
                                type="text"
                                id="Comany Phone Number"
                                value={number}
                                onChange={(e:any) => {setNumber(e.target.value)}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.phonenumber && <div className="h-[30px] flex items-center p-4 text-sm font-semibold text-red-500" role="alert">{errors.phonenumber}</div>}
                        </div>
                        <div className="mb-3 relative">
                            <label htmlFor="indestry" className="block mb-2 text-sm font-medium text-gray-900">
                                Indestry
                            </label>
                            <select 
                            id="indestry" 
                            value={industry}
                            onChange={(e:any) => {setIndustry(e.target.value)}}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg block w-full p-2.5"
                            >
                                <option value="other">Other</option>
                                <option value="Industry">Industry</option>
                                <option value="Public Administration">Public Administration</option>
                                <option value="Agriculture">Agriculture</option>
                                <option value="Food, Beverage & Tobacco">Food, Beverage & Tobacco</option>
                                <option value="Automotive & Components">Automotive & Components</option>
                                <option value="Aerospace & Defense">Aerospace & Defense</option>
                                <option value="Banking & Insurance">Banking & Insurance</option>
                                <option value="Durable Goods & Apparel">Durable Goods & Apparel</option>
                                <option value="Construction & Engineering">Construction & Engineering</option>
                                <option value="Containers & Packaging">Containers & Packaging</option>
                                <option value="Roofing & Medical Services">Roofing & Medical Services</option>
                                <option value="Distribution">Distribution</option>
                                <option value="Food Distribution & Staples">Food Distribution & Staples</option>
                                <option value="Manufacturing">Manufacturing</option>
                                <option value="Diversified Finance">Diversified Finance</option>
                                <option value="Hospitality">Hospitality</option>
                                <option value="Real Estate">Real Estate</option>
                                <option value="Internet & Direct Business Marketing">Internet & Direct Business Marketing</option>
                                <option value="Software & IT Services">Software & IT Services</option>
                                <option value="Machinery">Machinery</option>
                                <option value="Merchandise">Merchandise</option>
                                <option value="Hardware & Technology Equipment">Hardware & Technology Equipment</option>
                                <option value="Military">Military</option>
                                <option value="Media & Entertainment">Media & Entertainment</option>
                                <option value="Metals & Mining">Metals & Mining</option>
                                <option value="Non-Profit Organization Profit">Non-Profit Organization Profit</option>
                                <option value="Chemicals">Chemicals</option>
                                <option value="Pharmaceuticals & Biotechnology">Pharmaceuticals & Biotechnology</option>
                                <option value="Semiconductors">Semiconductors</option>
                                <option value="Customer Service">Customer Service</option>
                                <option value="Business & Professional Services">Business & Professional Services</option>
                                <option value="Legal Services">Legal Services</option>
                                <option value="Public Services">Public Services</option>
                                <option value="Research & Consulting Services">Research & Consulting Services</option>
                                <option value="Trading Companies & Distributors">Trading Companies & Distributors</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Telecommunications">Telecommunications</option>
                                <option value="Travel & Tourism">Travel & Tourism</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>
                        <div className="mb-3 relative">
                            <label htmlFor="anniversary" className="block mb-2 text-sm font-medium text-gray-900">
                                Anniversary
                            </label>
                            <input
                                type="date"
                                id="anniversary"
                                value={anniversary}
                                onChange={(e:any) => {setAnniversary(e.target.value)}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </div>
                    </div>
                </div>
                <div id="change_password" className="flex justify-center gap-x-64">
                    <div id="Description">
                        <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <FaMapMarkerAlt size={25} color="rgb(59 130 246)" />
                            Address
                        </h1>
                        <p className="text-gray-400 text-xs ">
                            Fill in the legal address of the company.
                        </p>
                    </div>
                    <div id="inputs" className="bg-blue-100 rounded-md w-[370px] flex flex-col gap-4 p-8">
                        <div className="mb-3 relative">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                            Address
                            </label>
                            <input
                                type="text"
                                id="address"
                                onChange={(e:any) => {setAdress(e.target.value)}}
                                 value={adress}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.adress && <div className="h-[30px] flex items-center p-4 text-sm font-semibold text-red-500" role="alert">{errors.adress}</div>}
                        </div>
                        <div className="mb-3 relative">
                            <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-900">
                            City
                            </label>
                            <input
                                type="text"
                                id="city"
                                value={city}
                                onChange={(e:any) => {setCity(e.target.value)}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.city && <div className="h-[30px] flex items-center p-4 text-sm font-semibold text-red-500" role="alert">{errors.city}</div>}
                        </div>
                        <div className="mb-3 relative">
                            <label htmlFor="zipcode" className="block mb-2 text-sm font-medium text-gray-900">
                            Zip Code
                            </label>
                            <input
                                type="text"
                                id="zipcode"
                                value={zip}
                                onChange={(e:any) => {setZip(e.target.value)}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.zip && <div className="h-[30px] flex items-center p-4 text-sm font-semibold text-red-500" role="alert">{errors.zip}</div>}
                        </div>
                        <div className="mb-3 relative">
                            <label htmlFor="country" className="block mb-2 text-sm font-medium text-gray-900">
                            Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                value={country}
                                onChange={(e:any) => {setCountry(e.target.value)}}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                            {errors.country && <div className="h-[30px] flex items-center p-4 text-sm font-semibold text-red-500" role="alert">{errors.country}</div>}
                        </div>
                    </div>
                </div>
                <div id="change_password" className="flex justify-center gap-x-64">
                    <div id="Description">
                        <h1 className="font-bold text-xl flex items-baseline gap-2 mb-4">
                        <IoTodaySharp size={25} color="rgb(59 130 246)" />
                        Working Days
                        </h1>
                        <p className="text-gray-400 text-xs ">
                        Put your company working days.
                        </p>
                    </div>
                    <div id="inputs" className="bg-blue-100 rounded-md w-[370px] flex flex-col gap-4 p-8">
                            <label htmlFor="address" className="block mb-2 text-sm font-medium text-gray-900">
                            Working Days
                            </label>
                            <CheckboxGroup
                                options={[
                                    'Monday',
                                    'Tuesday',
                                    'Wednesday',
                                    'Thursday',
                                    'Friday',
                                    'Saturday',
                                    'Sunday',
                                ]}
                                value={workingDays} // Provide the selected absences
                                name="workingdays" // Provide a unique name for the checkbox group
                                onChange={(selectedOptions: string[]) => setWorkingDays(selectedOptions)} // Pass the selected options directly
                                label=" "
                            />
                    </div>
                </div>
            </section>

            {/* <section className='flex justify-between'>
                <div className='flex flex-col justify-center items-center h-[200px] w-[350px] bg-[#eee] rounded-[36px] hover:cursor-pointer'>
                    <FaPen className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Company Logo</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Upload your company logo here</p>
                </div>
                <div className="relative translate-x-[-160px]  w-[350px] h-[200px] flex justify-center items-center rounded-[36px] border-[1px] bg-[#eee]">
                    <label htmlFor="fileInput" className="absolute inset-0 flex justify-center items-center cursor-pointer">
                        <IoCameraOutline className="text-[24px]" />
                        <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
                    </label>
                    <div className="absolute bottom-0 w-full text-center">{fileName}</div>
                </div>
            </section> */}
            {/* <section className='flex flex-row justify-between mb-[30px]'>
                <div className='flex flex-col justify-center items-center h-[200px] w-[350px]    bg-[#eee] rounded-[36px] hover:cursor-pointer'>
                    <IoMdSettings className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>General Information</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Put your company information</p>
                </div>
                <div className="border-[#7152F3] p-4 flex flex-col translate-x-[-160px]  w-[350px] justify-center items-center rounded-[36px] border-[1px] ">
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
            </section> */}
            {/* <div className='flex flex-row justify-between mb-[30px]'>
                <div className='flex flex-col justify-center items-center h-[200px] w-[350px]    bg-[#eee] rounded-[36px] hover:cursor-pointer'>
                    <FaMapMarkerAlt  className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Adress</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Put your company adress</p>
                </div>
                <div className="border-[#7152F3] p-4 flex-col translate-x-[-160px] w-[350px]  flex justify-center items-center rounded-[36px] border-[1px]">
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




              


            </div> */}
            {/* <div className='flex flex-row justify-between mb-[30px]'>
                <div className='flex flex-col justify-center items-center h-[200px] w-[350px]    bg-[#eee] rounded-[36px] hover:cursor-pointer'>
                    <IoTodaySharp  className='text-[24px] text-[#7152F3] mb-4' />
                    <h2 className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>Working Days</h2>
                    <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Put your company working days</p>
                </div>
                <div className="border-[#7152F3] p-4 flex-col      translate-x-[-160px]  w-[350px]  flex justify-center items-center rounded-[36px] border-[1px] "> 
                <div style={{ marginRight: '100px' }} className={styles.inputContainer}>
                    <CheckboxGroup
                    options={[
                        'Monday',
                        'Tuesday',
                        'Wednesday',
                        'Thursday',
                        'Friday',
                        'Saturday',
                        'Sunday',
                    ]}
                    value={workingDays} // Provide the selected absences
                    name="workingdays" // Provide a unique name for the checkbox group
                    onChange={(selectedOptions: string[]) => setWorkingDays(selectedOptions)} // Pass the selected options directly
                    label="Working Days"
                    />
                </div>
            </div>




              


            </div> */}
        </div>

    )
}

export default CompanySettings