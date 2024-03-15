import { combineReducers } from "redux";
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import errorsReducer from "./errorsReducer";
import successReducer from "./successReducer";
import companyReducer from "./companyReducer";
import policiesReducer from "./policyReducer";

const rootReducer = combineReducers({
    auth: userReducer,
    users: usersReducer,
    company: companyReducer,
    errors: errorsReducer,
    success: successReducer,
    policies: policiesReducer,

});

export default rootReducer;