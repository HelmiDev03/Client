import { Dispatch } from 'redux';
import axios from 'axios';
import { setAuth } from '@/redux/utils/setAuth';
import toast from 'react-hot-toast';






export const ChangePassword =  (data: any) => (dispatch: Dispatch<any>) => {
    axios.put(process.env.NEXT_PUBLIC_DOMAIN+"/api/update/password", data)
    .then( res => {
        
        
        
       toast.success('Password Updated Successfully');
    
        
       
    })
    .catch((err) => {
        console.log(err);
        toast.error('Password Incorrect');
      
    });
}