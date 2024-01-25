/* eslint-disable */
export const GetUser_Childs = "GetUser_Childs"
export const Child_Id = "Child_Id"
export const GetBooking_History = "GetBooking_History"
export const GetUpcoming_Booking = "GetUpcoming_Booking"
export const SearchChild_Center = "SearchChild_Center"
export const SearchChild_Center2 = "SearchChild_Center2"
export const add_child = "add_child"
export const Childlist = "Childlist"
export const Cancel_BookingList = "Cancel_BookingList"
export const GetCurrent_Booking = "GetCurrent_Booking"
export const Book_ing = "Book_ing"
export const Skeleton = "Skeleton"
export const Like_data = "Like_data"
export const FacilityStatus_Booking = "FacilityStatus_Booking"
export const Update_Status = "Update_Status"
export const child = "child"
export const MealStatus_Booking = "MealStatus_Booking"
export const Review_data = "Review_data"
export const Booking_data = "Booking_data"
export const Payment_data = "Payment_data"
export const No_review = "No_review"
export const GetCenter_Detail = "GetCenter_Detail"
export const Get_Meals = "Get_Meals"
export const Get_Facilities = "Get_Facilities"
export const Show_AddReview = "Show_AddReview"
export const Show_Review = "Show_Review"
export const Trend_SearchChild_Center = "Trend_SearchChild_Center"


import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../utils/Url";
import axios from "axios";
import * as RootNavigation from '../../Navigation/RootNavigation';
import { Loader } from "./auth";
import md5 from 'md5'
import Apiheaders from "../../utils/Apiheaders"
import showToast from "../../utils/Toast"
import { GetNotifications } from "./common"
import moment from "moment"
import { Platform } from "react-native"

