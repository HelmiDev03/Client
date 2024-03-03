'use client'
import {useEffect} from 'react'
import { jwtDecode } from "jwt-decode";

import { store , persistore}   from "../redux/store";
import { setAuth } from './utils/setAuth';

import { Provider as ReduxProvider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import axios from 'axios';





const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  
 
    

    useEffect( () => {
      
        if (localStorage.jwt) {
          const decodedToken = jwtDecode(localStorage.jwt);

          const currentTime = Date.now() / 1000; // Convert to seconds
          if (decodedToken.exp && decodedToken.exp < currentTime) {
            // Token is expired,
            console.log('Token is expired');
            axios.post('http://localhost:5000/api/refreshToken' , {refreshToken : localStorage.refreshToken})
            .then(res => {
              const token = res.data.token;
              localStorage.setItem('jwt', token);
              setAuth(token);
              const decodedToken = jwtDecode(token);
              store.dispatch({
                type: 'SET_USER',
                payload: decodedToken,
              });
            })
          } else {
            // Token is still valid, proceed with token refresh
           
            store.dispatch({
              type: 'SET_USER',
              payload: decodedToken,
            });
            setAuth(localStorage.jwt);
          }

         
        }
      


        //reset suceess and errors message to {} in page refresh
        
    
        
      }, []);
        
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistore}>
    
              {children}
            
        
       
      </PersistGate>
    </ReduxProvider>
   
  )
}

export default StoreProvider