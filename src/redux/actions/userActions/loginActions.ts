import axios from 'axios';
import { Dispatch } from 'redux';
import { jwtDecode } from 'jwt-decode';
import { setAuth } from '@/redux/utils/setAuth';

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
                        localStorage.setItem('errorMessage', err.response?.data.message);
                        window.location.href = '/login';
                    });
            }
        })
        .catch((err: any) => {
            localStorage.setItem('errorMessage', err.response?.data.message);
            window.location.href = '/login';
            console.log(err.response);
        });
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

    // Sequential API calls
    axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/company')
        .then(res => {
            dispatch({
                type: 'UPDATE_COMPANY',
                payload: res.data.company
            });
            // Call next API after the first one completes
            axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/notifications/unseen')
                .then((res) => {
                    dispatch({
                        type: 'SET_NOTIFICATIONS_COUNT',
                        payload: res.data.unssennotifications
                    });
                    // Call the next API after the second one completes
                    axios.get(process.env.NEXT_PUBLIC_DOMAIN + '/api/attendance/history')
                        .then((res: any) => {
                            const lastworkingdayhours = res.data.workingHours[res.data.workingHours.length - 1].date;
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
                            // Call the next API after the third one completes
                            axios.get(process.env.NEXT_PUBLIC_DOMAIN+`/api/permissions/usergroup`)
                                .then((res) => {
                                    dispatch({
                                        type  :'SET_PERMISSION',
                                        payload  : res.data.group
                                    })
                                    // You can dispatch actions or perform other operations with the response data here
                                })
                                .catch((err) => {
                                    console.error('Error fetching user group permissions:', err);
                                });
                            window.location.href = '/dashboard'; // Redirect after all API calls complete
                        });
                });
        });
};
