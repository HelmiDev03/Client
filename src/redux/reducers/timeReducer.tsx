


// Define the action types
interface SetHoursAction {
    type: "SET_TIMER";
    payload: any; // Adjust the type according to your payload data type
}




// Define the reducer function
const timerReducer = (state = 0, action: SetHoursAction)=> {
    switch (action.type) {
        case "SET_TIMER": 
            return action.payload ;
       
        default:
            return state;
    }
};

export default timerReducer;