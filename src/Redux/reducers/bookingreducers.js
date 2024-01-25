import { Booking_data, No_review, add_child, Review_data, Like_data, MealStatus_Booking, Skeleton, FacilityStatus_Booking, GetCurrent_Booking, Child_Id, Book_ing, Cancel_BookingList, Childlist, GetUser_Childs, GetBooking_History, GetUpcoming_Booking, SearchChild_Center, SearchChild_Center2, Show_Review, Trend_SearchChild_Center } from "../actions/user"

const initialState = {
    addchild: false,
    Bookinghistory: [],
    Upcomingbooking: [],
    ChildCenter: [],
    Child: {},
    childlist: [],
    childlist2: [],
    currentBooking: [],
    likedata: [],
    skeleton: true,
    Booking: null,
    statusbooking: [],
    MealStatus: [],
    Review: {},
    bookingdata: {},
    Noreview: [],
    showreview: false,
    trendsearchChildcenter: []
}


export default function (state = initialState, action) {
    switch (action.type) {
        case Trend_SearchChild_Center:
            return {
                ...state,
                trendsearchChildcenter: action.data
            }
        case Show_Review:
            return {
                ...state,
                showreview: action.data
            }
        case Booking_data:
            return {
                ...state,
                bookingdata: action.data
            }
        case add_child:
            return {
                ...state,
                addchild: action.data
            }
        case MealStatus_Booking:
            return {
                ...state,
                MealStatus: action.data
            }
        case FacilityStatus_Booking:
            return {
                ...state,
                statusbooking: action.data
            }
        case Like_data:
            return {
                ...state,
                likedata: action.data
            }
        case Skeleton:
            return {
                ...state,
                skeleton: action.data
            }
        case GetCurrent_Booking:
            return {
                ...state,
                currentBooking: action.data
            }
        case Review_data:
            return {
                ...state,
                Review: action.data
            }
        case Book_ing:
            return {
                ...state,
                Booking: action.data
            }
        case Cancel_BookingList:
            return {
                ...state,
                CancelBooking: action.data
            }
        case Childlist:
            return {
                ...state,
                childlist: action.data
            }
        case No_review:
            return {
                ...state,
                Noreview: action.data
            }
        case GetUser_Childs:
            return {
                ...state,
                Childs: action.data
            }
        case GetBooking_History:
            return {
                ...state,
                Bookinghistory: action.data
            }
        case GetUpcoming_Booking:
            return {
                ...state,
                Upcomingbooking: action.data
            }
        case Child_Id:
            return {
                ...state,
                Child: action.data
            }
        case SearchChild_Center:
            return {
                ...state,
                ChildCenter: action.data
            }
        case SearchChild_Center2:
            return {
                ...state,
                ChildCenter2: action.data
            }
        default:
            return state
    }


}