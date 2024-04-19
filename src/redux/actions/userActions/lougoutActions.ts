






import axios from 'axios';
import { useSelector } from 'react-redux';
import { Dispatch } from 'redux';







export const LogoutAction = () => (dispatch: Dispatch<any>) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';



    dispatch({
        type: 'LOGOUT_USER',
        payload: {}
    });
    dispatch({
        type: 'UPDATE_COMPANY',
        payload: {}
    });
    dispatch({
        type: 'SET_POLICIES',
        payload: []
    });
    dispatch({
        type: 'SET_EMPLOYEES',
        payload: []
    });
    dispatch({
        type: 'SET_PERMISSION_GROUPS',
        payload: []
    });
    dispatch({
        type: 'SET_NOTIFICATIONS_COUNT',
        payload: 0
    });
    dispatch({
        type: 'SET_PROJECTS',
        payload: []
    });
    dispatch({
        type: 'SET_TASKS',
        payload: []
    });
    dispatch({
        type: 'SET_HOURS',
        payload: { hr: 0, min: 0, sec: 0, increment: false, lastclockin: Date.now().toString }
    })




};
