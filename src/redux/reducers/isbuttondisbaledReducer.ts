


// Define the initial state
const initialState=false

// Define the action type
interface Chnage_State {
    type: string;
    payload: any; // Adjust the type according to your payload data type
}

// Define the reducer function
const isbuttondisbaledReducer = (state= initialState, action: Chnage_State) => {
    switch (action.type) {
        case 'Chnage_State':
            return action.payload
        default:
            return state;
    }
};

export default isbuttondisbaledReducer;