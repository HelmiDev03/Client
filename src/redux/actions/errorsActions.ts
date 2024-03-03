import { Dispatch } from 'redux';


// Define the type for the data parameter
interface Data {
    // Define the structure of your data object
}

// Define the type for the action
interface ErrorsAction {
    type: string;
    payload: Data; // Adjust the type according to your payload data type
}

// Define the action creator function
const ErrorsActions = (data: Data) => (dispatch: Dispatch<ErrorsAction>) => {
    dispatch({
        type: 'ERRORS',
        payload: data
    });
};

export default ErrorsActions;