import React, { useState, useEffect } from 'react';
import { ImSpinner8 } from 'react-icons/im';

export default function ButtonSubmit(props:any) {
    const { text, fct, timing, spincol, isbuttondisabled } = props;
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(isbuttondisabled); // Update loading state when isbuttondisabled changes
    }, [isbuttondisabled]);

    const handleClick = () => {
        setLoading(true); // Show spinner when button is clicked
        setTimeout(() => {
            setLoading(false); // Hide spinner after specified timing
            fct(); // Call the provided function
        }, timing || 1000);
    };

    return (
        <button className='hover-cursor-pointer text-[#FFFFFF] font-lexend font-light text-[16px] leading-[24px]' onClick={handleClick} disabled={isbuttondisabled}>
            {loading ? <ImSpinner8 className={`animate-spin text-[20px] ${spincol ? `text-${spincol}` : ''}`} /> : text}
        </button>
    );
}
