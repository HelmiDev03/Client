import { setAuth } from "@/redux/utils/setAuth";
import axios from "axios";
import { Dispatch } from 'redux';
import { jwtDecode } from "jwt-decode";




export const updateProfilePicture = (ImageUrl: string,publicId:string ,choose:string) => (dispatch: Dispatch<any>) => {
    axios.post(`http://localhost:5000/api/updateprofilepicture/decison`, {ImageUrl,publicId,choose} )
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
    .catch( err => {})

  
}