import { combineReducers } from "redux";
import userReducer from './userReducer';
import usersReducer from './usersReducer';
import errorsReducer from "./errorsReducer";
import successReducer from "./successReducer";
import companyReducer from "./companyReducer";
import policiesReducer from "./policyReducer";
import permissionGroupReducer from "./permissionGroupReducer";
import notificationReducer from "./notificationsReducer";
import projectsReducer from "./projectsReducer";
import taskReducer from "./tasksReducer";
import isbuttondisbaledReducer from "./isbuttondisbaledReducer";
import todayhourReducer from "./todayshoursReducer";
import timerReducer from "./timeReducer";

const rootReducer = combineReducers({
    auth: userReducer,
    users: usersReducer,
    company: companyReducer,
    errors: errorsReducer,
    success: successReducer,
    policies: policiesReducer,
    permissionGroups: permissionGroupReducer,
    notif: notificationReducer,
    projects: projectsReducer,
    tasks: taskReducer,
    isbuttondisabled: isbuttondisbaledReducer,
    todayhour: todayhourReducer,
    time : timerReducer,

});

export default rootReducer;