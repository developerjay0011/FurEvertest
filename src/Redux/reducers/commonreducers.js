import { Get_Meals, Notifications, GetPrivacy_Policy, Get_Facilities, Get_Terms, Location_DATA, Get_MedicalConditions, GetVaccination_Status } from "../actions/common";

const initialState = {
    meals: [],
    facilities: [],
    medicalConditions: [],
    vaccination: [],
    location: {},
    terms: {},
    PrivacyPolicy: {},
    notifications: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case Get_Meals:
            return {
                ...state,
                meals: action.data
            }
        case Notifications:
            return {
                ...state,
                notifications: action.data
            }
        case GetPrivacy_Policy:
            return {
                ...state,
                PrivacyPolicy: action.data
            }
        case Get_Terms:
            return {
                ...state,
                terms: action.data
            }
        case Get_MedicalConditions:
            return {
                ...state,
                medicalConditions: action.data
            }
        case Location_DATA:
            return {
                ...state,
                location: action.data
            }
        case GetVaccination_Status:
            return {
                ...state,
                vaccination: action.data
            }
        case Get_Facilities:
            return {
                ...state,
                facilities: action.data
            }
        default:
            return state
    }


}