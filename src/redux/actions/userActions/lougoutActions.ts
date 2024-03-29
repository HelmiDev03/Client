






import { Dispatch } from 'redux';







export const LogoutAction = () => (dispatch: Dispatch<any>) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
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
    window.location.href='/login'; 
};
