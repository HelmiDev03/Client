


import { Dispatch } from 'redux';
import axios from 'axios';






export const Addnewemployee = (data:any , router:any) => (dispatch: Dispatch<any>) => {
    axios.post('http://localhost:5000/api/employees/addnewemployee' , data)
        .then(res => {
            dispatch({
                type: 'SUCCESS',
                payload: res.data.message
            });

            router.push('/employees');
        })
        .catch (error=> {
            // Handle errors if needed
            console.error('Error fetching employees:', error);
        })
       
};