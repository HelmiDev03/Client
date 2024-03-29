// Define the initial state type
interface Permission {
    // Define your permission properties here
}

type PermissionGroupsState = Permission[];

// Define the initial state
const initialPermissionGroupsState: PermissionGroupsState = [];

// Define the action types
interface SetPermissionGroupsAction {
    type: "SET_PERMISSION_GROUPS";
    payload: PermissionGroupsState;
}

interface DeletePermissionGroupsAction {
    type: "DELETE_PERMISSION_GROUPS";
    payload: PermissionGroupsState; // Payload should always be present
}

interface AddPermissionGroupsAction {
    type: "ADD_PERMISSION_GROUPS";
    payload: PermissionGroupsState; // Payload should always be present
}

// Define the union type for all actions
type PermissionGroupsActionTypes = SetPermissionGroupsAction | DeletePermissionGroupsAction | AddPermissionGroupsAction;

// Define the reducer function
const permissionGroupReducer = (state: PermissionGroupsState = initialPermissionGroupsState, action: PermissionGroupsActionTypes): PermissionGroupsState => {
    switch (action.type) {
        case "SET_PERMISSION_GROUPS":
        case "DELETE_PERMISSION_GROUPS":
        case "ADD_PERMISSION_GROUPS":
            return action.payload;
        default:
            return state;
    }
};

export default permissionGroupReducer;
