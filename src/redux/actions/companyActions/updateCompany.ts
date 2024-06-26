import axios from 'axios';
import { Dispatch } from 'redux'

import toast, { Toaster } from "react-hot-toast";

export const UpdateCompany = (data: any) => (dispatch: Dispatch<any>) => {
    axios.put(process.env.NEXT_PUBLIC_DOMAIN+'/api/company/update', data )
    .then(res => {
        dispatch({
            type: 'ERRORS',
            payload:  {}
        });
        dispatch({
            type: 'UPDATE_COMPANY',
            payload: res.data.company
        });
        toast.success(res.data.message);
       
    })


    .catch((err) => {
       
        dispatch({
            type: 'ERRORS',
            payload: err.response ? err.response.data : {}
        });
        dispatch({
            type: 'SUCCESS',
            payload: ''
        });
    }); 

};