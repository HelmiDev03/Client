import axios from 'axios';
import { Dispatch } from 'redux';
import { jwtDecode } from "jwt-decode";
import { setAuth } from '@/redux/utils/setAuth';

interface UserData {
    // Define the structure of your user data object
}


export const LoginAction = (data: UserData) => (dispatch: Dispatch<any>) => {

    axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/login', data)
        .then(res => {

            if (res.data.token) {

                dispatch(LoginActionAfterTFA(res));

            }

            else {

                axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/tfa/beforelogin/sendotp', { email: res.data.email })
                    .then(res => {
                        window.location.href = '/login/tfa?email=' + res.data.email + '&token=' + res.data.token + '&expiredAt=' + res.data.expiredAt;
                    })
                    .catch(err => {
                        localStorage.setItem('errorMessage', err.response?.data.message);
                        window.location.href = '/login';
                       
                    })

            }
        })

        .catch((err: any) => {

            localStorage.setItem('errorMessage', err.response?.data.message);
            window.location.href = '/login';
            console.log(err.response);


        });

};












export const LoginActionAfterTFA = (res: any) => (dispatch: Dispatch<any>) => {


    const { token } = res.data;
    const { refreshToken } = res.data;
    localStorage.setItem('jwt', token);
    localStorage.setItem('refreshToken', refreshToken);
    const decodedToken = jwtDecode(token);
    setAuth(token);

    dispatch({
        type: 'SET_USER',
        payload: decodedToken
    });




    









    window.location.href = '/dashboard';






};