// Define the initial state type
interface User {
    // Define your user properties here
}

type UsersState = User[];

// Define the initial state
const initialState: UsersState = [{}];

// Define the action types
interface SetUsersAction {
    type: "SET_EMPLOYEES";
    payload: UsersState; // Adjust the type according to your payload data type
}

interface DeleteUserAction {
    type: "DELETE_EMPLOYEE";
    payload: UsersState; // Adjust the type according to your payload data type
}
interface AddUserAction {
    type: "ADD_EMPLOYEE";
    payload: UsersState; // Adjust the type according to your payload data type
}

// Define the union type for all actions
type UsersActionTypes = SetUsersAction | DeleteUserAction  | AddUserAction;

// Define the reducer function
const usersReducer = (state: UsersState = initialState, action: UsersActionTypes): UsersState => {
    switch (action.type) {
        case "SET_EMPLOYEES":
        case "DELETE_EMPLOYEE":
        case "ADD_EMPLOYEE":
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};

export default usersReducer;