import { Dispatch } from 'redux';
import axios from 'axios';
import { setAuth } from '@/redux/utils/setAuth';

import toast, { Toaster } from "react-hot-toast";


interface UserData {
    // Define the structure of your user data object
}


export const EditPersonalInformation =  (data: UserData) => (dispatch: Dispatch<any>) => {
    axios.put(process.env.NEXT_PUBLIC_DOMAIN+"/api/update/personalinformation", data)
    .then( res => {
        
        const token = res.data.token;
        localStorage.setItem('jwt', token);
        setAuth(token);
        dispatch({
            type: 'UPDATE_USER',
            payload: res.data.user
        });
        toast.success(res.data.message);

        
    
        
        dispatch({
            type: 'ERRORS',
            payload: {}
        });
    })
    .catch((err) => {
        console.log(err);
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