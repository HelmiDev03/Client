import { Dispatch } from 'redux';
import axios from 'axios';






export const GetAllEmployees = () => (dispatch: Dispatch<any>) => {
    axios.get('http://localhost:5000/api/employees')
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