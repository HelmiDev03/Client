import { combineReducers } from "redux";
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import errorsReducer from "./errorsReducer";
import successReducer from "./successReducer";

const rootReducer = combineReducers({
    auth: userReducer,
    users: usersReducer,
    errors: errorsReducer,
    success: successReducer

});

export default rootReducer;