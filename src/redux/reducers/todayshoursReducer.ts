
// Define the initial state
const initialState= {
    hr: 0,
    min : 0,
    sec : 0,
    increment : false,
    lastclockin : new Date().toString()
   
};

// Define the action types
interface SetHoursAction {
    type: "SET_HOURS";
    payload: any; // Adjust the type according to your payload data type
}




// Define the reducer function
const todayhourReducer = (state = initialState, action: SetHoursAction)=> {
    switch (action.type) {
        case "SET_HOURS": 
            return action.payload ;
       
        default:
            return state;
    }
};

export default todayhourReducer;