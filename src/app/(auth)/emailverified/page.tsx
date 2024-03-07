
'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Card } from 'flowbite-react';
import { useState, useEffect } from 'react';
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { GrValidate } from "react-icons/gr";
import { ImSpinner8 } from 'react-icons/im';
import { FaCheckCircle } from 'react-icons/fa';

const VerifyEmail = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
        await axios.get(`http://localhost:5000/api/confirm-email/${userId}/${token}`).then((res) => {
            setVerificationResult(res.data.message);
        }
        ).catch((error) => {
            setVerificationResult(error.response.data.message);
        });
    };

    if (userId && token) {
        verifyEmail();
    }
  }, [token , userId]);

  

  return verificationResult &&verificationResult === 'Email verified successfully' ? (
    <div>
    <div className=" absolute  center rounded-[25px]  top-[10%] right-[39%]   z-50  ">
                <div className=" relative p-4 w-[400px] max-w-lg ">
                    <div className=" bg-lavender relative p-4  rounded-lg drop-shadow-md  md:p-8 flex flex-col justify-center">
                        <FaCheckCircle className="mx-auto mb-4 h-14 w-14 text-[#7152F3] " />
                        <h3 className="mb-3 text-2xl  font-bold text-gray-900 translate-x-[16%] translate-y-[94%]"> Email  Successfully Confirmed</h3>


                        <div className=" justify-center items-center pt-0 space-y-4 sm:flex sm:space-y-0">


                            <div className='mb-8 w-[200px] mt-[90px] h-[61px] flex justify-center items-center rounded-[10px] p-[20px] bg-[#7152F3] ' >
                                <ButtonSubmit timing={500} text='Back To Login' fct={() => window.location.href = '/login'} />
                            </div>

                        </div>
                    </div>
                </div>
            </div>

      
    </div>
  ) : (
    <p>{verificationResult}</p>
  );
}

export default VerifyEmail;
