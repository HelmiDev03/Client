


import { Dispatch } from 'redux';
import axios from 'axios';
import toast, { Toaster } from "react-hot-toast";





export const Deleteemployee = (id: any, publicId: any) => (dispatch: Dispatch<any>) => {
    axios.delete(process.env.NEXT_PUBLIC_DOMAIN+`/api/employees/deleteemployee/${id}/${publicId}` )
        .then(res => {
            dispatch({
                type: 'SET_POLICIES',
                payload: res.data.policies
              })
              toast.success('Employee deleted successfully');
              dispatch({
                type: 'Chnage_State',
                payload: false
            })
            window.location.href = '/employees';
        })
        .catch(error => {
            dispatch({
                type: 'Chnage_State',
                payload: false
            })
            console.error('Error fetching employees:', error);
        });
};