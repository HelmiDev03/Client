'use client'
import styles from './page.module.css'
import { IoIosCalendar, IoMdClose } from "react-icons/io";
import { CiTimer } from "react-icons/ci";
import axios from 'axios'
import React from 'react'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import {TextareaInput} from '@/app/(components)/Inputs/textarea'
const Notifications = () => {
  const [PopupAcceptOrRejectLeaveRequest, setPopupAcceptOrRejectLeaveRequest] = React.useState(false)
   const [notifications , setNotifications] = React.useState([])
  const [popupText , setPopupText] = React.useState('')
  const [selecteduser , setSelectedUser] = React.useState({firstname:'',lastname:'' })
  const [timeoffid , setTimeoffid] = React.useState('')
  const [notif,setnotifid] = React.useState('')
  const [response , setResponse] = React.useState('')


 React.useEffect(() => {
     const fetchNotifications = async() =>{
      axios.get('http://localhost:5000/api/notifications')
      .then((res) => {
         setNotifications(res.data.notifications)
       })
       .catch((err) => {
           console.log(err)
         })
     }

      fetchNotifications()
 },[]) 


 const UpdateTimeoff = async ()=>{
  axios.put('http://localhost:5000/api/policy/updatetimeoff/'+timeoffid , {etat : popupText ==='Accept' ? 'Approved':'Rejected' , response})
  .then((res: any)=>{
    axios.delete('http://localhost:5000/api/notifications/delete/'+notif)
    .then(()=>{
      window.location.reload()
    })
  })
 }


  return (
    <div className={styles.container}>

      <div className='flex justify-between flex-col p-12 w-[850px] '>
       
       

        {notifications.map((notif:any) => (
          notif.content.reason === 'Time off request' && (
            <div className='flex justify-between items-center flex-row mr-2 mb-4 border border-gray-300 rounded-[10px] p-8  '>
          <div className='w-[60px] h-[60px] rounded-[50% ] mr-3'>
            <img src={notif.content.user.profilepicture} alt='profile' className='rounded-[50%]' />
          </div> 
          <div className='flex justify-between flex-col mr-12 '>
            <p className='mb-2 font-lexend text-body-1 font-bold text-[#16151C] text-base leading-6 tracking-normal text-left '>{notif.content.user.firstname} {notif.content.user.lastname}  <span className='font-lexend text-caption font-light text-[#A2A1A8] text-sm leading-5 tracking-normal '>time off request is pending</span></p>
            <p className='mb-2 flex flex-row font-lexend text-caption font-normal text-[#A2A1A8] text-sm leading-5 tracking-normal '><IoIosCalendar className='mr-2 text-[#7152F3] text-[20px] ' />{notif.content.type}  from {notif.content.startdate.slice(0,10)}  to {notif.content.enddate.slice(0,10)}</p>
            <p className='mb-2 font-lexend text-caption flex flex-row font-normal text-[#A2A1A8] text-sm leading-5 tracking-normal '><CiTimer className='mr-2 text-[#7152F3] text-[20px] ' /> requested at  : {notif.createdAt.slice(0,10)} </p>
           

          </div>

          <div className='flex justify-between flex-row '>
            <button onClick={() => { setPopupText('Accept');setnotifid(notif._id); setSelectedUser({ firstname: notif.content.user.firstname, lastname: notif.content.user.lastname });setTimeoffid( notif.content.timeoffid) ;setPopupAcceptOrRejectLeaveRequest(true) }} className='border border-green-500 rounded-[10px] mr-6 w-[100px] h-[30px] text-[#137437] font-lexend text-caption font-bold text-sm leading-5 tracking-normal  p-1'>Accept</button>
            <button onClick={() => { setPopupText('Reject'); setnotifid(notif._id);setSelectedUser({ firstname: notif.content.user.firstname, lastname: notif.content.user.lastname });setTimeoffid( notif.content.timeoffid) ;setPopupAcceptOrRejectLeaveRequest(true) }}  className='border border-red-500 text-red-500  rounded-[10px] w-[100px] h-[30px] font-lexend text-caption font-bold text-sm leading-5 tracking-normal p-1'>Reject</button>
          </div>

        </div>
          ))
        )}


      </div>







































        {/* in case accept/reject timeoff reqsuest */}
        <div style={{ boxShadow: "inset 0 0 10px 0 rgba(0, 0, 0, 0.2)" }} className={` ${PopupAcceptOrRejectLeaveRequest ? 'block' : 'hidden'}           p-4 z-10 bg-[#eee] shadow-lg  absolute w-[350px] translate-x-[830px]  translate-y-[50px] center rounded-[25px] `}>
                <IoMdClose onClick={() =>{  setPopupAcceptOrRejectLeaveRequest(!PopupAcceptOrRejectLeaveRequest)}} className='absolute right-[2%] text-[24px] hover:cursor-pointer' />
                <div className=" max-w-md">

                    <div className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>{popupText } {selecteduser.firstname}  {selecteduser.lastname}'s time off request Leave </div>
                    <div className='text-[#16151C] font-lexend font-light text-[14px] leading-[22px] mb-4'>view employee time off history </div>
                    <TextareaInput onChange={(e:any)=>setResponse(e.target.value)} placeholder='write a short response' />


                
                    <div>
                        <div className=' bg-white-500 border-[2px] translate-x-[60px] flex justify-center items-center border-[#7152F3] w-[100px] h-[30px] w-[250px] text-white rounded-[10px] p-1  ' >
                            <ButtonSubmit fct={UpdateTimeoff}  spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>{popupText }  </h3>} />


                        </div>
                    </div>
                </div>
            </div>



            {/* end of add policy */}
    </div>
  )
}

export default Notifications
