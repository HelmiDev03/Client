


'use client'
import { motion } from 'framer-motion';
import styles from './page.module.css'

import { IoArrowBackCircleSharp } from "react-icons/io5";
import { Input3 } from "@/app/(components)/Inputs/TextInput";
import { SelectInput } from "@/app/(components)/Inputs/SelectInput";

import { useEffect, useState } from "react";

import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { TiTick } from "react-icons/ti";

import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';

import 'react-international-phone/style.css';

import { BiErrorCircle } from "react-icons/bi";

import { Registration } from '@/redux/actions/userActions/registerAction';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { ImSpinner8 } from 'react-icons/im';
import { error } from 'console';













const Register = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
   




    const [Page, setPage] = useState("signup1");

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [role, setRole] = useState("");
    const [roleError, setRoleError] = useState("");
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState("");
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState("");
    const [CIN, setCIN] = useState("");
    const [CINError, setCINError] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyNameError, setCompanyNameError] = useState("");
    const [domain, setDomain] = useState("");
    const [domainError, setDomainError] = useState("");

    const [phoneNumber, setPhoneNumber] = useState("");

    const [phoneNumberError, setPhoneNumberError] = useState("");
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);



    const handleEmail = (e: any) => {
        setEmail(e.target.value);

    }
    const handleRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedRole = e.target.value;
        setRole(selectedRole);
    };
    const handleFirstName = (e: any) => {
        setFirstName(e.target.value);


    };
    const handleLastName = (e: any) => {
        setLastName(e.target.value);


    };
    const handleCIN = (e: any) => {
        setCIN(e.target.value);


    };
    const handleCompanyName = (e: any) => {
        setCompanyName(e.target.value);


    };
    const handleDomain = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedDomain = e.target.value;
        setDomain(selectedDomain);
    };
    const handlePhoneNumber = (value: any) => {
        setPhoneNumber(value);

    };

    const handleChangePassword1 = (e: any) => {
        setPassword1(e.target.value);
        // Perform validation here

    };

    const handleChangePassword2 = (e: any) => {
        setPassword2(e.target.value);
        // Perform validation here

    }
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    useEffect(() => {

    }, [role]); // Run the effect whenever the 'role' state changes




  

    const checkflow1 = async () => {
        setEmailError("");
        setRoleError("");
    
        const emailPattern = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
    
        if (!emailPattern.test(email)) {
       
            setEmailError('Invalid Email');
            return ;
        }
    
        if (role === '') {
           
            setRoleError('Invalid Role');
            return ;

        }
    
        try {
            if (emailPattern.test(email)) {
                await axios.post(`http://localhost:5000/api/verifyemail`, { email: email });
                setPage("signup2");
            }
        } catch (err: any) {
            console.log(err.response?.data);
          
            setEmailError('This Email is Already Used By Someone Else');
            return ;
        }
    
       
    }
    
    const checkflow2 = async () => {
        setFirstNameError('');
        setLastNameError('');
        setCINError('');
        const nameRegex = /^[a-zA-Z]{4,}$/
        const cinRegex = /^\d{8}$/;
        if (!nameRegex.test(firstName)) {
            setFirstNameError('Invalid First Name');
            return;
        }
        if (!nameRegex.test(lastName)) {
            setLastNameError('Invalid Last Name');
            return;
        }
        if (!cinRegex.test(CIN)) {
            setCINError('Invalid CIN');
            return;
        }
        try {
            await axios.post(`http://localhost:5000/api/verifycin`, { cin: CIN });
            setPage("signup3");
        } catch (err: any) {
            console.log(err.response?.data);
            setCINError('this CIN is used by someone else');
            return;
        }


    }

    const checkflow3 = async () => {
        setCompanyNameError('');
        setDomainError('');
        setPhoneNumberError('');
        const nameRegex = /^[a-zA-Z]{4,}$/
        const phoneNumberRegex = /^\+\d{2,4}\d{9,}$/


        if (domain == '') {
            setDomainError('Invalid Domain');
            return;
        }
        if (!nameRegex.test(companyName)) {
            setCompanyNameError('Invalid Company Name');
            return;
        }
        if (!phoneNumberRegex.test(phoneNumber)) {
            setPhoneNumberError('Invalid Phone Number');
            return;
        }
        try {

            await axios.post(`http://localhost:5000/api/verifyphone`, { phonenumber: phoneNumber.trim() });
            setPage("signup4");
        } catch (err: any) {
            console.log(err.response?.data);
            setPhoneNumberError('this Phone number is already used by other company');
            return;
        }

    }

    const checkflow4 = () => {
        if (
            password1.length < 12 ||
            !/[A-Z]/.test(password1) ||
            !/[a-z]/.test(password1) ||
            !/\d/.test(password1) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password1) ||
            password1 !== password2
        ) {
            return;
        }
        dispatch(Registration({
            firstname: firstName,
            lastname: lastName,
            email: email,
            cin: CIN,
            role: role,
            password: password1,
            comanyname: companyName,
            domaine: domain,
            phonenumber: phoneNumber
        })

        )


    }









    const handleNext = (CurrentPage: string) => {
        if (CurrentPage == "signup1") {
            checkflow1();

        }
        else if (CurrentPage == "signup2") {
            checkflow2();
        }
        else if (CurrentPage == "signup3") {
            checkflow3();
        }

        else if (CurrentPage == "signup4") {
            checkflow4();
        }




    }





    return (
        <div >


            <div className={`  ${Page === "signup4" ? "hidden" : "block"}  flex flex-row h-screen justify-center ml-[-40px]  `} >


                <div className=" w-[50%] h-[95%] mt-6 ml-[50px] rounded-[30px]  mr-[20px] flex justify-center items-center bg-[#7152F3] bg-opacity-[5%]  ">


                    <Image width={430} height={430} src="/Code review-bro 1.png" alt="signup" />



                </div>




                <div className="w-[50%] mr-3   flex flex-col justify-center items-center  mb-3">

                    <div onClick={(e: any) => { setPage(`signup${parseInt(Page.replace('signup', '')) - 1}`) }}> <IoArrowBackCircleSharp className={`  ${Page === "signup1" ? "hidden" : "block"}    absolute top-[132px] right-[37%] text-[30px] text-[#7152F3] hover:cursor-pointer`} /></div>

                    {/*LOGO*/}
                    <div className=" h-[40px]   flex items-center justify-center font-lexend translate-y-[25px] ">

                        <Image
                            width={40}
                            height={40}
                            className="w-11 h-10 mr-[5px]"
                            src="/logo.png"
                            alt="" />

                        <p className=" leading-[40px] text-[30px] font-semibold">NRH </p>
                    </div>
                    {/*Welcome && Please sign up here*/}
                    <div className=" h-[40px]flex mb-[100px] ml-10 flex-row items-center mt-[60px]">

                        <p className={styles.maintext}>Welcome</p>
                        <p className="font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-left   ">Please Sign Up here</p>


                    </div>


                    {/*Dynamic Layout of Singup 1*/}
                    <div className={` ${Page === 'signup1' ? "block" : "hidden"} signup-section flex flex-col mt-8 mb-4  justify-center items-center  h-[200px] bg-white-500 justify-center items-center rounded-[10px] pt-[5px] `}>
                        <form className='mb-12'>
                            <div className={styles.InputContainer} >


                                <Input3 onChange={handleEmail} label="email" placeholder="exemple.exemple.com" type="email" />
                                { emailError && <div className="      h-[30px] w-[445px] flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {emailError}
                                    </div>
                                </div>}
                            </div>

                            <div style={{ marginBottom: '10px' }} className={styles.InputContainer}>


                                <SelectInput onChange={handleRole} placeholder='choose role' label='role' options={['Manager HR', 'service informatique', 'stagiaire', 'admin']} />
                                {roleError && <div className="      h-[30px] w-[445px] flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {roleError}
                                    </div>
                                </div>}
                            </div>
                           
                        </form>




                        <div className='  mb-2 ml-[90px] flex justify-center items-end flex-col w-[250px] h-[22px] '>


                            <div className='flex flex-col '>
                                <p className="font-light font-lexend text-[#7152F3]   text-[14px] leading-[22px] ">You  have an account ?
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0 }}
                                        className="inline-block ml-[5px] "

                                    >
                                        <span onClick={(e) => { router.push('/login',) }} className="font-bold hover:cursor-pointer">Login  Here</span>
                                    </motion.div></p></div>
                        </div>
                        <div className="text-center mb-3">
                            <div className="flex items-center justify-center">
                                <hr className="border border-solid border-[#7152F3] w-[190px] mx-2" />
                                <p className="font-lexend font-extralight text-[#7152F3] text-[12px] leading-[24px]">OR</p>
                                <hr className="border border-solid border-[#7152F3] w-[190px] mx-2" />
                            </div>
                        </div>
                        <button className=" mb-6 bg-white-500 border-[3px] flex justify-center items-center border-[#7152F3] w-[209px] h-[71px] text-white rounded-[10px] p-1"><h3 className=' font-lexend font-bold text-[20px] text-[#7152F3]'>Conitnue With Google</h3> </button>

                    </div>










                    {/*End Dynamic Layout of Singup 1*/}





                    {/*Dynamic Layout of Singup 2*/}
                    <div className={` ${Page === 'signup2' ? "block " : "hidden "} n flex flex-col mt-8 mb-4  justify-center items-center  h-[200px] bg-white-500 justify-center items-center rounded-[10px] pt-[5px] `}>
                        <div className={styles.InputContainer}>


                            <Input3 onChange={handleFirstName} label="First Name" placeholder="exemple" type="text" />
                            { firstNameError && <div className="      h-[30px] w-[445px] flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {firstNameError}
                                    </div>
                                </div>}
                        </div>
                        

                        <div className={styles.InputContainer}>


                            <Input3 onChange={handleLastName} label="Last Name" placeholder="exemple" type="text" />
                            { lastNameError && <div className="      h-[30px] w-[445px] flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {lastNameError}
                                    </div>
                                </div>}
                        </div>
                      
                        <div className={styles.InputContainer}>


                            <Input3 onChange={handleCIN} label="CIN" placeholder="00000000" type="text" />
                            { CINError && <div className="      h-[30px] w-[445px] flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {CINError}
                                    </div>
                                </div>}
                        </div>
                      


                    </div>

                    {/*End Dynamic Layout of Singup 2*/}



                    {/*Dynamic Layout of Singup 3*/}
                    <div className={` ${Page === 'signup3' ? "bloc " : "hidden "}  flex flex-col mt-8 mb-4  justify-center items-center  h-[200px] bg-white-500 justify-center items-center rounded-[10px] pt-[5px] `}>
                        <div  className={styles.InputContainer}>


                            <SelectInput
                                onChange={handleDomain}
                                placeholder='Choose industry'
                                label='Industy'
                                options={[
                                    'Industrie',
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
                             { domainError && <div className="      h-[30px] w-[445px] flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {domainError}
                                    </div>
                                </div>}

                        </div>
                      
                        <div className={styles.InputContainer}>


                            <Input3 onChange={handleCompanyName} label="Company Name" placeholder="exemple" type="text" />
                            { companyNameError && <div className="      h-[30px] w-[445px] flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {companyNameError}
                                    </div>
                                </div>}
                        </div>
                      


                        <div style={{ marginBottom: '5px' }} className='  mb-6 flex flex-col '>



                            <div className="relative">
                                <label className="absolute z-[5] transform translate-x-[100px] top-0 left-0 px-2 pt-1 font-light text-xs leading-4 text-indigo-600">Phone Number</label>
                                <PhoneInput
                                    defaultCountry="ua"
                                    value={phoneNumber}
                                    onChange={handlePhoneNumber}
                                    inputStyle={{
                                        width: '446px',
                                        height: '56px',
                                        padding: '16px',
                                        paddingLeft: '65px',
                                        transform: 'translateX(9px)',
                                        border: '1px solid #ccc',
                                        borderRadius: '10px',
                                        borderLeft: 'none',
                                        outline: 'none',
                                        transition: 'border-color 0.3s ease-in-out',
                                        borderColor: '#ccc',
                                    }}
                                />
                                 { phoneNumberError && <div className=" translate-x-[54px]  translate-y-[13px]   h-[30px] w-[445px] flex items-center p-4  text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
                                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                                    </svg>
                                    <span className="sr-only">Info</span>
                                    <div>
                                        {phoneNumberError}
                                    </div>
                                </div>}
                            </div>
                        </div>
                       


                    </div>

                    {/*End Dynamic Layout of Singup 3*/}




                    <div className='mb-8 w-[61px] mt-[90px] h-[61px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                        <ButtonSubmit timing={500} text={loading ? <><ImSpinner8 className="animate-spin  text-[20px]" /> Loading...</> : <FaArrowRight className='text-white text-[20px]' />} fct={() => handleNext(Page)} />
                    </div>



                    {/*4 cercle indicator of current Page */}

                    <div className=" ml-6 flex flex-row  justify-center items-center w-[155px] h-[17px]  ">
                        <div className={`${styles.cercle} ${Page === 'signup1' ? "bg-[#7152F3]" : "bg-[#B2B2B2]"} `} ></div>
                        <div className={`${styles.cercle} ${Page === 'signup2' ? "bg-[#7152F3]" : "bg-[#B2B2B2]"} `} ></div>
                        <div className={`${styles.cercle} ${Page === 'signup3' ? "bg-[#7152F3]" : "bg-[#B2B2B2]"} `} ></div>
                        <div className={`${styles.cercle} ${Page === 'signup4' ? "bg-[#7152F3]" : "bg-[#B2B2B2]"} `} ></div>

                    </div>


                </div>

















            </div>

















            <div className={`  ${Page === "signup4" ? "block" : "hidden"}    w-[90%] h-[90%]   flex  justify-center items-center `} >

                <div onClick={(e: any) => { setPage(`signup${parseInt(Page.replace('signup', '')) - 1}`) }}> <IoArrowBackCircleSharp className={`  ${Page != "signup4" ? "hidden" : "block"}    absolute top-[132px] right-[77%] text-[30px] text-[#7152F3] hover:cursor-pointer`} /></div>

                <div className="  absolute top-9 left-11 h-[40px] mr-[500px]  flex items-center justify-center  header-nav    ">

                    <Image
                        width={40}
                        height={40}
                        className="w-11 h-10 mr-[5px]"
                        src="/logo.png"
                        alt="" />

                    <p className=" leading-[40px] text-[30px] font-semibold">NRH </p>
                </div>



                <div className="  flex mb-6 ml-[120px] flex-col items-center mt-[60px]">

                    <p className={styles.maintext}>Set Your Password</p>
                    <p className="mb-[80px] font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-left   ">Please follow the requested Format</p>
                    <div className='mb-[10px]'>
                        <div className={styles.InputContainer}>


                            <div className={styles.InputWithEye}>
                                <Input3
                                    onChange={handleChangePassword1}
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password1}
                                />
                                <button type="button" onClick={toggleShowPassword}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                        </div>
                        <div className={styles.InputContainer}>


                            <div className={styles.InputWithEye}>
                                <Input3
                                    onChange={handleChangePassword2}
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password2}
                                />
                                <button  type="button" onClick={toggleShowPassword}>
                                {showPassword  ? <FaEye  /> : <FaEyeSlash />}
                                </button>
                            </div>

                        </div>
                    </div>

                    <div className="flex flex-col justify-center items-center">
                        <h3 className='flex'> <BiErrorCircle className={` ${password1.length < 12 ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${password1.length >= 12 ? 'block' : 'hidden'} text-[20px] text-green-500`} />12 charcters or higher</h3>
                        <h3 className='flex'> <BiErrorCircle className={` ${! /[A-Z]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[A-Z]/.test(password1) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Uppercase</h3>
                        <h3 className='flex'> <BiErrorCircle className={` ${! /[a-z]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[a-z]/.test(password1) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Lowercase</h3>
                        <h3 className='flex'> <BiErrorCircle className={` ${! /\d/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/\d/.test(password1) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Numbers</h3>
                        <h3 className='flex'> <BiErrorCircle className={` ${!  /[!@#$%^&*(),.?":{}|<>]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${/[!@#$%^&*(),.?":{}|<>]/.test(password1) ? 'block' : 'hidden'} text-[20px] text-green-500`} />Special Caracters</h3>
                        <h3 className='flex mb-2'> <BiErrorCircle className={` ${password1 != password2 ? 'block' : 'hidden'} mt-[2px] mr-[1px]  text-[20px] text-red-500`} /> <TiTick className={` ${password1 == password2 ? 'block' : 'hidden'} text-[20px] text-green-500`} />Password Matches</h3>


                    



                    </div>


                    <div className='mb-8 w-[61px] mt-[90px] h-[61px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                        <ButtonSubmit timing={500} text={loading ? <><ImSpinner8 className="animate-spin  text-[20px]" /> Loading...</> : <FaArrowRight className='text-white text-[20px]' />} fct={() => handleNext(Page)} />
                    </div>
                    <div className=" ml-6 flex flex-row  justify-center items-center w-[155px] h-[17px]  ">
                        <div className={`${styles.cercle} ${Page === 'signup1' ? "bg-[#7152F3]" : "bg-[#B2B2B2]"} `} ></div>
                        <div className={`${styles.cercle} ${Page === 'signup2' ? "bg-[#7152F3]" : "bg-[#B2B2B2]"} `} ></div>
                        <div className={`${styles.cercle} ${Page === 'signup3' ? "bg-[#7152F3]" : "bg-[#B2B2B2]"} `} ></div>
                        <div className={`${styles.cercle} ${Page === 'signup4' ? "bg-[#7152F3]" : "bg-[#B2B2B2]"} `} ></div>

                    </div>


















                </div>





















            </div>



        </div>




    );












}

export default Register;


