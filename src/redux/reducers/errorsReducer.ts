

// Define the initial state type
interface InitialState {
    // Define your initial state properties here
}

// Define the initial state
const initialState: InitialState = {
    // Initialize your initial state properties here
};

// Define the action type
interface ErrorAction {
    type: string;
    payload: any; // Adjust the type according to your payload data type
}

// Define the reducer function
const errorsReducer = (state: InitialState = initialState, action: ErrorAction) => {
    switch (action.type) {
        case 'ERRORS':
            return action.payload ;
        default:
            return state;
    }
};

export default errorsReducer;