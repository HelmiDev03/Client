'use client'
import React, { useState } from 'react';
import { Calendar } from 'primereact/calendar';
import styles from '@/app/(main)/page.module.css';

const Leaves = () => {
    const [date, setDate] = useState(null);
   function dateTemplate(date:any) {
    if (date.day > 10 && date.day < 14) {
        return (
            <div style={{backgroundColor: '#7152F3', color: '#ffffff', display:'flex' , justifyContent:'center', borderRadius: '50%', width: '2em', height: '2em', lineHeight: '2em', padding: 0}}>{date.day}</div>
        );
    }
    else {
        return date.day;
    }
}


    return (
        <div className={styles.container}>
            <div className='flex flex-row justify-between items-center h-[200px] mb-[44px]'>
                <div className='text-[#16151C] font-lexend font-semibold text-[20px] leading-[30px] mb-4'>table</div>
                <div className="card flex justify-content-center mt-[250px] mr-[50px]">
          
                    <Calendar
                        value={date}
                        inline
                        showWeek
                        selectionMode="single"
                        readOnlyInput={true}
                    
                        dateTemplate={dateTemplate}
                    />
                </div>
            </div>
        </div>
    );
}

export default Leaves;


