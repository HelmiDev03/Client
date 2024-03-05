import { setAuth } from "@/redux/utils/setAuth";
import axios from "axios";
import { Dispatch } from 'redux';
import { jwtDecode } from "jwt-decode";




export const updateProfilePicture = (ImageUrl: string ,choose:string) => (dispatch: Dispatch<any>) => {
    axios.post(`http://localhost:5000/api/updateprofilepicture/decison`, {ImageUrl,choose} )
    .then( res => {
        
        const { token } = res.data;
        localStorage.setItem('jwt', token);
        const decodedToken = jwtDecode(token);
        setAuth(token);

        dispatch({
            type: 'SET_USER',
            payload: decodedToken
        });
    })

  
}