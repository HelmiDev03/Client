import axios from 'axios';
import { Dispatch } from 'redux';
import { jwtDecode } from 'jwt-decode';
import { setAuth } from '@/redux/utils/setAuth';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

interface UserData {
    // Define the structure of your user data object
}



export const LoginAction = (data: UserData) => (dispatch: Dispatch<any>) => {
    axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/login', data)
        .then(res => {
            if (res.data.token) {
                dispatch(LoginActionAfterTFA(res));
            } else {
                axios.post(process.env.NEXT_PUBLIC_DOMAIN + '/api/tfa/beforelogin/sendotp', { email: res.data.email })
                    .then(res => {
                        window.location.href = '/login/tfa?email=' + res.data.email + '&token=' + res.data.token + '&expiredAt=' + res.data.expiredAt;
                    })
                    .catch(err => {
                        toast.error(err.response?.data.message);
                    });
            }
        })
        .catch((err: any) => {
            toast.error(err.response?.data.message);
            
        })
        .finally(() => {
            dispatch({
                type: 'Chnage_State',
                payload: false
            })
        })
};

export const LoginActionAfterTFA = (res: any) => (dispatch: Dispatch<any>) => {
    const { token, refreshToken } = res.data;
    localStorage.setItem('jwt', token);
    localStorage.setItem('refreshToken', refreshToken);
    const decodedToken = jwtDecode(token);
    setAuth(token);

    dispatch({
        type: 'SET_USER',
        payload: decodedToken
    });
    dispatch({
        type: 'UPDATE_COMPANY',
        payload: res.data.company
    });
    dispatch({
        type: 'SET_NOTIFICATIONS_COUNT',
        payload: res.data.unssennotifications
    });
    dispatch({
        type: 'SET_PERMISSION',
        payload: res.data.group
    })
   

    if (new Date(res.data.workingHours[res.data.workingHours.length - 1].date).toString().slice(0, 10) == new Date().toString()?.slice(0, 10)) {
        dispatch({
            type: 'SET_HOURS',
            payload: {
                hr: res.data.workingHours[res.data.workingHours.length - 1].time.hr,
                min: res.data.workingHours[res.data.workingHours.length - 1].time.min,
                sec: res.data.workingHours[res.data.workingHours.length - 1].time.sec,
                increment: false,
                lastclockin: new Date()
            }
        });
    }
    window.location.href = '/dashboard'; // Redirect to dashboard
    toast.success('Logged in successfully');
   

       
    };
