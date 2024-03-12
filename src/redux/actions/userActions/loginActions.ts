import axios from 'axios';
import { Dispatch } from 'redux';
import { jwtDecode } from "jwt-decode";
import {setAuth} from '@/redux/utils/setAuth';

interface UserData {
    // Define the structure of your user data object
}

export const LoginAction = (data: UserData ) => (dispatch: Dispatch<any>) => {
 
    axios.post('http://localhost:5000/api/login', data)
    .then(res => {
        const { token } = res.data;
        const {refreshToken} = res.data;
        const {company} = res.data;
        localStorage.setItem('jwt', token);
        localStorage.setItem('refreshToken', refreshToken);
        const decodedToken = jwtDecode(token);
        setAuth(token);

        dispatch({
            type: 'SET_USER',
            payload: decodedToken
        });

        dispatch({
            type: 'SET_COMPANY',
            payload: company
        });


        axios.get('http://localhost:5000/api/company')
        .then(res => {
            console.log(res.data.company);
            dispatch({
                type: 'SET_COMPANY',
                payload: res.data.company
            });
        })






        window.location.href='/dashboard';

        
          

        
    })
    .catch((err:any) => {
        
        localStorage.setItem('errorMessage' , err.response?.data.message );
        window.location.href = '/login';
        
    });
     
};