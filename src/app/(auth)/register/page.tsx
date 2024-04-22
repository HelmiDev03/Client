
'use client'
import { motion } from 'framer-motion';
import styles from './page.module.css'

import { IoArrowBackCircleSharp } from "react-icons/io5";
import { TiMinusOutline } from "react-icons/ti";
import { FaCheck } from "react-icons/fa6";

import { useEffect, useState } from "react";

import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';

import { FaArrowRight } from "react-icons/fa6";
import Image from 'next/image';
import axios from 'axios';
import { PhoneInput } from 'react-international-phone';
import toast from "react-hot-toast";
import 'react-international-phone/style.css';

import { Registration } from '@/redux/actions/userActions/registerAction';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { ImSpinner8 } from 'react-icons/im';
import { FcGoogle } from 'react-icons/fc';
import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';


const Register = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
   
    const [Page, setPage] = useState("signup1");

    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [CIN, setCIN] = useState("");
    const [companyName, setCompanyName] = useState("");

    const [domain, setDomain] = useState("");


    const [phoneNumber, setPhoneNumber] = useState("");

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
        const emailPattern = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
        if (!emailPattern.test(email)) {
             return toast.error('Invalid Email');
        }
        if (role === '') {
            return  toast.error('Invalid Role');
        }
        try {
            if (emailPattern.test(email)) {
                await axios.post(process.env.NEXT_PUBLIC_DOMAIN+`/api/verifyemail`, { email: email });
                setPage("signup2");
            }
        } catch (err: any) {
            console.log(err.response?.data);
            return toast.error("email already taken");
        }

        setPage("signup2");
    }
    
    const checkflow2 = async () => {
        const nameRegex = /^[a-zA-Z]{3,}$/
        const cinRegex = /^\d{8}$/;
        if (!nameRegex.test(firstName)) {
            return toast.error('Invalid First Name');
        }
        if (!nameRegex.test(lastName)) {
            return toast.error('Invalid Last Name');
        }
        if (!cinRegex.test(CIN)) {
             return toast.error('Invalid CIN');
        }
        try {
            await axios.post(process.env.NEXT_PUBLIC_DOMAIN+`/api/verifycin`, { cin: CIN });
            setPage("signup3");
        } catch (err: any) {
             return toast.error('CIN already taken');
        }
        setPage("signup3");
    }

    const checkflow3 = async () => {
        const nameRegex = /^[a-zA-Z]{2,}$/
        const phoneNumberRegex = /^\+\d{2,4}\d{8,8}$/

        if (domain === '') {
            return toast.error('Invalid Industry');
        }
        if (!nameRegex.test(companyName)) {
             return toast.error('Invalid Company Name');
        }
        if (!phoneNumberRegex.test(phoneNumber)) {
             return toast.error('Invalid Phone Number');
        }
        try {
            await axios.post(process.env.NEXT_PUBLIC_DOMAIN+`/api/verifyphone`, { phonenumber: phoneNumber.trim() });
            setPage("signup4");
        } catch (err: any) {
            console.log(err.response?.data);
             return toast.error('number already taken');
        }

        setPage("signup4");
    }


    const isbuttondisabled = useSelector((state: any) => state.isbuttondisabled);

    const checkflow4 = () => {
        if (password1.length < 12 ||
            !/[A-Z]/.test(password1) ||
            !/[a-z]/.test(password1) ||
            !/\d/.test(password1) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password1) ||
            password1 !== password2
        ) {  return ;}


        dispatch({
            type: 'Chnage_State',
            payload: true
        })
        
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
            <div className={`${Page === "signup4" ? "hidden" : "block"} flex h-screen justify-center`} >
                <div className=" w-[60%] h-full flex justify-center items-center bg-[#7152F3] bg-opacity-[5%]">
                    <Image width={430} height={430} src="/Code review-bro 1.png" alt="signup" />
                </div>
                <div className="w-[40%] flex flex-col justify-center items-center">
                    <div onClick={(e: any) => { setPage(`signup${parseInt(Page.replace('signup', '')) - 1}`) }}> <IoArrowBackCircleSharp className={`  ${Page === "signup1" ? "hidden" : "block"} absolute top-5 right-[36%] text-[35px] text-[#7152F3] hover:cursor-pointer`} /></div>
                    {/*LOGO*/}
                    <div className=" h-[40px] flex items-center justify-center font-lexend translate-y-[25px] ">
                        <Image
                            width={40}
                            height={40}
                            className="w-16 mr-[5px]"
                            src="/logo.png"
                            alt="" />
                        <p className="leading-[40px] text-[35px] font-bold">NRH </p>
                    </div>
                    {/*Welcome && Please sign up here*/}
                    <div className="h-[40px] flex mb-[80px] flex-col items-center mt-[60px] gap-1">
                        <p className={styles.maintext}>Welcome</p>
                        <p className="font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-center">Get started with NRH, just create an account and enjoy the experience.</p>
                    </div>

                    {/*Dynamic Layout of Singup 1*/}
                    <div className={`${Page === 'signup1' ? "block" : "hidden"} flex flex-col justify-center items-center bg-white-500`}>
             
                        <form className='mb-3 w-full'>
                                {/* <!--Email input--> */}
                                <div className="relative mb-3">
                                    <input
                                        type="email"
                                        onChange={handleEmail}
                                        className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingInput"
                                        placeholder="name@example.com" />
                                    <label
                                        htmlFor="floatingInput"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                        >Email
                                    </label>
                                </div>
                                {/* <Input3 onChange={handleEmail} label="email" placeholder="exemple.exemple.com" type="email" /> */}
                                <div className="relative mb-3">
                                    <select
                                        onChange={handleRole}
                                        className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                        id="floatingSelect"
                                    >
                                        <option value="" disabled selected hidden>Choose a role</option>
                                        <option value="other">Other</option>
                                        <option value="HR Manager">HR Manager</option>
                                        <option value="HR specialist">HR Specialist</option>
                                        <option value="IT department">IT Department</option>
                                        <option value="management team">Management Team</option>
                                        <option value="operations team">Operations Team</option>
                                        <option value="accounting">Accounting</option>
                                        <option value="intern">Intern</option>
                                    </select>
                                    <label
                                        htmlFor="floatingSelect"
                                        className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                    >
                                        Role
                                    </label>
                                </div>
                                {/* <SelectInput onChange={handleRole} placeholder='choose role' label='role' options={['Manager HR', 'service informatique', 'stagiaire', 'admin']} /> */}
                        </form>
                        <div className='mx-[90px] mb-4 flex justify-center items-end flex-col w-full'>
                            <div className='flex flex-col '>
                                <p className="font-light text-[#7152F3] text-[14px] leading-[22px] ">You have an account ?
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0 }}
                                        className="inline-block  ml-[5px] "
                                    >
                                        <span onClick={(e) => { router.push('/login',) }} className="font-bold hover:cursor-pointer hover:underline">Login  Here</span>
                                    </motion.div>
                                </p>
                            </div>
                        </div>
                        <div className="text-center mb-3">
                            <div className="flex items-center justify-center">
                                <hr className="border border-solid border-[#7152F3] w-[190px] mx-2" />
                                <p className="font-lexend font-extralight text-[#7152F3] text-[12px] leading-[24px]">OR</p>
                                <hr className="border border-solid border-[#7152F3] w-[190px] mx-2" />
                            </div>
                        </div>
                        <button className="bg-white-500 border-[3px] flex justify-center items-center gap-4 border-[#7152F3] w-full text-white rounded-[10px] p-2">
                            <FcGoogle size={30}/>
                            <h3 className='font-bold text-[20px] text-[#7152F3]'>Conitnue With Google</h3> 
                        </button>
                    </div>
                    {/*End Dynamic Layout of Singup 1*/}

                    {/*Dynamic Layout of Singup 2*/}
                    <div className={`${Page === 'signup2' ? "block " : "hidden "} flex flex-col justify-center items-center bg-white-500 w-[70%]`}>
                       
                        {/* <!--First Name input--> */}
                        <div className="relative mb-3 w-full">
                            <input
                                type="text"
                                onChange={handleFirstName}
                                className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="floatingInput"
                                placeholder="name@example.com" />
                            <label
                                htmlFor="floatingInput"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                >First Name
                            </label>
                        </div>
                        {/* <!--Last Name input--> */}
                        <div className="relative mb-3 w-full">
                            <input
                                type="text"
                                onChange={handleLastName}
                                className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="floatingInput"
                                placeholder="name@example.com" />
                            <label
                                htmlFor="floatingInput"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                >Last Name
                            </label>
                        </div>
                        {/* <!--CIN input--> */}
                        <div className="relative mb-3 w-full">
                            <input
                                type="text"
                                onChange={handleCIN}
                                className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="floatingInput"
                                placeholder="name@example.com" />
                            <label
                                htmlFor="floatingInput"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                >CIN
                            </label>
                        </div>
                    </div>
                    {/*End Dynamic Layout of Singup 2*/}

                    {/*Dynamic Layout of Singup 3*/}
                    <div className={`${Page === 'signup3' ? "bloc " : "hidden "} flex flex-col justify-center items-center bg-white-500 w-[70%]`}>
                    
                        {/* <!--Domain input--> */}
                        <div className="relative mb-3 w-full">
                            <select
                                onChange={handleDomain}
                                className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="floatingSelect"
                            >
                                <option value="" disabled selected hidden>Choose Industry</option>
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
                            <label
                                htmlFor="floatingSelect"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                            >
                                Industry
                            </label>
                        </div>
                        {/* <!--Company Name input--> */}
                        <div className="relative mb-3 w-full">
                            <input
                                type="text"
                                onChange={handleCompanyName}
                                className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-neutral-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                id="floatingInput"
                                placeholder="name@example.com" />
                            <label
                                htmlFor="floatingInput"
                                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                >Company Name
                            </label>
                        </div>
                        {/* <!--Phone Number input--> */}
                        <div className="relative mb-3 pt-5 w-full h-[60px] border rounded-[10px] border-solid border-slate-400 flex items-center">
                            <label className="absolute z-[5] top-0 left-0 px-2 pt-1 font-light text-xs leading-4 text-blue-400">Phone Number</label>
                            <PhoneInput
                                defaultCountry="tn"
                                value={phoneNumber}
                                onChange={handlePhoneNumber}
                                className="-ml-[50px]"
                                inputStyle={{
                                    width: '100%',
                                    height: '36px',
                                    outline: 'none',
                                    border: 'none',
                                    backgroundColor: 'transparent', // Set to transparent to match the container
                                    paddingLeft: '60px', // Adjust this padding as needed
                                    fontSize: '16px', // Adjust font size as needed
                                    color: '#000', // Set text color if needed
                                }}
                            />
                        </div>
                    </div>
                    {/*End Dynamic Layout of Singup 3*/}

                    <div className='mb-8 w-[61px] mt-[80px] h-[61px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
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

            <div className={`${Page === "signup4" ? "block" : "hidden"} w-screen h-screen flex justify-center items-center`} >
            
                <div onClick={(e: any) => { setPage(`signup${parseInt(Page.replace('signup', '')) - 1}`) }}> <IoArrowBackCircleSharp className={`  ${Page != "signup4" ? "hidden" : "block"} absolute top-8 left-8 text-[50px] text-[#7152F3] hover:cursor-pointer`} /></div>
                {/*LOGO*/}
                <div className="h-[40px] flex items-center justify-center absolute top-10 right-10">
                    <Image
                        width={40}
                        height={40}
                        className="w-20 mr-[5px]"
                        src="/logo.png"
                        alt="" />
                </div>

                <div className="flex mb-6 flex-col items-center mt-[60px] w-[550px]">
                    <p className={styles.maintext}>Set Your Password</p>
                    <p className="mb-[80px] font-lexend text-body-2 font-light text-[16px] text-gray-400 text-sm leading-[24px] tracking-normal text-left">Please follow the requested Format</p>
                    <div className='mb-[10px] w-[450px]'>
                            {/* <!--Password input--> */}
                            <div className="relative mb-3">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChangePassword1}
                                    className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                    id="floatingPassword"
                                    placeholder="Password" 
                                />
                                <label
                                    htmlFor="floatingPassword"
                                    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                    >Password
                                </label>
                                <div className="absolute top-5 right-5 cursor-pointer" onClick={toggleShowPassword} >
                                    { showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} /> }
                                </div>
                            </div>
                            {/* <!--Password input--> */}
                            <div className="relative mb-3">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    onChange={handleChangePassword2}
                                    className="peer m-0 block h-[58px] w-full rounded-lg border border-solid border-secondary-500 bg-transparent bg-clip-padding px-3 py-4 text-base font-normal leading-tight text-black transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-[0.625rem] focus:pt-[1.625rem] focus:text-neutral-700 focus:shadow-twe-primary focus:outline-none peer-focus:text-primary dark:border-neutral-400 dark:text-black dark:autofill:shadow-autofill dark:focus:border-primary dark:peer-focus:text-primary [&:not(:placeholder-shown)]:pb-[0.625rem] [&:not(:placeholder-shown)]:pt-[1.625rem]"
                                    id="floatingPassword"
                                    placeholder="Password" 
                                />
                                <label
                                    htmlFor="floatingPassword"
                                    className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-neutral-500 transition-[opacity,_transform] duration-200 ease-linear peer-focus:-translate-y-2 peer-focus:translate-x-[0.15rem] peer-focus:scale-[0.85] peer-focus:text-primary peer-[:not(:placeholder-shown)]:-translate-y-2 peer-[:not(:placeholder-shown)]:translate-x-[0.15rem] peer-[:not(:placeholder-shown)]:scale-[0.85] motion-reduce:transition-none dark:text-blue-400 dark:peer-focus:text-primary"
                                    >Confirm Password
                                </label>
                                <div className="absolute top-5 right-5 cursor-pointer" onClick={toggleShowPassword} >
                                    { showPassword ? <HiOutlineEye size={20} /> : <HiOutlineEyeOff size={20} /> }
                                </div>
                            </div>
                    </div>

                    <div className="flex flex-col w-[450px]">
                        <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${password1.length < 12 ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${password1.length >= 12 ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />12 charcters</h3>
                        <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${! /[A-Z]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${/[A-Z]/.test(password1) ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />One Uppercase</h3>
                        <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${! /[a-z]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${/[a-z]/.test(password1) ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />One Lowercase</h3>
                        <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${! /\d/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${/\d/.test(password1) ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />One Number</h3>
                        <h3 className='flex items-center text-gray-400'> <TiMinusOutline className={` ${!  /[!@#$%^&*(),.?":{}|<>]/.test(password1) ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck  className={` ${/[!@#$%^&*(),.?":{}|<>]/.test(password1) ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />Special Caracters (!, %, &, etc)</h3>
                        <h3 className='flex items-center text-gray-400 mb-2'> <TiMinusOutline className={` ${password1 != password2 ? 'block' : 'hidden'} mt-[2px] mr-[3px]  text-[20px] text-red-500`} /> <FaCheck className={` ${password1 == password2 ? 'block' : 'hidden'} text-[20px] mr-[3px] text-green-500`} />Password Matches</h3>
                    </div>
                    <button className='mb-8 w-[61px] mt-[34px] h-[61px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                        <ButtonSubmit isbuttondisabled={isbuttondisabled} timing={500} text={loading ? <><ImSpinner8 className="animate-spin  text-[20px]" /> Loading...</> : <FaArrowRight className='text-white text-[20px]' />} fct={() => handleNext(Page)} />
                    </button>
                    <div className="translate-y-[10px]  ml-6 flex flex-row  justify-center items-center w-[155px] h-[17px]  ">
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


