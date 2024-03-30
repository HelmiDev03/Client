'use client'
import ButtonSubmit from '@/app/(components)/ButtonSubmit/Button';
import axios from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';
import { HiUsers } from "react-icons/hi2";
import { IoIosSettings } from "react-icons/io";
import { IoMdLogOut } from "react-icons/io";

const Permissions = () => {
  const { group } = useParams();
  const [viewemployeespage, setViewEmployeesPage] = React.useState(false)
  const [viewemployeedetails, setViewEmployeeDetails] = React.useState(false)
  const [editemployeedetails, setEditEmployeeDetails] = React.useState(false)
  const [deleteemployee, setDeleteEmployee] = React.useState(false)
  const [addemployee, setAddEmployee] = React.useState(false)
  const [viewcompanysettings, setViewCompanySettings] = React.useState(false)
  const [editcompanysettings, setEditCompanySettings] = React.useState(false)
  const [answertimeoffrequest, setAnswerTimeOffRequest] = React.useState(false)
  const [viewtimeoffpoliciespage, setViewTimeOffPoliciesPage] = React.useState(false)
  const [viewtimeoffpolicydetails, setViewTimeOffPolicyDetails] = React.useState(false)
  const [addnewtimeoffpolicy, setAddNewTimeOffPolicy] = React.useState(false)
  const [removeatimeoffpolicy, setRemoveATimeOffPolicy] = React.useState(false)
  const [updatethedefaultpolicy, setUpdateTheDefaultPolicy] = React.useState(false)
  const [addanationalday, setAddANationalDay] = React.useState(false)
  const [deleteanationalday, setDeleteANationalDay] = React.useState(false)
  const [editpolicyconfiguration, setEditPolicyConfiguration] = React.useState(false)
  const [addanewemployeetoapolicy, setAddANewEmployeeToAPolicy] = React.useState(false)
  const [changeemployeepolicy, setChangeEmployeesPolicy] = React.useState(false)
  const [isCustom, setIsCustom] = React.useState(false)
  const [isUserinAdmins , setIsUserinAdmins] = React.useState(false)
  const handleCheckboxChange = (setState: any) => {
    setState((prevState: any)=> !prevState);

  };

  const Update = () => { }


  React.useEffect(() => {
    const fetchdata = () => {
      axios.get(`http://localhost:5000/api/permissions/${group}`)
        .then((res) => {
          setIsCustom(res.data.permissionGroup.iscustom)
          setViewEmployeesPage(res.data.permissionGroup.viewallemployees)
          setViewEmployeeDetails(res.data.permissionGroup.viewemployeedetails)
          setEditEmployeeDetails(res.data.permissionGroup.editemployeedetails)
          setDeleteEmployee(res.data.permissionGroup.deleteemployee)
          setAddEmployee(res.data.permissionGroup.addnewemployee)
          setViewCompanySettings(res.data.permissionGroup.viewcompanydetails)
          setEditCompanySettings(res.data.permissionGroup.editcompanyinfo)
          setAnswerTimeOffRequest(res.data.permissionGroup.answertimeOffrequests)
          setViewTimeOffPoliciesPage(res.data.permissionGroup.viewtimeoffpiliciespage)
          setViewTimeOffPolicyDetails(res.data.permissionGroup.viewtimeoffpolicydetails)
          setAddNewTimeOffPolicy(res.data.permissionGroup.addnewtimeoffpolicy)
          setRemoveATimeOffPolicy(res.data.permissionGroup.removepolicy)
          setUpdateTheDefaultPolicy(res.data.permissionGroup.setpolicyasdefault)
          setAddANationalDay(res.data.permissionGroup.addnationalday)
          setDeleteANationalDay(res.data.permissionGroup.deletenationaldays)
          setEditPolicyConfiguration(res.data.permissionGroup.editpolicyconfig)
          setAddANewEmployeeToAPolicy(res.data.permissionGroup.addnewemployeetoapolicy)
          setChangeEmployeesPolicy(res.data.permissionGroup.changeemployeepolicy)




        })
    axios.get(`http://localhost:5000/api/permissions/usergroup`)   
    
      .then((res) => {
        setIsUserinAdmins(res.data.isadministrators)
      })
      .catch((err) => {
        console.log(err)
      })
                   
   
    }
                  
    fetchdata()
  },[])

  return (
    <div className='translate-x-[-10%]'>
   {isCustom && isUserinAdmins&&   <div className=' bg-white-500 border-[2px] translate-y-[-80px]  translate-x-[900px] flex justify-center items-center border-[#7152F3] w-[90px] h-[50px] w-[250px] text-white rounded-[10px] p-1  ' >
        <ButtonSubmit fct={Update} spincol='[#7152F3]' timing={200} text={<h3 className='text-[14px] text-[#7152F3]'>Update</h3>} />


      </div> }

      <div className='flex flex-col justify-center items-center mb-12 '>
        <div className='flex flex-row mb-3 '>
          <HiUsers className='text-[24px] text-[#7152F3] mr-3 mt-[2px]' />
          <h1 className='text-[#7152F3] font-lexend font-semibold text-[20px] leading-[30px]'>Employees</h1>
        </div>


        <div className='flex flex-row '>
          <div className='mr-6 w-[450px]  p-4 rounded-[10px] justify-center  flex flex-col border border-gray-300 '>

            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>View Employees Page</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to view the employees page
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setViewEmployeesPage)} checked={viewemployeespage} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>

            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row mb-2'>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>View Employee Details</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to view other employees profile
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setViewEmployeeDetails)} checked={viewemployeedetails} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row mb-2'>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Edit Employee Details</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to edit other employees profile
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setEditEmployeeDetails)} checked={editemployeedetails} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>

          </div>

          <div className='w-[450px]  p-4 rounded-[10px] justify-center  flex flex-col border border-gray-300 '>

            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row'>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Delete Employee</h1>
                  <p className='text-gray-500 font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to delete other employees account
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setDeleteEmployee)} checked={deleteemployee} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row'>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Add A New  Employee</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to create a new employee account
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setAddEmployee)} checked={addemployee} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
          </div>

        </div>
      </div>


      <div className='flex flex-col justify-center items-center mb-12 '>
        <div className='flex flex-row mb-3 '>
          < IoIosSettings className='text-[24px] text-[#7152F3] mr-3 mt-[1px]' />
          <h1 className='text-[#7152F3] font-lexend font-semibold text-[20px] leading-[30px]'>Company Settings</h1>
        </div>


        <div className='flex flex-row '>
          <div className='mr-6 w-[450px]  p-4 rounded-[10px] justify-center  flex flex-col border border-gray-300 '>

            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>View Company Settings</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to view the company settings page
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setViewCompanySettings)} checked={viewcompanysettings} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>



          </div>





          <div className='w-[450px]  p-4 rounded-[10px] justify-center  flex flex-col border border-gray-300 '>

            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row'>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Edit Company Settings</h1>
                  <p className='text-gray-500 font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to edit the company settings
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setEditCompanySettings)} checked={editcompanysettings} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>

          </div>

        </div>
      </div>



      <div className='flex flex-col justify-center items-center mb-12 '>
        <div className='flex flex-row mb-3 '>
          < IoIosSettings className='text-[24px] text-[#7152F3] mr-3 mt-[1px]' />
          <h1 className='text-[#7152F3] font-lexend font-semibold text-[20px] leading-[30px]'>Time Off</h1>
        </div>


        <div className='flex flex-row '>
          <div className='mr-6 w-[900px]  p-4 rounded-[10px] justify-center  flex flex-col border border-gray-300 '>

            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Answer A time Off Request</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to accept or reject a time off request
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setAnswerTimeOffRequest)} checked={answertimeoffrequest} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>



          </div>







        </div>
      </div>



      <div className='flex flex-col justify-center items-center mb-12 '>
        <div className='flex flex-row mb-3 '>
          < IoMdLogOut className='text-[24px] text-[#7152F3] mr-3 mt-[1px]' />
          <h1 className='text-[#7152F3] font-lexend font-semibold text-[20px] leading-[30px]'>Time Off Policies</h1>
        </div>


        <div className='flex flex-row '>
          <div className='mr-6 w-[450px]  p-4 rounded-[10px] justify-center  flex flex-col border border-gray-300 '>

            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>View Time Off Policies Page</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to view the time off policies page
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setViewTimeOffPoliciesPage)} checked={viewtimeoffpoliciespage} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>View Time Off Policy Details</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to view the time off policy details
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setViewTimeOffPolicyDetails)} checked={viewtimeoffpolicydetails} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Add A New Time Off Policy</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to add a new time off policy
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setAddNewTimeOffPolicy)} checked={addnewtimeoffpolicy} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Remove A Time Off Policy</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to delete a time off policy
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setRemoveATimeOffPolicy)} checked={removeatimeoffpolicy} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Update The Default Policy</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to change the default time off policy
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setUpdateTheDefaultPolicy)} checked={updatethedefaultpolicy} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>



          </div>





          <div className='w-[450px]  p-4 rounded-[10px] justify-center  flex flex-col border border-gray-300 '>


            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Add A National Day</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to add a new national day to the calendar
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setAddANationalDay)} checked={addanationalday} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Delete A National Day </h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to  delete a national day from the calendar
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setDeleteANationalDay)} checked={deleteanationalday} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Edit Policy Configuration</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to edit the policy configuration settings
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setEditPolicyConfiguration)} checked={editpolicyconfiguration} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Add A New Employee To A Policy</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to add a new employee to a policy
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setAddANewEmployeeToAPolicy)} checked={addanewemployeetoapolicy} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>
            <div className='mb-3 ml-3 flex flex-col   '>
              <div className='flex flex-row '>
                <div className='flex flex-col '>
                  <h1 className='text-[#16151C] font-lexend font-light text-[20px] leading-[30px] '>Change Employee's Policy</h1>
                  <p className='text-gray-500  font-lexend font-light text-[14px] leading-[22px] mb-4'>
                    Allow employees to update an employee's policy (from policy x to policy y)
                  </p>
                </div>
                <input onChange={() => handleCheckboxChange(setChangeEmployeesPolicy)} checked={changeemployeepolicy} type='checkbox' className='ml-auto mt-2' />
              </div>
            </div>

          </div>

        </div>
      </div>



    </div>
  );
}

export default Permissions;
