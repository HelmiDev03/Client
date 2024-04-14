// Define the initial state type
interface Project {
    // Define your project properties here
}

type ProjectsState = Project[];

// Define the initial state
const initialState: ProjectsState = [];

// Define the action types
interface SetProjectsAction {
    type: "SET_PROJECTS";
    payload: ProjectsState; // Adjust the type according to your payload data type
}

// Define the union type for all actions
type ProjectsActionTypes = SetProjectsAction;

// Define the reducer function
const projectsReducer = (state: ProjectsState = initialState, action: ProjectsActionTypes): ProjectsState => {
    switch (action.type) {
        case "SET_PROJECTS":
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};

export default projectsReducer;
