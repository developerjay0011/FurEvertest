import { LOADER_DATA, LOGIN } from "../actions/auth";
import { Show_AddReview } from "../actions/user";

const initialState = {
    loader: false,
    user: {},
    showreview: false
}


export default function (state = initialState, action) {
    switch (action.type) {
        case Show_AddReview:
            return {
                ...state,
                showreview: action.data
            }
        case LOADER_DATA:
            return {
                ...state,
                loader: action.data
            }
        case LOGIN:
            return {
                ...state,
                user: action.data
            }
        default:
            return state
    }


}