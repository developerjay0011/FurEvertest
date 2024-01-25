import { createStore, applyMiddleware, combineReducers } from "redux";
import userreducers from "../Redux/reducers/userreducers";
import commonreducers from "../Redux/reducers/commonreducers";
import bookingreducers from "../Redux/reducers/bookingreducers";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
    user: userreducers,
    common: commonreducers,
    booking: bookingreducers,
})
const middleWare = [thunk]
export const store = createStore(rootReducer, applyMiddleware(...middleWare))