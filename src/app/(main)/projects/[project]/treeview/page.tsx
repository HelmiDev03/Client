'use client'

import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { Tree, TreeNode } from 'react-organizational-chart';

import styled from 'styled-components';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid white;
`;

const StyledTreeExample = () => {

  const [users, setUsers] = React.useState([])
  const router = useRouter()
  const { project } = useParams();
  const [leader, setLeader] = React.useState({
    _id: '',
    profilepicture: '' ,
    firstname : '',
    lastname: '',
  })

  React.useEffect(() => {
    axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/projects/' + project)
      .then((res) => {
        
        setUsers(res.data.project.users.filter((user:any) => user.position !== 'team leader'))
        setLeader(res.data.project.users.find((user:any) => user.position === 'team leader').user)

      })
  }, [])




  return (

    <Tree
      lineWidth={'2px'}
      lineColor={'rgba(37, 37, 61, .1)'}
      lineBorderRadius={'10px'}
      label={<StyledNode>
        <div onClick={()=>router.push('/employees/'+leader._id)} className='flex flex-col items:center'>
          <img className='hover:cursor-pointer w-[80px] mb-2 h-[80px] rounded-[10px]' src={leader.profilepicture ? leader.profilepicture : '/defaultprofilepicture.png'} />
          <span title="hhhhhh nnnnnnnnnnn" className="_1sco1wt1 font-bold translate-x-[-14px] mb-2 " >{leader.firstname} {leader.lastname}</span>

          <h1 className='text-[16px] bg-[#FFD7DF] p-1 rounded-[10px] translate-x-[-14px] font-lexend font-light text-[#16151C]'>Team Leader</h1>
        </div>
      </StyledNode>}
    >
      {users.map((user:any) => (
        <TreeNode key={user._id} label={<StyledNode>
          <div onClick={()=>router.push('/employees/'+user.user._id)} className='flex flex-col items:center'>
            <img className='hover:cursor-pointer w-[80px] mb-2 h-[80px] rounded-[10px]' src={user.user.profilepicture ? user.user.profilepicture : '/defaultprofilepicture.png'} />
            <span title="hhhhhh nnnnnnnnnnn" className="_1sco1wt1 font-bold mb-2 " >{user.user.firstname} {user.user.lastname}</span>

            <h1 className='text-[16px] bg-[#FFD7DF] p-1 rounded-[10px]  font-lexend font-light text-[#16151C]'>{user.position}</h1>
          </div>
        </StyledNode>}
        >
        </TreeNode>
      ))}
    
    </Tree>

  );
}
export default StyledTreeExample;
