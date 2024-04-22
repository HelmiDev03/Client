'use client'
import axios from 'axios';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';

import { useState, useEffect } from 'react';

import Link from 'next/link';
import style from '@/app/(auth)/emailverified/emailVerified.module.css'

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const token = searchParams.get("token");
  const [verificationResult, setVerificationResult] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
        await axios.get(process.env.NEXT_PUBLIC_DOMAIN+`/api/confirm-email/${userId}/${token}`).then((res) => {
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
  return (
    <div className={style.container}>
        <Image className="absolute top-12 left-12"
        src="/logo.png" alt="logo" 
        width={100} height={100} />
        <div>
            <h1 className="text-4xl mb-10">Verify Email</h1>
            {verificationResult && verificationResult === 'Email verified successfully' ? (
                <div className="flex flex-col gap-4 items-center">
                    <h2 className="text-blue-500">Email Verified</h2>
                    <Link href={"/login"} className="border p-3 px-6 rounded-md bg-slate-100">
                        Go to Login
                    </Link>
                </div>
            ) : (<p>{verificationResult}</p>)}
        </div>
    </div>
    );
}

export default VerifyEmail;