'use client';
import { IoCameraOutline } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { MdWorkOutline } from "react-icons/md";
import Input, { Input3 } from '@/app/(components)/Inputs/TextInput'
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import ButtonCancel from "@/app/(components)/ButtonCancel/Button";
import ButtonSubmit from "@/app/(components)/ButtonSubmit/Button";
import { SelectInput5 } from "@/app/(components)/Inputs/SelectInput"

import axios from "axios";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons

import styles from '@/app/(auth)/register/page.module.css';

import { Addnewemployee } from '@/redux/actions/usersActions/addEmployee';
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import toast from "react-hot-toast";






const AddNewEmployee = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobile, setMobile] = useState('');
  const [cin, setCin] = useState('');
  const [adress, setAdress] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [fileName, setFileName] = useState('');
  const [base64, setBase64] = useState('' as any); // State to store the base64 string of the selected file
  const [fileError, setFileError] = useState('');
  const [EmployeeRole, setEmployeeRole] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Page, setPage] = useState(1);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const isbuttondisabled = useSelector((state: any) => state.isbuttondisabled);

  const dispatch = useDispatch<AppDispatch>();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {

  }, [EmployeeRole]); // Run the effect whenever the 'role' state changes




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

  const handleFirstName = (e: any) => {
    setFirstName(e.target.value);
  }
  const handleLastName = (e: any) => {

    setLastName(e.target.value);

  }
  const handleMobile = (e: any) => {
    setMobile(e.target.value);
  }

  const handleCin = (e: any) => {
    setCin(e.target.value);
  }
  const handleAdress = (e: any) => {
    setAdress(e.target.value);
  }

  const handleBirthdate = (e: any) => {
    setBirthdate(e.target.value);
  }



  const handleEmployeeRole = (e: any) => {
    setEmployeeRole(e.target.value);
  }





  const handleEmail = (e: any) => {
    setEmail(e.target.value);

  }


  const handlePassword = (e: any) => {
    setPassword(e.target.value);
  }



  const handleCancel = (e: any) => {
    e.preventDefault();

    Page === 1 ? router.push('/employees') : setPage(1);
  };


  const checkFlow1 = async () => {


    const nameRegex = /^[a-zA-Z]{3,}$/;
    const cinRegex = /^\d{8}$/;
    const phoneNumberRegex = /^\+\d{2,4}\d{8,}$/

    if (!nameRegex.test(firstName)) {
      toast.error('First Name must contain at least 3 characters');
      return;
    }
    if (!nameRegex.test(lastName)) {
      toast.error('Last Name must contain at least 3 characters');
      return;
    }
    if (!phoneNumberRegex.test(mobile)) {
      toast.error('Mobile Number must contain 8 digits');
      return;
    }


    axios.post(process.env.NEXT_PUBLIC_DOMAIN + `/api/verifyuserphone`, { phonenumber: mobile })
      .catch(() => {
        toast.error('this phone number is used by someone else');
        return;

      });


    if (!cinRegex.test(cin)) {
      toast.error('CIN must contain 8 digits');
      return;
    }

    axios.post(process.env.NEXT_PUBLIC_DOMAIN + `/api/verifycin`, { cin })
      .catch(() => {
        toast.error('this CIN is used by someone else');
        return;

      });

    if (!birthdate) {
      toast.error('Please enter birth day');
      return;
    }


    setPage(2);

  }



  const checkFlow2 = async () => {

    const emailPattern = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;

    if (!EmployeeRole) {
      toast.error('Please select a role');
      return;
    }

    if (!emailPattern.test(Email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    try {
      await axios.post(process.env.NEXT_PUBLIC_DOMAIN + `/api/verifyemail`, { email: Email });
    } catch (error) {
      toast.error('This email is used by someone else');
      return;
    }

    if (
      Password.length < 12 ||
      !/[A-Z]/.test(Password) ||
      !/[a-z]/.test(Password) ||
      !/\d/.test(Password) ||
      !/[!@#$%^&*(),.?":{}|<>]/.test(Password)
    ) {
      toast.error('Password must contain at least:\n- 12 characters\n- 1 uppercase letter\n- 1 lowercase letter\n- 1 number\n- 1 special character');
      return;
    }

    const data = {
      firstname: firstName,
      lastname: lastName,
      phonenumber: mobile,
      cin: cin,
      adress: adress,
      dateofbirth: birthdate,
      role: EmployeeRole,
      email: Email,
      password: Password,
      profilepicture: fileName != "" ? base64 : "",
    };
    dispatch({
      type: 'Chnage_State',
      payload: true
  })
    dispatch(Addnewemployee(data, router));
    dispatch({
      type: 'Chnage_State',
      payload: false
  })


  };




  const handleFirstNext = () => {

    checkFlow1()

  };

  const handleFinish = (e: any) => {
    checkFlow2()

  }





















  return (


    <div className="flex flex-col mt-[100px] w-[94%] ml-[37px] mb-2 rounded-[10px] border-[1px] p-8 ">

      <div className="flex flex-row sm:flex-row sm:justify-start mb-[25px]  ">



        <h3>
          <p className={`flex mr-4 align-left   flex items-center text-[16px] 
                      leading-[24px]  font-lexend font-semibold  px-3 py-2 transition-colors duration-300
                       transform   hover:bg-gray-50 
                         l-2 ${Page === 1 ? "border-b-[3px] border-indigo-600 text-indigo-600 " : "border-b-[0px] text-dark-500"}`}><IoPerson className="text-[24px] mr-3" />   Personnel Information</p>

        </h3>

        <h3>
          <p className={`flex mr-4 align-left flex items-center text-[16px] 
                      leading-[24px]  font-lexend font-semibold  px-3 py-2 transition-colors duration-300
                       transform   hover:bg-gray-50 
                         l-2 ${Page === 2 ? "border-b-[3px] border-indigo-600 text-indigo-600 " : "border-b-[0px] text-dark-500 "}`}> <MdWorkOutline className="text-[24px] mr-3" />   Professional Information</p>

        </h3>


      </div>

      {/*Personnal*/}

      <div className={`flex flex-col ${Page === 1 ? "block" : "hidden"}`}>


        <div className="relative mb-6 w-[100px] h-[100px] flex justify-center items-center rounded-[10px] border-[1px] bg-white">
          <label htmlFor="fileInput" className="absolute inset-0 flex justify-center items-center cursor-pointer">
            <IoCameraOutline className="text-[24px]" />
            <input type="file" id="fileInput" className="hidden" onChange={handleFileChange} />
          </label>
          <div className="absolute bottom-0 w-full text-center">{fileName}</div>

        </div>
        {fileError && <div className=" translate-y-[-15px] h-[30px] w-[330px] flex justify-center items-center p-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 " role="alert">
          <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span className="sr-only">Info</span>
          <div>
            {fileError}
          </div>
        </div>}


        <div className="flex flex-row flex-wrap">


          <div className=' mr-8 mb-2 h-[100px]'>
            <Input onChange={handleFirstName} label="Fist Name" type="text" width="510px" />



          </div>
          <div className=' mr-8 mb-2  h-[100px] '>
            <Input onChange={handleLastName} label="Last Name" type="text" />


          </div>

          <div className=' mr-8 mb-2 h-[100px] '>
            <Input onChange={handleMobile} label="Phone Number" type="text" />


          </div>

          <div className=' mr-8 mb-2 h-[100ox] '>

            <Input onChange={handleCin} label="CIN" type="text" />


          </div>

          <div className=' mr-8 mb-2 h-[100px] '>

            <Input onChange={handleAdress} value={adress} label="Adresse" type="text" />


          </div>

          <div className=' mr-8 mb-2 h-[100px] '>

            <Input onChange={handleBirthdate} label="Birth Date" type="date" />


          </div>


        </div>


        <div className="flex flex-row justify-end items-end">
          <div className='mr-4  w-[91px] h-[50px] flex justify-center items-center rounded-[10px] p-[20px]  border border-gray  ' >
            <ButtonCancel text="Cancel" fct={handleCancel} />
          </div>
          <div className=' w-[91px] h-[50px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
            <ButtonSubmit isbuttondisabled={isbuttondisabled} text="Next" fct={handleFirstNext} />
          </div>



        </div>








      </div>

      {/*endPersonnal*/}





      {/*Profeesional*/}





      <div className={`flex flex-col ${Page === 2 ? "block" : "hidden"}`}>



        <div className="flex flex-row flex-wrap mb-[52px]">

          <div className=' mr-8 mb-2 h-[100px] '>
            <SelectInput5
              label="Role"
              placeholder="Choose role" // Pass your placeholder value
              options={['Manager HR', 'service informatique', 'stagiaire', 'admin']}
              onChange={handleEmployeeRole} // Pass your onChange handler function
            />
           



          </div>
          <div className=' mr-8 mb-2 h-[100px] '>
            <Input onChange={handleEmail} label='Email' type="email" />
          

          </div>
          <div className=' mr-8 mb-2 h-[100ox]  '>
            <div className={styles.InputWithEye}>
              <Input
                onChange={handlePassword}
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={Password}
              />
              <button type="button" onClick={toggleShowPassword}>
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
             



            </div>
          </div>








        </div>


        <div className="flex flex-row justify-end items-end">
          <div className='mr-4  w-[91px] h-[50px] flex justify-center items-center rounded-[10px] p-[20px]  border border-gray  ' >
            <ButtonCancel text="Return" fct={handleCancel} />
          </div>
          <div className=' w-[91px] h-[50px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3]   ' >
            <ButtonSubmit text="Add" fct={handleFinish} />
          </div>



        </div>








      </div>
      {/*endProfessional*/}

















    </div>










  );











}

export default AddNewEmployee;