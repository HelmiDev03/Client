'use client'
import React, { useState} from 'react';
import { ImSpinner8 } from "react-icons/im";



export default function ButtonSubmit(props :any) {
    const text  = props.text
    const fct = props.fct
    const timing = props.timing
    const spincol = props.spincol
    const isdisabled = props.isdisabled!=undefined ? props.isdisabled  : undefined
    const [loading, setLoading] = useState(false);


    const handleClick = () => {
        setLoading(true); // Show spinner when button is clicked
        setTimeout(() => {
            setLoading(false); // Hide spinner after 1 second (simulated delay)
            fct(); // Call the provided function
        }, timing || 1000);
    };

    return (
        <button   className='hover-cursor-pointer text-[#FFFFFF] font-lexend font-light text-[16px] leading-[24px]' onClick={handleClick} disabled={isdisabled!=undefined ? isdisabled ? true:loading : loading}>
          {loading ? <ImSpinner8 className={`animate-spin text-[20px] ${spincol ? `text-${spincol}` : ''}`} /> : text}
        </button>
    );
}























