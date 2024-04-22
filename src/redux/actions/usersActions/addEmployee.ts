


import { Dispatch } from 'redux';
import axios from 'axios';

import toast, { Toaster } from "react-hot-toast";




export const Addnewemployee = (data:any , router:any) => (dispatch: Dispatch<any>) => {
    axios.post(process.env.NEXT_PUBLIC_DOMAIN+'/api/employees/addnewemployee' , data)
        .then(res => {
            toast.success(res.data.message);
            dispatch({
                type: 'SET_POLICIES',
                payload: res.data.policies
              })
              dispatch({
                type: 'SET_PERMISSION_GROUPS',
                payload: res.data.permissionGroups
            });

            router.push('/employees');
        })
        .catch (error=> {
            // Handle errors if needed
            console.error('Error fetching employees:', error);
        })
       
};