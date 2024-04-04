import axios from 'axios';
import { Dispatch } from 'redux';
import { jwtDecode } from "jwt-decode";
import { setAuth } from '@/redux/utils/setAuth';

interface UserData {
    // Define the structure of your user data object
}


export const LoginAction = (data: UserData) => (dispatch: Dispatch<any>) => {

    axios.post('http://localhost:5000/api/login', data)
        .then(res => {
            
            if (res.data.token ) {
            
                dispatch(LoginActionAfterTFA(res));
                
            }
            
            else {

                axios.post('http://localhost:5000/api/tfa/beforelogin/sendotp', { email: res.data.email })
                    .then(res => {
                        window.location.href = '/login/tfa?email=' + res.data.email + '&token=' + res.data.token + '&expiredAt=' + res.data.expiredAt;
                    })

            }
        })

        .catch((err: any) => {

            localStorage.setItem('errorMessage', err.response?.data.message);
            window.location.href = '/login';

        });

};












export const LoginActionAfterTFA = (res: any) => (dispatch: Dispatch<any>) => {


    const { token } = res.data;
    const { refreshToken } = res.data;
    const { company } = res.data;
    localStorage.setItem('jwt', token);
    localStorage.setItem('refreshToken', refreshToken);
    const decodedToken = jwtDecode(token);
    setAuth(token);

    dispatch({
        type: 'SET_USER',
        payload: decodedToken
    });

    


    axios.get('http://localhost:5000/api/company')
        .then(res => {
            console.log(res.data.company);
            dispatch({
                type: 'SET_COMPANY',
                payload: res.data.company
            });
        })

   

    






    window.location.href = '/dashboard';






};