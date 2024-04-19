
const initialState= {};




// Define the reducer function
const permissionReducer = (state = initialState, action:any)=> {
    switch (action.type) {
        case "SET_PERMISSION":
       
            return action.payload 
    

        default:
            return state;
    }
};

export default permissionReducer ;