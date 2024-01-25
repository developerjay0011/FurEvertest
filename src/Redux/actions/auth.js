export const LOGIN = "LOGIN"
export const LOADER_DATA = "LOADER_DATA"


import AsyncStorage from "@react-native-async-storage/async-storage";
import Api from "../../utils/Url";
import Toast from "../../utils/Toast"
import axios from "axios";
import * as RootNavigation from '../../Navigation/RootNavigation';
import Apiheaders from "../../utils/Apiheaders"
import { Platform } from "react-native";
import Geocoder from 'react-native-geocoding';
import { SearchChildCenter } from "./user";
import messaging from '@react-native-firebase/messaging';


export const Loader = (data) => {
    return async dispatch => {
        dispatch({
            type: LOADER_DATA,
            data: data
        });
    };
}


export const Login = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Authentication + 'ValidateUser', {
            method: 'post',
            headers: Apiheaders().login,
            data: param
        }).then(async (response) => {
            dispatch(Loader(false))
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.data?.userId) {
                global.id = response.data.data.userId
                global.token = response.data.authToken
                await AsyncStorage.setItem('token', response.data.authToken)
                await AsyncStorage.setItem('id', String(response.data.data.userId))
                RootNavigation.replace("Home")
                dispatch({
                    type: LOGIN,
                    data: response.data.data
                })
            }
        }).catch(error => {
            console.log("error", error)
            dispatch(Loader(false))
        });
    };
}


