import { Dispatch } from 'redux';
import axios from 'axios';
import { setAuth } from '@/redux/utils/setAuth';






export const ChangePassword =  (data: any) => (dispatch: Dispatch<any>) => {
    axios.put("http://localhost:5000/api/update/password", data)
    .then( res => {
        
        
        
        dispatch({
            type: 'SUCCESS',
            payload: res.data.message
        });
    
        
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
}