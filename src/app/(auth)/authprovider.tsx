'use client'
import  { useEffect } from 'react';
import { useRouter } from 'next/navigation'; 
import { useDispatch, useSelector } from 'react-redux';

import { useRef } from "react";
const Authprovider = ({ children }: { children: React.ReactNode }) => {
    const mainRef = useRef<HTMLElement | null>(null);
    const auth = useSelector((state: any) => state.auth);
    const router=useRouter();

   
    const dispatch = useDispatch();
    const errors = useSelector((state: any) => state.errors);
    const success = useSelector((state: any) => state.success);

    useEffect(() => {
        
        const successMessage = localStorage.getItem('successMessage');
        const errorMessage = localStorage.getItem('errorMessage');
        
        if (Object.keys(errors).length > 0) {
            dispatch({ type: 'ERRORS', payload: {}});
        }
        if (success.message !='') {
            dispatch({ type: 'SUCCESS', payload: ''});
        }

        if (successMessage) {
           

            // Optionally, clear the success message from session storage
            localStorage.removeItem('successMessage');
        }
        if (errorMessage) {
           
            localStorage.removeItem('errorMessage');
        }
        if (auth.isConnected) {
           
           
      
       
          router.push('/dashboard')
        
    }
    
    }, [router , auth.isConnected , ]);

    return <main    > {children}</main>;
};

export default Authprovider;