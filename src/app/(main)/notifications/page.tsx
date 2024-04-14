'use client'
import { MdOutlineHourglassEmpty } from "react-icons/md";
import styles from './page.module.css'
import { IoIosCalendar, IoMdClose } from "react-icons/io";
import { IoDocumentOutline } from "react-icons/io5";

import { CiTimer } from "react-icons/ci";
import axios from 'axios'
import React, { useState } from 'react'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import { TextareaInput } from '@/app/(components)/Inputs/textarea'
import { useDispatch } from "react-redux";
import { InputTextarea } from "primereact/inputtextarea";
const Notifications = () => {
  const [PopupAcceptOrRejectLeaveRequest, setPopupAcceptOrRejectLeaveRequest] = React.useState(false)
  const [notifications, setNotifications] = React.useState([])
  const [popupText, setPopupText] = React.useState('')
  const [selecteduser, setSelectedUser] = React.useState({ firstname: '', lastname: '' })
  const [timeoffid, setTimeoffid] = React.useState('')
  const [notif, setnotifid] = React.useState('')
  const [response, setResponse] = React.useState('')
  const dispatch = useDispatch()

  React.useEffect(() => {
    const fetchNotifications = async () => {
      axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/notifications')
        .then((res) => {
          setNotifications(res.data.notifications)
          axios.put(process.env.NEXT_PUBLIC_DOMAIN + '/api/notifications/seen')
            .then((res) => {
              dispatch({
                type: 'SET_NOTIFICATIONS_COUNT',
                payload: 0
              });
            })

            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => {
          console.log(err)
        })
    }

    fetchNotifications()
  }, [notif])


  const [currentPage, setCurrentPage] = useState(1);
  const MAX_ENTRIES = 3; // Maximum entries to display at once

  const paginatednotifications = notifications.slice((currentPage - 1) * MAX_ENTRIES, currentPage * MAX_ENTRIES);

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };


  const UpdateTimeoff = async () => {
    axios.put(process.env.NEXT_PUBLIC_DOMAIN + '/api/policy/updatetimeoff/' + timeoffid, { etat: popupText === 'Accept' ? 'Approved' : 'Rejected', response })
      .then((res: any) => {
        axios.delete(process.env.NEXT_PUBLIC_DOMAIN + '/api/notifications/delete/' + notif)
          .then(() => {
            window.location.reload()
          })
      })
  }


  return (
    <div className={styles.container}>

      <div className='flex justify-between flex-col p-12 w-[850px] '>



        {paginatednotifications.map((notif: any) => (
          <>

            {notif.content.reason === 'Time off request' && (
              <div key={notif._id} className='flex justify-between items-center flex-row mr-2 mb-4 border border-gray-300 rounded-[10px] p-8  '>
                <div className='w-[60px] h-[60px] rounded-[50% ] mr-3'>
                  <img src={notif.content.user.profilepicture ? notif.content.user.profilepicture : '/defaultprofilepicture.png'} alt='profile' className='rounded-[50%]' />
                </div>
                <div className='flex justify-between flex-col mr-12 '>
                  <p className='mb-2 font-lexend text-body-1 font-bold text-[#16151C] text-base leading-6 tracking-normal text-left '>{notif.content.user.firstname} {notif.content.user.lastname}  <span className='font-lexend text-caption font-light text-[#A2A1A8] text-sm leading-5 tracking-normal '>time off request is pending</span></p>
                  <p className='mb-2 flex flex-row font-lexend text-caption font-normal text-[#A2A1A8] text-sm leading-5 tracking-normal '><IoIosCalendar className='mr-2 text-[#7152F3] text-[20px] ' />{notif.content.type}  from {notif.content.startdate.slice(0, 10)}  to {notif.content.enddate.slice(0, 10)}</p>
                  <p className='mb-2 font-lexend text-caption flex flex-row font-normal text-[#A2A1A8] text-sm leading-5 tracking-normal '><CiTimer className='mr-2 text-[#7152F3] text-[20px] ' /> requested at  : {notif.createdAt.slice(0, 10)} </p>
                  {notif.content.file && <div onClick={()=>window.location.href =notif.content.file} className='hover:cursor-pointer bg-white-500 border-[2px]  flex flex-row  justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                    <IoDocumentOutline className='mr-2 text-[#7152F3] text-[20px] ' />          <h3 className='text-[14px] text-[#7152F3]'>View Media Attached </h3>


                  </div>}
                  {!notif.content.file && <div className='bg-white-500 border-[2px]  flex flex-row  justify-center items-center border-[#7152F3] w-[150px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                    <IoDocumentOutline className='mr-2 text-[#7152F3] text-[20px] ' />          <h3 className='text-[14px] text-[#7152F3]'>No Media Attached </h3>


                  </div>}

                </div>

                <div className='flex justify-between flex-row '>
                  <button onClick={() => { setPopupText('Accept'); setnotifid(notif._id); setSelectedUser({ firstname: notif.content.user.firstname, lastname: notif.content.user.lastname }); setTimeoffid(notif.content.timeoffid); setPopupAcceptOrRejectLeaveRequest(true) }} className='border border-green-500 rounded-[10px] mr-6 w-[100px] h-[30px] text-[#137437] font-lexend text-caption font-bold text-sm leading-5 tracking-normal  p-1'>Accept</button>
                  <button onClick={() => { setPopupText('Reject'); setnotifid(notif._id); setSelectedUser({ firstname: notif.content.user.firstname, lastname: notif.content.user.lastname }); setTimeoffid(notif.content.timeoffid); setPopupAcceptOrRejectLeaveRequest(true) }} className='border border-red-500 text-red-500  rounded-[10px] w-[100px] h-[30px] font-lexend text-caption font-bold text-sm leading-5 tracking-normal p-1'>Reject</button>
                </div>

              </div>
            )}


            {notif.content.reason === 'Time off request Answered' && (
              <div key={notif._id} className='flex justify-between items-center flex-row mr-2 mb-4 border border-gray-300 rounded-[10px] p-6  '>
                <div className='w-[60px] h-[60px] rounded-[50% ] mr-3'>
                  <img src={notif.content.user.profilepicture ? notif.content.user.profilepicture : '/defaultprofilepicture.png'} alt='profile' className='rounded-[50%]' />
                </div>
                <div className='flex justify-between flex-col mr-12 '>
                  <p className='mb-2 font-lexend text-body-1 font-bold text-[#16151C] text-base leading-6 tracking-normal text-left '>{notif.content.user.firstname} {notif.content.user.lastname}  <span className='font-lexend text-caption font-light text-[#A2A1A8] text-sm leading-5 tracking-normal '>has answred your time off request</span></p>
                  <p className='mb-2 flex flex-row font-lexend text-caption font-normal text-[#A2A1A8] text-sm leading-5 tracking-normal '><IoIosCalendar className='mr-2 text-[#7152F3] text-[20px] ' />{notif.content.type}  from {notif.content.startdate.slice(0, 10)}  to {notif.content.enddate.slice(0, 10)}</p>
                  <p className='mb-2 font-lexend text-caption flex flex-row font-normal text-[#A2A1A8] text-sm leading-5 tracking-normal '><CiTimer className='mr-2 text-[#7152F3] text-[20px] ' /> Answredat at  : {notif.content.answredat.slice(0, 10)} </p>
                  <p className='mb-2 font-lexend text-caption flex flex-row font-normal text-[#A2A1A8] text-sm leading-5 tracking-normal '><CiTimer className='mr-2 text-[#7152F3] text-[20px] ' /> Response  : {notif.content.response} </p>


                </div>

                <div className='flex justify-between flex-row '>
                  {notif.content.etat === 'Approved' && <span className='border border-green-500 rounded-[10px] mr-6 w-[100px] h-[30px] text-[#137437] font-lexend text-caption font-bold text-sm leading-5 tracking-normal text-center  p-1'>Accepted</span>}
                  {notif.content.etat === 'Rejected' && <span className='border border-red-500 text-red-500 translate-x-[-20px]  rounded-[10px] w-[100px] h-[30px] font-lexend text-caption font-bold text-sm leading-5 tracking-normal text-center p-1'>Rejected</span>}
                </div>

              </div>
            )}



          </>


        )







        )}

        {notifications.length > MAX_ENTRIES && (
          <div className="flex justify-center">
            <button onClick={handlePrevPage} hidden={currentPage === 1} className="bg-gray-200 text-gray-600 px-4 py-2 mr-[150px] rounded-md">Previous</button>
            <button onClick={handleNextPage} hidden={currentPage * MAX_ENTRIES >= notifications.length} className="bg-gray-200 text-gray-600 px-4 py-2 rounded-md">Next</button>
          </div>

        )}

























        {notifications.length === 0 &&
          <div className='flex text-gray-500 justify-center items-center flex-col mr-2 mb-4 border border-gray-300 rounded-[10px] p-8  '>
            <MdOutlineHourglassEmpty className="text-[20px] text-[#7152F3] mb-3" />   No notifications yet
          </div>}


      </div>







































      {/* in case accept/reject timeoff reqsuest */}
      <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.2)" }} className={` ${PopupAcceptOrRejectLeaveRequest ? 'block' : 'hidden'}           p-4 z-10  shadow-lg  absolute w-[350px] translate-x-[830px]  translate-y-[50px] center rounded-[25px] `}>
        <IoMdClose onClick={() => { setPopupAcceptOrRejectLeaveRequest(!PopupAcceptOrRejectLeaveRequest) }} className='absolute right-[2%] text-[24px] hover:cursor-pointer' />
        <div className=" max-w-md">

          <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>{popupText} {selecteduser.firstname}  {selecteduser.lastname}'s time off request Leave </div>
         
        <textarea className="bg-[#EBE8EF] ml-9 mb-4 mt-3 pl-4" value={response} onChange={(e) => setResponse(e.target.value)} rows={5} cols={30} />



          <div>
            <div className=' bg-white-500 border-[2px] translate-x-[60px] flex justify-center items-center border-[#7152F3] w-[100px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
              <ButtonSubmit fct={UpdateTimeoff} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>{popupText}  </h3>} />


            </div>
          </div>
        </div>
      </div>



      {/* end of add policy */}
    </div>
  )
}

export default Notifications
