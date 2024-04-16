
'use client'
import React from 'react'
import EmployeeProject from '@/app/(components)/employeeprojects/page'
import { useSelector } from 'react-redux'
const Projects = () => {
  const auth  = useSelector((state: any) => state.auth)
  return (
    <div>
      <EmployeeProject id  = {auth.user._id} />
    </div>
  )
}

export default Projects
