import axios from 'axios';
import toast from 'react-hot-toast';
import { Dispatch } from 'redux'



export const UpdatePackage = (PackName: any) => (dispatch: Dispatch<any>) => {
    axios.put(process.env.NEXT_PUBLIC_DOMAIN+'/api/company/updatePackage', {package : PackName})
    .then(res => {
        dispatch({
            type: 'UPDATE_COMPANY',
            payload: res.data.company
        });
        toast.success('Package Updated Successfully');
        window.location.href = '/dashboard';
    })

};