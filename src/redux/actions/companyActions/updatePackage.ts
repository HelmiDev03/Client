import axios from 'axios';
import { Dispatch } from 'redux'



export const UpdatePackage = (PackName: any) => (dispatch: Dispatch<any>) => {
    axios.put(process.env.NEXT_PUBLIC_DOMAIN+'/api/company/updatePackage', {package : PackName})
    .then(res => {
        dispatch({
            type: 'UPDATE_COMPANY',
            payload: res.data.company
        });
        window.location.href = '/dashboard';
    })

};