






import { Dispatch } from 'redux';







export const LogoutAction = () => (dispatch: Dispatch<any>) => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('refreshToken');
    dispatch({
        type: 'LOGOUT_USER',
        payload: {}
    });
    window.location.href='/login'; 
};
