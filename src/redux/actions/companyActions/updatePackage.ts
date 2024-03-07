import axios from 'axios';
import { Dispatch } from 'redux'



export const UpdatePackage = (PackName: any) => (dispatch: Dispatch<any>) => {
    axios.put('http://localhost:5000/api/company/updatePackage', {package : PackName})
    .then(res => {
        dispatch({
            type: 'UPDATE_COMPANY',
            payload: res.data.company
        });
        window.location.href = '/dashboard';
    })

};