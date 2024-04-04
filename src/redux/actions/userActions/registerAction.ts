import axios from 'axios';
import { Dispatch } from 'redux';
interface UserData {
    // Define the structure of your user data object
}

export const Registration = (data: UserData ) => (dispatch: Dispatch<any>) => {
    axios.post(process.env.NEXT_PUBLIC_DOMAIN+'/api/register', data)
    .then(res => {
    
        dispatch({
            type: 'ERRORS',
            payload: {}
        });
        
        localStorage.setItem('successMessage' , 'Successfully Created. Please Check Your Email For Verification');
        window.location.href = '/login';
    
    })
    .catch((err) => {
        dispatch({
            type: 'ERRORS',
            payload: err.response ? err.response.data : {}
        });
    });
};
