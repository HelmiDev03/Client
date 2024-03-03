// Define the initial state type
interface InitialState {
    isConnected: boolean;
    user: object; // Adjust the type according to your user data structure
}

// Define the initial state
const initialState: InitialState = {
    isConnected: false,
    user: {},
};

// Define the action types
interface SetUserAction {
    type: "SET_USER";
    payload: any; // Adjust the type according to your payload data type
}

interface LogoutUserAction {
    type: "LOGOUT_USER";
    payload: any; 
}

interface UpdateUserAction {
    type: "UPDATE_USER";
    payload: any; // Adjust the type according to your payload data type
}

// Define the union type for all actions
type UserActionTypes = SetUserAction | LogoutUserAction | UpdateUserAction;

// Define the reducer function
const userReducer = (state: InitialState = initialState, action: UserActionTypes): InitialState => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                isConnected: true // Update to true if setting user means the user is connected
            };
        case "LOGOUT_USER":
            return {
                ...state,
                user: {},
                isConnected: false
            };
        case "UPDATE_USER":
            return {
                ...state,
                user: action.payload,
                isConnected: true,
           
                
            };
        default:
            return state;
    }
};

export default userReducer;