export const AddEditChildDetail = (data) => {
    return async dispatch => {
        dispatch({ type: add_child, data: null })
        if (data == null) {
            RootNavigation.navigate("Addchild")
            return
        }
        dispatch(Loader(true))
        const formData = new FormData();
        formData.append('ChildId', Number(data.ChildId))
        formData.append('UserId', Number(data.UserId))
        formData.append('Name', data.Name)
        formData.append('ChildType', data.ChildType)
        formData.append('Age', data.Age)
        formData.append('Weight', data.Weight)
        formData.append('EyeColor', data.ecolor)
        formData.append('Identification', data.Identification)
        formData.append('VaccinationStatus', data.VaccinationStatus)
        formData.append('MedicalCondition', data.MedicalCondition)
        formData.append('Aggressive', data.Aggressive)
        if (data.ChildId == 0) {
            formData.append('VaccineCertificate', {
                name: data.VaccineCertificate.name,
                type: data.VaccineCertificate.type,
                uri: Platform.OS == "ios" ? data.VaccineCertificate.image.replace("file://", "") : data.VaccineCertificate.image
            })
            formData.append('ChildImage', {
                name: data.ChildImage.name,
                type: data.ChildImage.type,
                uri: Platform.OS == "ios" ? data.ChildImage.image.replace("file://", "") : data.ChildImage.image
            })
            if (data?.MedicalCertificate?.name) {
                formData.append('MedicalCertificate', {
                    name: data.MedicalCertificate.name,
                    type: data.MedicalCertificate.type,
                    uri: Platform.OS == "ios" ? data.MedicalCertificate.image.replace("file://", "") : data.MedicalCertificate.image
                })
            }
        }
        console.log(formData._parts)
        await axios(Api.User + 'AddEditChildDetail', {
            method: 'post',
            headers: Apiheaders().multipart,
            data: formData
        }).then(async (response) => {
            console.log("AddEditChildDetail", response.data)
            dispatch(Loader(false))
            dispatch(GetUserChilds())
            showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.success) {
                if (response?.data?.message == "Pet Updated Successfully") {
                    dispatch(ChildId({ id: data.ChildId, update: true }))
                } else {
                    dispatch({ type: add_child, data: true })
                }
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const GetUserChilds = () => {
    return async dispatch => {
        const id = await AsyncStorage.getItem('id')
        await axios(Api.User + `GetUserChilds/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetUserChilds", response.data)
            dispatch(Loader(false))
            if (response?.data) {
                var data = []
                for (let i = 0; i < response?.data.length; i++) {
                    const _id = response?.data[i].childId
                    const element = response?.data[i].name
                    data.push({ label: element, value: _id })
                }
                dispatch({
                    type: Childlist,
                    data: data
                })
                dispatch({
                    type: GetUser_Childs,
                    data: response.data
                })
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const ChildId = (data) => {
    return async dispatch => {
        if (data?.image == true) {
        } else {
            dispatch(Loader(true))
        }
        dispatch({ type: add_child, data: null })
        await axios(Api.User + `GetSingleChild/${data.id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("ChildId", response.data)
            dispatch(Loader(false))
            if (response?.data) {
                dispatch({ type: Child_Id, data: response.data })
                if (data?.update) { return }
                RootNavigation.navigate("Addchild", { edit: true, data: response.data })
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const BookingStatus = (data) => {
    return async dispatch => {
        if (data?.state == "Satrtbooking") {
            dispatch({ type: Book_ing, data: "Satrtbooking" })
            dispatch({ type: Booking_data, data: null })
            RootNavigation.navigate("Booking", { centerdata: { ...data?.centerdata?.item }, fromdate: data?.centerdata?.fromdate, todate: data?.centerdata?.todate, childid: null })
            return
        }
        if (data == "ok") {
            dispatch(GetUpcomingBooking())
            dispatch(GetCurrentBooking())
            dispatch(GetNotifications())
            dispatch({
                type: Book_ing,
                data: data
            })
            return
        }
        dispatch({
            type: Book_ing,
            data: data
        })
    }
}


export const Booking = (data) => {
    return async dispatch => {
        dispatch(BookingStatus(null))
        dispatch(Loader(true))
        await axios(Api.Payment + `/orders/${data}`, {
            method: 'get',
            headers: Apiheaders().Paymentheaders,
        }).then(async (response) => {
            const Booking_id = await AsyncStorage.getItem("booking_id")
            if (response?.data?.order_status) {
                await axios(Api.User + `ConfirmBooking`, {
                    method: 'post',
                    headers: Apiheaders().Auth,
                    data: {
                        bookingId: Booking_id,
                        paymentDetails: response.data
                    }
                }).then(async (response) => {
                    if (response?.data?.success == true) {
                        dispatch(BookingStatus("ok"))
                        dispatch(GetUpcomingBooking())
                        dispatch(GetCurrentBooking())
                        dispatch(GetNotifications())
                        dispatch(Loader(false))
                    } else {
                        dispatch(BookingStatus("notok"))
                        dispatch(Loader(false))
                    }

                }).catch(error => {
                    dispatch(Loader(false))
                    dispatch(BookingStatus("notok"))
                });
            } else {
                dispatch(Loader(false))
                dispatch(BookingStatus("notok"))
            }

        }).catch(error => {
            dispatch(Loader(false))
            dispatch(BookingStatus("notok"))
        });
    };
}


export const GetBookingHistory = () => {
    return async dispatch => {
        const id = await AsyncStorage.getItem('id')
        await axios(Api.User + `GetBookingHistory/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetBookingHistory", response.data)
            if (response?.data) {
                dispatch({
                    type: GetBooking_History,
                    data: response?.data?.map(item => ({ status: "History", ...item }))?.reverse()
                })
            }
        }).catch(error => { dispatch(Loader(false)) });
    };
}


export const GetUpcomingBooking = () => {
    return async dispatch => {
        const id = await AsyncStorage.getItem('id')
        await axios(Api.User + `GetUpcomingBooking/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetUpcomingBooking", response.data)
            if (response?.data) {
                dispatch({
                    type: GetUpcoming_Booking,
                    data: response?.data?.map(item => ({ status: "Upcoming", ...item }))?.reverse()
                })
            }
        }).catch(error => { dispatch(Loader(false)) });
    };
}


export const GetCurrentBooking = () => {
    return async dispatch => {
        const id = await AsyncStorage.getItem('id')
        await axios(Api.User + `GetCurrentBooking/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetCurrentBooking", response.data)
            if (response?.data) {
                dispatch({
                    type: GetCurrent_Booking,
                    data: response?.data?.map(item => ({ status: "Current", ...item }))?.reverse()
                })
            }
        }).catch(error => { dispatch(Loader(false)) });
    };
}


export const SearchChildCenter = (data) => {
    return async dispatch => {
        dispatch({ type: Skeleton, data: true })
        dispatch(Loader(data?.loader))
        await axios(Api.User + `SearchChildCenter`, {
            method: 'post',
            headers: Apiheaders().login,
            data: {
                "latitude": data?.latitude,
                "longitude": data?.longitude,
                "recommended": data?.recommended == true ? true : false
            }
        }).then(async (response) => {
            if (response?.data) {
                if (data?.recommended == true) {
                    dispatch({
                        type: SearchChild_Center,
                        data: response.data
                    })
                } else {
                    dispatch({
                        type: Trend_SearchChild_Center,
                        data: response.data
                    })
                }
            }
            dispatch({ type: Skeleton, data: false })
            dispatch(Loader(false))
        }).catch(async (error) => {
            dispatch(Loader(false))
            dispatch({ type: SearchChild_Center, data: [] })
            console.error("SearchChildCentererror", error);
            if (error.toString() == "AxiosError: Request failed with status code 401") {
                await AsyncStorage.removeItem('token'); RootNavigation.replace("Login")
            }
            dispatch({ type: Skeleton, data: false })
        });
    };
}


export const SearchChildCenter2 = (data, item) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.User + `SearchChildCenter`, {
            method: 'post',
            headers: Apiheaders().Auth,
            data: data
        }).then(async (response) => {
            console.log("SearchChildCenter2", response.data)
            if (response?.data) {
                dispatch(SearchChild2(response.data))
                RootNavigation.navigate("Searched", { fromdate: data?.fromDate, todate: data?.toDate, value: null })
            }
            dispatch(Loader(false))
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}

export const SearchChild2 = (data) => {
    return async dispatch => {
        dispatch({
            type: SearchChild_Center2,
            data: data
        });
    };
}


export const EditChildVaccine = (data) => {
    return async dispatch => {
        dispatch({ type: add_child, data: null })
        dispatch(Loader(true))
        const formData = new FormData();
        formData.append('ChildId', data.ChildId)
        formData.append('UserId', global.id)
        formData.append('VaccineCertificate', {
            name: data.VaccineCertificate.name,
            type: data.VaccineCertificate.type,
            uri: Platform.OS == "ios" ? data.VaccineCertificate.image.replace("file://", "") : data.VaccineCertificate.image
        })
        await axios(Api.User + 'AddEditChildDetail', {
            method: 'post',
            headers: Apiheaders().multipart,
            data: formData
        }).then(async (response) => {
            console.log("EditChilVaccine", response.data)
            dispatch(Loader(false))
            dispatch(ChildId({ id: data.ChildId, update: true, image: true }))
            dispatch(GetUserChilds())
            showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const EditChildimage = (data) => {
    return async dispatch => {
        dispatch({ type: add_child, data: null })
        dispatch(Loader(true))
        const formData = new FormData();
        formData.append('ChildId', data.ChildId)
        formData.append('UserId', global.id)
        formData.append('ChildImage', {
            name: data.ChildImage.name,
            type: data.ChildImage.type,
            uri: Platform.OS == "ios" ? data.ChildImage.image.replace("file://", "") : data.ChildImage.image
        })
        await axios(Api.User + 'AddEditChildDetail', {
            method: 'post',
            headers: Apiheaders().multipart,
            data: formData
        }).then(async (response) => {
            dispatch(Loader(false))
            dispatch(GetUserChilds())
            showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
            dispatch(ChildId({ id: data.ChildId, update: true, image: true }))
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const MedicalCertificate = (data) => {
    return async dispatch => {
        dispatch({ type: add_child, data: null })
        dispatch(Loader(true))
        const formData = new FormData();
        formData.append('ChildId', data.ChildId)
        formData.append('UserId', global.id)
        if (data?.MedicalCertificate?.name) {
            formData.append('MedicalCertificate', {
                name: data.MedicalCertificate.name,
                type: data.MedicalCertificate.type,
                uri: Platform.OS == "ios" ? data.MedicalCertificate.image.replace("file://", "") : data.MedicalCertificate.image
            })
        }

        await axios(Api.User + 'AddEditChildDetail', {
            method: 'post',
            headers: Apiheaders().multipart,
            data: formData
        }).then(async (response) => {
            console.log("MedicalCertificate", response.data)
            dispatch(Loader(false))
            dispatch(GetUserChilds())
            showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
            dispatch(ChildId({ id: data.ChildId, update: true, image: true }))
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const CancelBooking = (data, params) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.User + `CancelBooking/${data.BookingId}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("CancelBooking", response.data)
            dispatch(Loader(false))
            showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.success == true) {
                RootNavigation.navigate("Bookings")

                var partnerTokens = response?.data?.data?.partnerTokens?.map((item) => item?.firebaseToken)
                dispatch(Sendnoti({
                    "to": partnerTokens,
                    "title": "Booking has been cancelled.",
                    "body": `The booking for ${params?.item?.childName} has been cancelled.`,
                    "content_available": true,
                    "priority": "max",
                    "visibility": "public",
                    "bookingid": response?.data?.data?.bookingDetails?.bookingId,
                    "nav": "booking_list",
                    "status": "cancelled",
                }))
                dispatch(GetBookingHistory())
                dispatch(GetCurrentBooking())
                dispatch(GetUpcomingBooking())
                dispatch(Loader(false))
            } else {
                showToast("Try Again")
                dispatch(Loader(false))
            }
        }).catch(error => {
            console.error(error)
            dispatch(Loader(false))
        });
        // } 
        // else {
        //     await axios(Api.Payment + 'orders/' + data?.item?.paymentDetail?.order_id + "/refunds", {
        //         method: 'post',
        //         headers: Apiheaders().Paymentheaders,
        //         data: {
        //             "refund_amount": data?.item?.price,
        //             "refund_id": data?.item?.paymentDetail?.order_id,
        //             "refund_note": "User canceled the booking"
        //         }
        //     }).then(async (response) => {
        //         console.log(response?.data)
        //         if (response?.data?.refund_id) {
        //             await axios(Api.User + `CancelBooking/${data.BookingId}`, {
        //                 method: 'get',
        //                 headers: Apiheaders().Auth,
        //             }).then(async (response) => {
        //                 console.log("CancelBooking", response.data)
        //                 dispatch(Loader(false))
        //                  showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
        //                 if (response?.data?.success == true) {
        //                     console.log(response?.data)
        //                     RootNavigation.navigate("Bookings")
        //                     dispatch(GetBookingHistory())
        //                     dispatch(GetCurrentBooking())
        //                     dispatch(GetUpcomingBooking())
        //                     dispatch(Loader(false))
        //                 } else {
        //                      showToast("Try Again")
        //                     dispatch(Loader(false))
        //                 }
        //             }).catch(error => {
        //                 console.log(error)
        //                 dispatch(Loader(false))
        //             });
        //         } else {
        //             dispatch(Loader(false))
        //         }
        //     }).catch(error => {
        //         console.log(error)
        //         dispatch(Loader(false))
        //     });
        // }
    };
}


export const UpdateBooking = (data) => {
    return async dispatch => {
        if (data == null) {
            dispatch({ type: Book_ing, data: null })
            return
        }
        dispatch(Loader(true))
        await axios(Api.User + `UpdateBooking`, {
            method: 'post',
            headers: Apiheaders().Auth,
            data: data
        }).then(async (response) => {
            showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
            dispatch(GetUpcomingBooking())
            dispatch(Loader(false))
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const GetFacilityStatusByDateBookingId = (data, item) => {
    return async dispatch => {
        if (data == null) { dispatch({ type: Review_data, data: "not" }); return }
        dispatch(Loader(true))
        dispatch({ type: Review_data, data: "not" });
        await axios(Api.Partner + `GetActivityStatusByDateBookingId`, {
            method: 'post',
            headers: Apiheaders().Auth,
            data: data
        }).then(async (response) => {
            if (response?.data) {
                dispatch({ type: FacilityStatus_Booking, data: response.data })
                if (item?.item == true) {
                    dispatch(GetMealStatusByDateBookingId(data, { item: item.item }))
                } else {
                    dispatch(GetMealStatusByDateBookingId(data, { item: { ...item.item } }))
                }
            }
            dispatch(Loader(false))
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const GetMealStatusByDateBookingId = (data, item, datassss) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Partner + `GetMealStatusByDateBookingId`, {
            method: 'post',
            headers: Apiheaders().Auth,
            data: data
        }).then(async (response) => {
            if (response?.data) {
                dispatch({ type: MealStatus_Booking, data: response.data })
                if (datassss == "no") {
                    return
                }
                if (item?.item == true) {
                    return
                } else {
                    RootNavigation.navigate("Bookingdetail", { data: item })
                }
            }
            dispatch(Loader(false))
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const Likedata = (data) => {
    return async dispatch => {
        dispatch({
            type: Like_data,
            data: data
        });
    };
}


export const addReview = (data) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Common + 'AddReview', {
            method: 'post',
            headers: Apiheaders().Auth,
            data: data
        }).then(async (response) => {
            console.log("addReview", response.data)
            dispatch(Loader(false))
            dispatch(GetNotSentReviewList())
            dispatch(GetBookingHistory())
            showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.success == true) {
                var partnerTokens = response?.data?.data?.partnerTokens?.map((item) => item?.firebaseToken)
                dispatch(Sendnoti({
                    "to": partnerTokens,
                    "title": "New Rating And Feedback",
                    "body": "You have a new user rating and feedback from " + response?.data?.data?.bookingDetails?.userName,
                    "content_available": true,
                    "priority": "max",
                    "visibility": "public",
                    "bookingid": response?.data?.data?.bookingDetails?.bookingId,
                    "nav": "booking_data",
                    "open": true,
                    "status": "history",
                }))
            }
        }).catch(error => {
            console.log("addReview", error)
            dispatch(Loader(false))
        });
    };
}


export const GetReview = (id, loader) => {
    return async dispatch => {
        if (id == "not") {
            dispatch({ type: Review_data, data: "not" });
            return
        }
        dispatch(Showreview(false))
        dispatch({ type: Review_data, data: null });
        if (loader != false) {
            dispatch(Loader(true))
        }
        await axios(Api.Common + `GetReviews/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetReview", response.data)
            if (loader != false) {
                dispatch(Loader(false))
            }
            if (response?.data) {
                dispatch(Showreview(true))
                dispatch({
                    type: Review_data,
                    data: response.data
                });

            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}



const Generatenonce = (time_gap = "") => {
    var time = time_gap ? Math.floor((Date.now() + time_gap) / 1000) : Math.floor(Date.now() / 1000)
    var nonce = md5(time);
    var appId = 'lc355617a77d2e489d';
    var appSecret = 'c6b8a1a416ee445fb77bf499d805e1';
    var signStr = `time:${time},nonce:${nonce},appSecret:${appSecret}`;
    var sign = md5(signStr);
    var system = {
        system: {
            ver: "1.0",
            appId: appId,
            sign: sign,
            time: Number(time),
            nonce: nonce,
        }
    }
    return system
}




export const Geturl = (data) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.accessToken, {
            method: 'post',
            headers: { "Content-Type": "application/json", },
            data: Generatenonce()
        }).then(async (response) => {
            if (response?.data?.result?.data?.accessToken) {
                dispatch(GetLiveStreamInfo({ token: response?.data?.result?.data?.accessToken, camera_id: data }))
            } else {
                dispatch(Loader(false))
            }
        }).catch(error => {
            console.error(error)
            dispatch(Loader(false))
        });
    };
}


export const GetLiveStreamInfo = (params) => {
    return async dispatch => {
        var params2 = {
            ...Generatenonce(2000),
            params: {
                deviceId: params?.camera_id,
                channelId: "0",
                token: params?.token,
            },
        };
        await axios(Api.getLiveStreamInfo, {
            method: 'post',
            headers: { "Content-Type": "application/json", },
            data: params2
        }).then(async (response) => {
            console.log(response?.data)
            if (response?.data.result?.code == "LV1002") {
                dispatch(Setbind(data, token))
            } else {
                dispatch(Loader(false))
                if (response?.data?.result?.data?.streams?.length > 0) {
                    RootNavigation.navigate("LiveScreen", { data: response?.data?.result?.data?.streams })
                } else {
                    showToast(response?.data?.result?.msg)
                }
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    }
}



export const Setbind = (data, token) => {
    return async dispatch => {
        if (token) {
            var params2 = {
                ...Generatenonce(2000),
                "params": {
                    "streamId": 1,
                    "deviceId": data,
                    "channelId": "0",
                    "token": token,
                },
            }
            await axios("https://openapi.easy4ip.com/openapi/bindDeviceLive", {
                method: 'post',
                headers: { "Content-Type": "application/json", },
                data: params2
            }).then(async (response) => {
                console.log(response?.data)
                if (response?.data?.result.code == 0) {
                    dispatch(GetLiveStreamInfo({ token: token, camera_id: data }))
                }
            }).catch(error => {
                dispatch(Loader(false))
            });
        }

    }
}


export const Bookingdata = (data) => {
    return async dispatch => {
        dispatch({
            type: Booking_data,
            data: data
        });
    };
}


export const AddReviewModal = (data) => {
    return async dispatch => {
        dispatch({ type: Show_AddReview, data: data });

    };
}


export const GetNotSentReviewList = () => {
    return async dispatch => {
        const id = await AsyncStorage.getItem('id')
        await axios(Api.User + `GetNotSentReviewList/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetNotSentReviewListsss", response?.data?.length)
            if (response.data) {
                dispatch({ type: No_review, data: response.data });
                if (response?.data?.length > 0) {
                    dispatch(AddReviewModal(true))
                } else {
                    dispatch(AddReviewModal(false))
                }
            }
        }).catch(error => {
        });
    };
}


export const Contactus = (data) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Common + 'SaveContactUs', {
            method: 'post',
            headers: Apiheaders().Auth,
            data: data
        }).then(async (response) => {
            dispatch(Loader(false))
            console.log("Contactus", response.data)
            RootNavigation.navigationRef.goBack()
            showToast(response?.data?.error ? response?.data?.error : response?.data?.message)
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const Sendnoti = (data) => {
    return async (dispatch) => {
        var datas = {
            bookingid: data?.bookingid,
            scheduledTime: data?.isScheduled ? String(data?.scheduledTime) : null,
            isScheduled: data?.isScheduled ? "true" : "false",
            nav: data?.nav,
            status: data?.status,
            open: data?.open,
        }
        var notification = {
            title: data?.title,
            body: data?.body,
            content_available: true,
            priority: "max",
            visibility: "public",
            android_channel_id: "Partner",
        }
        var Sendnoti = true
        if (Array.isArray(data?.to)) {
            var tokens = data?.to?.filter((item) => item != '');
            var Sendnoti = tokens?.length > 0 ? true : false
            var params = {
                registration_ids: tokens,
                notification: notification,
                data: datas
            }
        } else {
            var Sendnoti = data?.to ? true : false
            var params = {
                to: data?.to,
                notification: notification,
                data: datas
            }
        }
        if (Sendnoti) {
            await axios(`https://fcm.googleapis.com/fcm/send`, {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    Authorization:
                        "key=AAAAyEPDfhg:APA91bGq3d3uoF8cAQdGHZM5V5mMXkNBDHETVHKRbMjm4c0t-LBrABhz_uOpezetw5Eh7epI5hgnBTSoa_D9fv3BxkGlhe9fcHt8Nccz4NOdCpm07GkMRLvwGEO2lR-AV-8_OTdHF4L_",
                },
                data: params,
            }).then(async (response) => {
                console.log("Sendnotiresponse", response?.data)
            }).catch((error) => {
                console.log("Sendnotierror", error)
            });
        }
    };
};


export const GetBooking = (data) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.User + `GetSingleBookingDetail/${data?.id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetSingleBookingDetail", response.data, data?.id)
            if (response?.data?.bookingId) {
                if (data?.open == "true" || data?.open == true) {
                    dispatch(GetReview(data?.id, false))
                    dispatch(Showreview(true))
                }
                dispatch(GetFacilityStatusByDateBookingId({
                    "bookingId": data?.id,
                    "date": moment()
                }, { item: { ...response?.data, open: data?.open } }))
            } else {
                dispatch(Loader(false))
            }
        }).catch(error => { dispatch(Loader(false)) });
    };
}

export const Showreview = (data) => {
    return async dispatch => {
        dispatch({ type: Show_Review, data: data });
    }
}

export const GetCenterDetail = (id) => {
    return async dispatch => {
        dispatch(Loader(true))
        try {
            await axios(Api.Partner + `GetCenterDetail/${id}`, {
                method: 'get',
                headers: Apiheaders().Auth,
            }).then(async (response) => {
                console.log("GetCenterDetail", response.data)
                if (response?.data) {
                    dispatch({ type: GetCenter_Detail, data: response?.data?.data })
                    var data = ({
                        "activities": response?.data?.data?.activities,
                        "address": response?.data?.data?.center?.address,
                        "centerId": response?.data?.data?.center?.centerId,
                        "centerName": response?.data?.data?.center?.name,
                        "documents": response?.data?.data?.documents,
                        "facilities": [],
                        "hourlyPrice": response?.data?.data?.center?.hourlyPrice,
                        "price": response?.data?.data?.center?.price,
                        "image": response?.data?.data?.images,
                        "meals": [],
                        "rating": response?.data?.data?.center?.rating,
                        "roomAvailability": response?.data?.data?.rooms,
                        "roomType": response?.data?.data?.center?.roomType,
                        "totalReview": response?.data?.data?.center?.totalReview
                    })
                    await axios(Api.Common + `GetMeals/${id}`, {
                        method: 'get',
                        headers: Apiheaders().Auth,
                        data: { UserId: id.toString() }
                    }).then(async (response2) => {
                        console.log("GetMeals", response2.data)
                        if (response2?.data) {
                            dispatch({ type: Get_Meals, data: response2?.data?.reverse() })
                            await axios(Api.Common + `GetFacilities/${id}`, {
                                method: 'get',
                                headers: Apiheaders().Auth,
                            }).then(async (response3) => {
                                if (response3?.data) {
                                    dispatch({ type: Get_Facilities, data: response3?.data?.reverse() })
                                    RootNavigation.navigate("Booking", { centerdata: { ...data, meals: response2?.data, facilities: response3?.data } })
                                    dispatch(Loader(false))
                                    return
                                }
                                dispatch(Loader(false))
                            }).catch(error => {
                                dispatch(Loader(false))
                            });
                            return
                        }
                        dispatch(Loader(false))
                    }).catch(error => {
                        dispatch(Loader(false))
                    });
                    return
                }
                dispatch(Loader(false))
            }).catch(async (error) => {
                dispatch(Loader(false))
            });
        } catch (error) {
            dispatch(Loader(false))
        }
    };
}


