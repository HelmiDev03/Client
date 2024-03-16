


import { Dispatch } from 'redux';
import axios from 'axios';






export const Deleteemployee = (id: any, publicId: any) => (dispatch: Dispatch<any>) => {
    axios.delete(`http://localhost:5000/api/employees/deleteemployee/${id}/${publicId}` )
        .then(res => {
            dispatch({
                type: 'SET_POLICIES',
                payload: res.data.policies
              })
            window.location.href = '/employees';
        })
        .catch(error => {
            // Handle errors if needed
            console.error('Error fetching employees:', error);
        });
};