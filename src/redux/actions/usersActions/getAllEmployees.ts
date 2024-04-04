import { Dispatch } from 'redux';
import axios from 'axios';






export const GetAllEmployees = () => (dispatch: Dispatch<any>) => {
    axios.get(process.env.NEXT_PUBLIC_DOMAIN+'/api/employees')
        .then(res => {
            dispatch({
                type: 'SET_EMPLOYEES',
                payload: res.data.employees
            });
        })
        .catch (error=> {
            // Handle errors if needed
            console.error('Error fetching employees:', error);
        })
       
};