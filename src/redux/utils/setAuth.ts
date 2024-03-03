import axios from 'axios';



export const setAuth = (token:any)=>{
    if(token){
      axios.defaults.headers.common['Authorization'] = token;
      
  
    }else{
      delete axios.defaults.headers.common['Authorization']
    }
  }