export const CheckUserExists = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Authentication + `CheckUserExists/${param.mobile}`, {
            method: 'get',
            headers: Apiheaders().login,
        }).then(async (response) => {
            if (response?.data?.success) {
                await axios(Api.Authentication + `SendRegOtp`, {
                    method: 'post',
                    headers: Apiheaders().login,
                    data: {
                        mobile: param.mobile
                    }
                }).then(async (response) => {
                    console.log(response?.data, param.mobile)
                    dispatch(Loader(false))
                    Toast(response?.data?.message ? response?.data?.message : response?.data?.error)
                    if (response?.data?.success) {
                        RootNavigation.navigate("Otp", { param })
                    }
                }).catch(error => {
                    dispatch(Loader(false))
                });
            } else {
                Toast(response?.data?.message)
                dispatch(Loader(false))
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const Singup = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        console.log(param)
        const formData = new FormData();
        formData.append("userId", 0);
        formData.append("roleId", 0);
        formData.append("name", param.name);
        formData.append("mobile", param.mobile);
        formData.append("address", param.address);
        formData.append("email", param.email);
        formData.append("password", param.password);
        formData.append("token.deviceId", param?.token?.deviceId)
        formData.append("token.token", param?.token?.token)
        await axios(Api.Authentication + 'AddEditUser', {
            method: 'post',
            headers: Apiheaders().multipart,
            data: formData
        }).then(async (response) => {
            dispatch(Loader(false))
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.data?.userId) {
                global.id = response.data.data.userId
                global.token = response.data.authToken
                await AsyncStorage.setItem('token', String(response.data.authToken))
                await AsyncStorage.setItem('id', String(response.data.data.userId))
                RootNavigation.navigationRef.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
                dispatch({
                    type: LOGIN,
                    data: response.data.data
                })
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const ChangePassword = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Authentication + 'ChangePassword', {
            method: 'post',
            headers: Apiheaders().Auth,
            data: param
        }).then(async (response) => {
            dispatch(Loader(false))
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.success) {
                RootNavigation.navigate("Profile")
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const Userpic = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        const formData = new FormData();
        formData.append("UserId", param.userId);
        formData.append("Image", {
            name: param.image.name,
            type: param.image.type,
            uri: Platform.OS == "ios" ? param.image.image.replace("file://", "") : param.image.image
        });
        await axios(Api.Authentication + 'AddEditUser', {
            method: 'post',
            headers: Apiheaders().multipart,
            data: formData
        }).then(async (response) => {
            dispatch(Loader(false))
            console.log(response?.data)
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.success) {
                dispatch(GetSingleUser())
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const Edituser = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        const formData = new FormData();
        formData.append("userId", param?.userId);
        formData.append("name", param.name);
        formData.append("mobile", param.mobile);
        formData.append("address", param.address);
        formData.append("email", param.email);
        await axios(Api.Authentication + 'AddEditUser', {
            method: 'post',
            headers: Apiheaders().multipart,
            data: formData
        }).then(async (response) => {
            dispatch(Loader(false))
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.success) {
                dispatch(GetSingleUser())
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const GetSingleUser = () => {
    return async dispatch => {
        const id = await AsyncStorage.getItem('id')
        await axios(Api.Authentication + `GetSingleUser/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            if (response?.data.userId) {
                dispatch({
                    type: LOGIN,
                    data: response.data
                })
                if (response?.data?.address) { dispatch(Getlocation(response.data)) }
            } else {
                global.token = null
                messaging().deleteToken();
                await AsyncStorage.removeItem('token')
                RootNavigation.navigationRef.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        }).catch(error => {
        });
    };
}

export const Delete = () => {
    return async dispatch => {
        const id = await AsyncStorage.getItem('id')
        await axios(Api.Authentication + `DeleteUser/${id}`, {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data.success) {
                global.token = null
                messaging().deleteToken();
                await AsyncStorage.removeItem('token')
                RootNavigation.navigationRef.reset({
                    index: 0,
                    routes: [{ name: 'Login' }],
                });
            }
        }).catch(error => {
        });
    };
}


export const Getlocation = (user) => {
    return async dispatch => {
        await Geocoder.init(Api.map, { language: "en" })
        await Geocoder.from(user?.address)
            .then(json => {
                var location = json?.results[0]?.geometry?.location;
                if (location?.lat && location?.lng) {
                    dispatch(SearchChildCenter({ "latitude": String(location?.lat), "longitude": String(location?.lng), "loader": false }))
                    dispatch(SearchChildCenter({ "latitude": String(location?.lat), "longitude": String(location?.lng), "loader": false, recommended: true }))
                }
            })
            .catch(error => console.warn(error))
    }
}


export const VerifyOtp = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Authentication + 'VerifyOtp', {
            method: 'post',
            headers: Apiheaders().login,
            data: {
                "mobile": param.mobile,
                "otp": param.otp
            }
        }).then(async (response) => {
            if (response.data.success == false) {
                dispatch(Loader(false))
                Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            }
            if (response?.data?.success) {
                if (param?.param?.login == "forgot") {
                    dispatch(Loader(false))
                    RootNavigation.replace("Forgotpassword2", { param })
                    return
                }
                if (param?.param?.login == "sign") {
                    dispatch(Loader(false))
                    dispatch(Singup(param?.param))
                    return
                }
                else {
                    await axios(Api.Authentication + `UserLoginViaMobile/${param?.mobile}/${param?.token}`, {
                        method: 'get',
                        headers: Apiheaders().login,
                    }).then(async (response) => {
                        Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
                        if (response?.data?.data?.userId) {
                            global.id = response.data.data.userId
                            global.token = response.data.authToken
                            await AsyncStorage.setItem('token', response.data.authToken)
                            await AsyncStorage.setItem('id', String(response.data.data.userId))
                            RootNavigation.replace("Home")
                            dispatch({ type: LOGIN, data: response.data.data })
                        }
                        dispatch(Loader(false))
                    }).catch(error => {
                        dispatch(Loader(false))
                    });
                }
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const resend = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Authentication + `SendRegOtp`, {
            method: 'post',
            headers: Apiheaders().login,
            data: {
                mobile: param.mobile
            }
        }).then(async (response) => {
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            dispatch(Loader(false))
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const SendLoginOtp = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Authentication + `SendLoginOtp`, {
            method: 'post',
            headers: Apiheaders().login,
            data: {
                mobile: param.mobile
            }
        }).then(async (response) => {
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            if (response?.data?.success) {
                RootNavigation.replace("Otp", { param })
            }
            dispatch(Loader(false))
        }).catch(error => {
            console.log(error)
            dispatch(Loader(false))
        });
    };
}


export const resendL = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Authentication + `SendLoginOtp`, {
            method: 'post',
            headers: Apiheaders().login,
            data: {
                mobile: param.mobile
            }
        }).then(async (response) => {
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            dispatch(Loader(false))
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}


export const Forgotpassword = (param) => {
    return async dispatch => {
        dispatch(Loader(true))
        await axios(Api.Authentication + `UserForgotPassword`, {
            method: 'post',
            headers: Apiheaders().login,
            data: param
        }).then(async (response) => {
            Toast(response?.data?.error ? response?.data?.error : response?.data?.message)
            dispatch(Loader(false))
            if (response?.data?.success) {
                RootNavigation.replace("Login")
            }
        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}
export const Userpics = (param) => {
    return async dispatch => {
        await axios('https://api.visitorz.io/common/GetBlogs', {
            method: 'get',
            headers: Apiheaders().Auth,
        }).then(async (response) => {
            console.log(response?.data)

        }).catch(error => {
            dispatch(Loader(false))
        });
    };
}
