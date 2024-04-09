
// Define the initial state
const initialState= 0

// Define the action type
interface SET_NOTIFICATIONS_COUNT {
    type: string;
    payload: any; // Adjust the type according to your payload data type
}

// Define the reducer function
const notificationReducer = (state: Number = initialState, action: SET_NOTIFICATIONS_COUNT) => {
    switch (action.type) {
        case 'SET_NOTIFICATIONS_COUNT':
            return action.payload ;
        default:
            return state;
    }
};

export default notificationReducer;