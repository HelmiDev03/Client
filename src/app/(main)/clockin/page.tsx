"use client";

import { useEffect, useState } from 'react';
import styles from '../page.module.css'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { TbClock2 } from "react-icons/tb";
import { BarChart, Bar, Cell, Tooltip, } from 'recharts';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const EmployeeAttendance = () => {

  const [workingHours, setworkingHours] = useState([] as any);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());


  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const daysOfWeek = [
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
  ];


  const dispatch = useDispatch();
  const todayhour = useSelector((state: any) => state.todayhour);
  const time = useSelector((state: any) => state.time)

  useEffect(() => {
    const fecthData = () => {
      axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/attendance/history')
        .then((res: any) => {
          console.log(new Date(res.data.workingHours[res.data.workingHours.length - 1]?.date).toString().slice(0, 10) === new Date().toString()?.slice(0, 10))

          setworkingHours(res.data.workingHours)
        })
    }





    fecthData()










  }, []);


  const seconds = (time % 60).toString().padStart(2, '0');
  const minutes = Math.floor(Math.floor(time % 3600) / 60).toString().padStart(2, '0');
  const hours = Math.floor(time / 3600).toString().padStart(2, '0');




  function daysInMonth(month: any, year: any) {
    return new Date(year, month, 0).getDate() - 1;
  }



  const data = [
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 1890, pv: 4800, amt: 2181, },
    { uv: 2390, pv: 3800, amt: 2500, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 3490, pv: 4300, amt: 2100, },
    { uv: 3490, pv: 4300, amt: 2100, },
  ];
  const getPath = (x: any, y: any, width: any, height: any) => {
    const radius = 4; // Adjust the radius as needed for the desired curvature

    return `
    M${x},${y + height - radius}
    L${x},${y + radius}
    Q${x},${y},${x + radius},${y}
    L${x + width - radius},${y}
    Q${x + width},${y},${x + width},${y + radius}
    L${x + width},${y + height - radius}
    Q${x + width},${y + height},${x + width - radius},${y + height}
    L${x + radius},${y + height}
    Q${x},${y + height},${x},${y + height - radius}
    Z
  `;
  };

  const TriangleBar = (props: any) => {
    const { fill, x, y, width, height } = props;

    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  const CustomTooltip = ({ active, payload, label, workingHours, months }: any) => {
    if (active && payload && payload.length) {
      const index = parseInt(label); // Assuming label is the index of workingHours
      const time = workingHours[index]?.time || { hr: 0, min: 0, sec: 0 }; // Default to 0 if workingHours[index] doesn't exist
      const formattedTime = `${time.hr}h ${time.min}m ${time.sec}sec`;

      return (
        <div className="h-8 w-28 bg-blue-50 flex justify-center items-center rounded-md">
          <p className="text-xs font-semibold">{label + 1} {months[currentMonth]}-{formattedTime}</p>
        </div>
      );
    }
    return null; // Hide tooltip if not active
  }



  const handleClockin = () => {
    if (!todayhour.increment) {
      axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/attendance/clockin')
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: 'SET_HOURS',
            payload: { hr: res.data.time.hr, min: res.data.time.min, sec: res.data.time.sec, increment: true, lastclockin: Date.now().toString }
          })
        })
        .then(() => {
          axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/attendance/history')
            .then((res: any) => {

              setworkingHours(res.data.workingHours)
            })
        })
    }
    else {
      axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/attendance/clockout', { newdiff: { hr: hours, min: minutes, sec: seconds } })
        .then((res) => {
          console.log(res.data);
          dispatch({
            type: 'SET_HOURS',
            payload: { hr: res.data.time.hr, min: res.data.time.min, sec: res.data.time.sec, increment: false, lastclockin: Date.now().toString }
          })
        })
        .then(() => {
          axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/attendance/history')
            .then((res: any) => {

              setworkingHours(res.data.workingHours)
            })
        })

    }

  };
  const incrementMonth = () => {
    setCurrentMonth(currentMonth === 11 ? 0 : currentMonth + 1);
    if (currentMonth === 11) setCurrentYear(currentYear + 1);
  };

  const decrementMonth = () => {
    setCurrentMonth(currentMonth === 0 ? 11 : currentMonth - 1);
    if (currentMonth === 0) setCurrentYear(currentYear - 1);
  };
  console.log(workingHours)

  function toSeconds(hours: any, minutes: any, seconds: any) {
    return hours * 3600 + minutes * 60 + seconds;
  }

  // Initialize total seconds
  let totalSeconds = 0;

  // Iterate over each object in the list and sum up the total seconds
  workingHours.filter((h: any) => {
    const date = new Date(h.date); // Parse date string into Date object
    if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
      return h;
    }
  }).forEach((obj: any) => {
    totalSeconds += toSeconds(obj.time.hr, obj.time.min, obj.time.sec);
  });

  // Calculate total hours by dividing total seconds by 3600
  const totalHours = totalSeconds / 3600;
  return (
    <div className={styles.container}>
      {/* <div id="info-popup"  className=" overflow-y-auto overflow-x-hidden fixed translate-x-[500px]  top-center right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full">
  <div className="relative p-4 w-full max-w-lg h-full md:h-auto">
      <div className="relative p-4 bg-white rounded-lg shadow ">
          <div className="mb-4 text-sm font-light text-gray-500 ">
              <h3 className="mb-3 text-2xl font-bold text-gray-900 ">Unauthorized Place</h3>
              <p>
                 
Our system has detected that you are currently located outside the authorized work area. Please ensure that you are within the designated work zone to continue your work activities effectively. If you believe this is an error, please contact your manager immediately for further assistance.
              </p>
          </div>
          <div className="justify-between items-center pt-0 space-y-4 sm:flex sm:space-y-0">
              <a href="#" className="font-medium text-primary-600 hover:underline">Learn more </a>
              <div className="items-center space-y-4 sm:space-x-4 sm:flex sm:space-y-0">
                  <button id="close-modal" type="button"  className="py-2 px-4 w-full text-sm font-medium text-[#ffffff] bg-red-500 rounded-lg border border-gray-200 sm:w-auto hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 ">Close</button>
                
              </div>
          </div>
      </div>
  </div>
      </div> */}
      <section className='flex flex-col items-center gap-8'>

        <div className='flex gap-4'>
          <button onClick={decrementMonth} className='hover:rounded-full hover:bg-slate-200'><FaAngleLeft /></button>
          <h1 className='text-lg font-semibold'>{months[currentMonth]} {currentYear}</h1>
          {currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear()? null : (
            <button onClick={incrementMonth} className='hover:rounded-full hover:bg-slate-200'><FaAngleRight /></button>
          )}
        </div>
        <hr className='w-4/5' />
        <div className='flex px-16 w-full mt-14 gap-16'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-2xl font-bold flex gap-4 items-center'><TbClock2 size={30} className='text-blue-600' />Clock in</h1>
            <p className='text-md'>Record the hours you work every day. Your timesheet will then be approved by your manager.</p>
          </div>
          {currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear() ? (
            <div className='border rounded-md w-[500px] flex flex-col items-center'>
              <p className='p-3 font-bold text-sm'>{todayhour.increment ? "YOU ARE CLOCKED IN 👌" : "CLOCK IN"}</p>
              <hr className='w-full' />
              <h1 className='pt-20 text-3xl flex gap-1'>
                {todayhour.increment ? (
                  <div className="relative inline-flex">
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full absolute top-0 left-0 animate-pulse"></div>
                  </div>
                ) : null}
                {hours}h {minutes}m  {seconds}s
              </h1>
              <p className='text-sm mb-6'>Today's hours</p>
              <button onClick={handleClockin} className='my-8 bg-blue-500 text-white font-semibold hover:bg-blue-300 shadow-md rounded-md flex items-center p-2 px-4'>{todayhour.increment ? "Clock out" : "Clock in"}</button>
            </div>
          ) : null}

        </div>
        {workingHours.filter((h: any) => {
            const date = new Date(h.date); // Parse date string into Date object
            if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
              return h;
            }
          }).length === 0 ? (
          <section className='w-[90%] h-[250px] bg-slate-50 border mt-16 flex justify-center items-center rounded-md font-bold text-slate-300'>
            <p>Time Tracking has not been enabled for this month.</p>
          </section>
        ) : (
          <>
            <div className='flex w-full gap-10 mt-8'>
              <div className='flex items-center border rounded-md gap-2 p-4 w-[70%]'>
                <div className='p-2 w-[30%] border-r'>
                  <h1 className='text-xl mb-2'>{Math.floor(totalHours)}h</h1>
                  <p>Worked hours</p>
                </div>
                <div className='p-2 w-[30%] border-r'>
                  <h1 className='text-xl mb-2'>160h</h1>
                  <p>Estimated hours</p>
                </div>
                <div className='p-1 w-[40%]'>
                  <BarChart
                    width={320}
                    height={100}
                    data={data}
                  >
                    <Tooltip content={<CustomTooltip workingHours={workingHours} months={months} />} />
                    <Bar dataKey="uv" className='bg-blue-300' shape={<TriangleBar />} barSize={8}>
                      {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill="rgb(147 197 253 / 1)" />
                      ))}
                    </Bar>
                  </BarChart>
                </div>
              </div>
              <div className='border rounded-md w-[20%] flex flex-col justify-center items-center'>
                <h1 className='text-xl'>0h</h1>
                <p>Balence</p>
              </div>
            </div>
            <section className='w-[97%] h-full border rounded-md py-5'>
              <p className='flex gap-2 items-center text-blue-600 px-3'><h1 className='font-bold'>STATE</h1> <p className='text-sm font-semibold flex gap-2 items-center bg-slate-100 p-2 rounded-lg'><div className='w-2 h-2 rounded-full bg-gray-400'></div>In progress</p>This timesheet corresponds to an open period.</p>
              <hr className='my-5' />
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      DAY
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Worked hours
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: daysInMonth(currentMonth, currentYear) }, (_, index) => {
                    const dayOfMonth = index + 1;
                    const date = String(new Date(currentYear, currentMonth, dayOfMonth + 1).toISOString().split('T')[0]);

                    const matchingEntry = workingHours.filter((h: any) => {
                      const date = new Date(h.date); // Parse date string into Date object
                      if (date.getMonth() === currentMonth && date.getFullYear() === currentYear) {
                        return h;
                      }
                    }).find((entry: any) => entry.date.slice(0, 10) === date);


                    return (
                      <tr key={dayOfMonth} className="bg-white border-b ">
                       {matchingEntry && <th scope="row" className="px-6 py-4 font-bold text-xl text-gray-900 whitespace-nowrap ">
                          {dayOfMonth} {months[currentMonth]}
                        </th> }
                      {matchingEntry &&  <td className="px-6 py-4">
                          {/* Display time if entry exists for the day, otherwise display 'Worked 0h' */}
                          {`Worked ${matchingEntry.time.hr}h ${matchingEntry.time.min}m ${matchingEntry.time.sec}s` }
                        </td> }
                      </tr> 
                    ); 
                  })}
                </tbody>

              </table>
            </section>
          </>
        )}
      </section>
    </div>
  )
}

export default EmployeeAttendance