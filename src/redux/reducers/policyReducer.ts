// Define the initial state type
interface Policy {
    // Define your policy properties here
}

type PoliciesState = Policy[];

// Define the initial state
const initialState: PoliciesState = [];

// Define the action types
interface SetPoliciesAction {
    type: "SET_POLICIES";
    payload: PoliciesState;
}

interface DeletePoliciesAction {
    type: "DELETE_POLICIES";
    payload: PoliciesState; // Payload should always be present
}

interface AddPoliciesAction {
    type: "ADD_POLICIES";
    payload: PoliciesState; // Payload should always be present
}

// Define the union type for all actions
type PoliciesActionTypes = SetPoliciesAction | DeletePoliciesAction | AddPoliciesAction;

// Define the reducer function
const policiesReducer = (state: PoliciesState = initialState, action: PoliciesActionTypes): PoliciesState => {
    switch (action.type) {
        case "SET_POLICIES":
        case "DELETE_POLICIES":
        case "ADD_POLICIES":
            return action.payload;
        default:
            return state;
    }
};

export default policiesReducer;
