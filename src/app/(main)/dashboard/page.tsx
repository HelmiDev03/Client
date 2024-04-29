"use client";


import axios from 'axios';
import { FaChevronLeft, FaChevronRight, FaInbox } from "react-icons/fa6";
import { GoEye } from "react-icons/go";
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';


const Dashboard = () => {
  const todayhour = useSelector((state: any) => state.todayhour);
  const [PendingTimeoffs, setPendingTimeoffs] = useState([]);
  const [Activeprojects, setActiveprojects] = useState([]);
  const [EmployeesTimeoffs, setEmployeesTimeoffs] = useState([]);
  const [inboxZero, setInboxZero] = useState(false);
  const [dates, setDates] = useState([]);


  const StatusCellRenderer = () => {


    return (
      <div className={`flex flex-row justify-center items-center translate-x-[-10px] bg-[#C9F1F5]  rounded-[10px] p-1 w-[100px] h-[30px] `}>
        <div className="_1f91gq20">
          <div className="_1m2pwdr0 _1m2pwdr6 _1m2pwdr8  mr-3 w-[10px] mr-3`}" style={{ minWidth: '10px', minHeight: '10px', borderRadius: '50%', backgroundColor: 'rgb(57, 181, 190)' }}></div>
        </div>
        <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px]'>Active</p>
      </div>
    )
  };
  const AssignedToRenderCell = (props: { row: any }) => {
    const { row } = props;

    return (


      <div className={`${row.projectUsers.length <= 6 ? "translate-x-[70px]" : "translate-x-[80px]"} w-[150px] pr-12 py-2 flex flex-row justify-center items-center flex flex-row `}>
        {row.projectUsers.slice(0, 6).map((user: any) => (
          <img onClick={() => { router.push('/employees/' + user.user._id) }} key={user.id} src={user.user.profilepicture ? user.user.profilepicture : '/defaultprofilepicture.png'} alt="" className='w-[36px] h-[36px] rounded-[50%] mr-2 hover:cursor-pointer' />
        ))}
        {row.projectUsers.length > 6 && (
          <p className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] '>+{row.projectUsers.length - 6}</p>
        )}

      </div>


    );
  };

  const ActionsCellRenderer = (props: { row: any }) => {
    const { row } = props;







    return (
      <>
        <div onClick={() => { router.push('projects/' + row.projectid) }} className='p-2 mr-4 translate-x-[15px] rounded-[50%] w-[35px] height-[35px] flex justify-center items-center border border-gray-300 hover:border hover:border-gray-500'>
          <button type="submit"      ><GoEye className='  font-lexend font-lexend  leading-[20px] text-[#7152F3] text-[20px]' /></button>
        </div>



      </>

    );
  };
  const columns: GridColDef<(typeof rows)[number]>[] = [
    {
      field: 'firstName',
      headerName: 'Project Name',
      width: 150,
    },
    {
      field: 'lastName',
      headerName: 'Collaborators',
      width: 300,

      headerClassName: 'translate-x-[60px] ',

      renderCell: (params) => <AssignedToRenderCell row={params.row} />

    },
    {
      field: 'age',
      headerName: 'Status',
      width: 100,
      renderCell: (params) => <StatusCellRenderer />
    },
    {
      field: 'hth',
      headerName: 'Action',
      type: 'number',
      width: 50,
      renderCell: (params) => <ActionsCellRenderer row={params.row} />
    }

  ];



  const rows = Activeprojects?.map((project: any) => {
    return {
      id: project._id,
      firstName: project.name,
      lastName: project.collaborators,
      projectid: project._id,
      projectUsers: project.users,

    }
  });









  useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/policy/getpendingtimeoff').then((res) => {
      console.log(res.data.PendingTimeoffs);
      setPendingTimeoffs(res.data.PendingTimeoffs.filter((timeoff: any) => timeoff.userId !== null));
      if (res.data.length === 0) {
        setInboxZero(true);
      }
    });

    axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/activeprojects')
      .then((res) => {

        setActiveprojects(res.data.Activeprojects);
      });

    axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/policy/getacceptedtimeoff')
      .then((res) => {

        setEmployeesTimeoffs(res.data.result);
      });
  }, []);

  const router = useRouter();

  const getDaysInMonth = (month: number, year: number) => {
    const date = new Date(year, month, 0);
    const days = date.getDate();
    return days;
  };

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const handleLeftClick = () => {
    setCurrentMonth((prevMonth: any) => {
      if (prevMonth === 1) {
        setCurrentYear(prevYear => prevYear - 1);
        return 12; // December
      }
      return prevMonth - 1;
    });
  };

  // Function to handle clicking on the right arrow
  const handleRightClick = () => {
    setCurrentMonth((prevMonth: any) => {
      if (prevMonth === 12) {
        setCurrentYear(prevYear => prevYear + 1);
        return 1; // January
      }
      return prevMonth + 1;
    });
  };
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="mt-20 flex flex-col gap-4 ml-5 p-4">
      <section className='w-full flex gap-4'>
        <div className='border rounded-md w-[300px] h-[280px] flex flex-col items-center'>
          <p className='p-3 font-bold text-sm'>CLOCK IN/OUT</p>
          <hr className='w-full' />
          <h1 className='pt-20 text-3xl flex gap-1'>

            {todayhour.hr}h {todayhour.min}m  {todayhour.sec}s
          </h1>
          <p className='text-sm mb-6'>Today's hours</p>

        </div>
        <div className='border rounded-md w-[300px] h-[280px] flex flex-col items-center'>
          <p className='p-3 font-bold text-sm'>INBOX</p>
          <hr className='w-full' />
          {PendingTimeoffs.length == 0 ? (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <FaInbox size={30} color='grey' />
              <p className='text-sm mt-8 text-gray-500'>Nice job!</p>
              <p className='text-sm text-gray-500'>You've answerd all pending requests</p>
            </div>
          ) : (
            <div className='w-full h-full overflow-y-scroll'>
              <ul role="list" className="divide-y divide-gray-200">

                {PendingTimeoffs?.map((timeoff: any) => (
                  <li onClick={() => router.push('/notifications')} key={timeoff._id} className="p-3 hover:cursor-pointer">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img className="w-8 h-8 rounded-md" src={timeoff.userId.profilepicture ? timeoff.userId.profilepicture : "/defaultprofilepicture.png"} alt="Neil image" />
                      </div>
                      <p className="text-sm text-gray-500 ms-4">
                        {timeoff.userId.firstname}  {timeoff.userId.lastname}'s time off approval request is pending
                      </p>
                    </div>
                  </li>
                ))}


              </ul>
            </div>
          )}
        </div>
        <div className='border rounded-md w-[60%] h-[280px] flex flex-col items-center'>
          <p className='p-3 font-bold text-sm'>ACTIVE PROJECTS</p>
          <hr className='w-full' />
          {Activeprojects.length === 0 ? (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <FaInbox size={30} color='grey' />
              <p className='text-sm mt-8 text-gray-500'>Great job!</p>
              <p className='text-sm text-gray-500'>All Projects are done</p>
            </div>
          ) : (
            <div className='w-full h-full'>
              <Box sx={{ height: 235, width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: {
                        pageSize: 5,
                      },
                    },
                  }}
                  pageSizeOptions={[5]}
                />
              </Box>
            </div>
          )}
        </div>
      </section>
      <section className='border rounded-md w-full h-[300px] flex flex-col items-center'>
        <p className='p-3 font-bold text-sm'>TIME OFF CALENDAR</p>
        <div className='flex flex-row'>
          <FaChevronLeft onClick={handleLeftClick} className='translate-y-[14px]' />
          <p className='p-3 font-bold text-sm'>{`${new Date(currentYear, currentMonth - 1).toLocaleString('default', { month: 'long' })} ${currentYear}`}</p>
          <FaChevronRight onClick={handleRightClick} className='translate-y-[14px]' />
        </div>
        <hr className='w-full' />
        <div className='w-full overflow-auto'>
          <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
            <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
              <tr>
                <th scope="col" className="w-[170px]">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search Employees"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      required
                    />
                  </div>
                </th>
                {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, (_, i) => i + 1).map((day) => (
                  <th scope="col" key={day} className="p-2">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {EmployeesTimeoffs.filter((employeeTimeOffs: any) =>
                employeeTimeOffs.user.fullname.toLowerCase().includes(searchQuery.toLowerCase())
              ).map((employeeTimeOffs: any) => (
                <tr key={employeeTimeOffs.user.firstname} className='bg-white border-b' onClick={() => router.push('/Employeeleaves/?employeeid=' + employeeTimeOffs.user._id + '&policyid=' + employeeTimeOffs.user.policy + '&fullname=' + employeeTimeOffs.user.fullname + '&profilepicture=' + employeeTimeOffs.user.profilepicture)} style={{ cursor: 'pointer' }}>
                  <th scope="row" className="p-3 font-medium text-gray-900 whitespace-nowrap flex items-center gap-3">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-md bg-slate-200" src={employeeTimeOffs.user.profilepicture ? employeeTimeOffs.user.profilepicture : "/defaultprofilepicture.png"} alt={`${employeeTimeOffs.user.firstname} image`} />
                    </div>
                    <span className='w-[150px] text-wrap'>{`${employeeTimeOffs.user.fullname}`}</span>
                  </th>
                  {Array.from({ length: getDaysInMonth(currentMonth, currentYear) }, (_, i) => i + 1).map((day) => {
                    const acceptedTimeOff = employeeTimeOffs.timeoffs.find((timeOff: any) => {
                      const [start, end] = timeOff.daterange.map((date: any) => new Date(date));
                      const currentDate = new Date(currentYear, currentMonth - 1, day + 1);
                      return currentDate >= start && currentDate <= end;
                    });

                    const cellClassName = acceptedTimeOff ? 'p-2 bg-blue-100' : 'p-2';

                    return (
                      <th scope="col" key={day} className={cellClassName}>{day}</th>
                    );
                  })}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>

      {/*
  <section className='w-full flex gap-4'>

        <div className='border rounded-md w-[60%] h-[280px] flex flex-col items-center'>
          <p className='p-3 font-bold text-sm'>HOLIDAYS</p>
          <hr className='w-full' />
          {inboxZero ? (
            <div className='w-full h-full flex flex-col items-center justify-center'>
              <FaInbox size={30} color='grey' />
              <p className='text-sm mt-8 text-gray-500'>Nice job!</p>
              <p className='text-sm text-gray-500'>You've answerd all pending requests</p>
            </div>
          ) : (
            <div className='w-full h-full overflow-y-scroll'>
              <ul role="list" className="divide-y divide-gray-200">
              </ul>
            </div>
          )}
        </div>
      </section>*/}

    </div>


  );
}

export default Dashboard