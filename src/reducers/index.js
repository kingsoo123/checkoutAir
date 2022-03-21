import { combineReducers } from "redux";
import {initializeReducer} from "./CheckoutReducer"

const rootReducer = combineReducers({
    initialize_pay: initializeReducer
});

export default rootReducer;
