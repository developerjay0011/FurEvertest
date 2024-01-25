export const Get_Meals = "Get_Meals"
export const Get_Facilities = "Get_Facilities"
export const GetVaccination_Status = "GetVaccination_Status"
export const Get_MedicalConditions = "Get_MedicalConditions"
export const Location_DATA = "Location_DATA"
export const LOADER_DATA = "LOADER_DATA"
export const Get_Terms = "Get_Terms"
export const GetPrivacy_Policy = "GetPrivacy_Policy"
export const Notifications = "Notifications"

import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../utils/Url";
import axios from "axios";
import * as RootNavigation from '../../Navigation/RootNavigation';
import { Loader } from "./auth"
import Apiheaders from "../../utils/Apiheaders"


export const Location = (data) => {
    return async dispatch => {
        dispatch({
            type: Location_DATA,
            data: data
        });
    };
}


export const GetVaccinationStatus = () => {
    return async dispatch => {

        await axios(Api.Common + 'GetVaccinationStatus', {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetVaccinationStatus", response.data)
            if (response?.data) {
                var data = []
                for (let i = 0; i < response?.data.length; i++) {
                    const _id = response?.data[i].id
                    const element = response?.data[i].name
                    data.push({ label: element, value: _id })
                }
                dispatch({
                    type: GetVaccination_Status,
                    data: data
                })
            }
        }).catch(error => {
        });
    };
}


export const GetMedicalConditions = () => {
    return async dispatch => {
        await axios(Api.Common + 'GetMedicalConditions', {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetMedicalConditions", response.data)
            if (response?.data) {
                var data = []
                for (let i = 0; i < response?.data.length; i++) {
                    const _id = response?.data[i].id
                    const element = response?.data[i].name
                    data.push({ label: element, value: _id })
                }
                dispatch({
                    type: Get_MedicalConditions,
                    data: data
                })
            }
        }).catch(error => {
            console.log("GetMedicalConditions", error)
        });
    };
}

export const GetTerms = () => {
    return async dispatch => {
        await axios(Api.Common + `GetTerms`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("GetTerms", response?.data)
            dispatch({
                type: Get_Terms,
                data: response?.data
            })
        }).catch(async (error) => {
            dispatch(Loader(false))
            console.log("GetTerms", error)
        });
    };
}


export const GetPrivacyPolicy = () => {
    return async dispatch => {
        await axios(Api.Common + `GetPrivacyPolicy`, {
            method: 'get',
            headers: Apiheaders().login,
        }).then(async (response) => {
            console.log("GetPrivacyPolicy", response?.data)
            dispatch({
                type: GetPrivacy_Policy,
                data: response?.data
            })
        }).catch(async (error) => {
            dispatch(Loader(false))
        });
    };
}


export const GetNotifications = () => {
    return async dispatch => {
        const id = await AsyncStorage.getItem('id')
        await axios(Api.Common + `GetNotifications/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log("Notifications", response?.data)
            dispatch({
                type: Notifications,
                data: response?.data?.reverse()
            })
        }).catch(async (error) => {
            dispatch(Loader(false))
        });
    };
}


export const ClearNotifications = () => {
    return async dispatch => {
        dispatch(Loader(true))
        const id = await AsyncStorage.getItem('id')
        await axios(Api.Common + `ClearNotifications/0/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            dispatch(Loader(false))
            console.log("ClearNotifications", response?.data)
            dispatch(GetNotifications())
        }).catch(async (error) => {
            dispatch(Loader(false))
        });
    };
}