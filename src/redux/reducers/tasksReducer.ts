// Define the initial state type
interface Task {
    // Define your project properties here
}

type TaskState = Task[];

// Define the initial state
const initialState: TaskState = [];

// Define the action types
interface SetProjectsAction {
    type: "SET_TASKS";
    payload: TaskState; // Adjust the type according to your payload data type
}

// Define the union type for all actions
type ProjectsActionTypes = SetProjectsAction;

// Define the reducer function
const taskReducer = (state: TaskState = initialState, action: ProjectsActionTypes): TaskState => {
    switch (action.type) {
        case "SET_TASKS":
            return action.payload ? action.payload : state;
        default:
            return state;
    }
};

export default taskReducer;
