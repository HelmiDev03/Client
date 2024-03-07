// Define the initial state type
interface InitialState {

}

// Define the initial state
const initialState: InitialState = {
 
};

// Define the action types
interface SetCompanyAction {
    type: "SET_COMPANY";
    payload: any; // Adjust the type according to your payload data type
}


interface UpdateCompanyAction {
    type: "UPDATE_COMPANY";
    payload: any; // Adjust the type according to your payload data type
}

// Define the union type for all actions
type CompanyActionTypes = SetCompanyAction| UpdateCompanyAction

// Define the reducer function
const companyReducer = (state: InitialState = initialState, action:CompanyActionTypes): InitialState => {
    switch (action.type) {
        case "SET_COMPANY":
        case "UPDATE_COMPANY":
            return action.payload ? action.payload : state;
    

        default:
            return state;
    }
};

export default companyReducer ;