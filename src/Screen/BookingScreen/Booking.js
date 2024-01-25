import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, View, Image, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import { useNavigation } from '@react-navigation/native';
import Styles from "../../utils/Styles"
import Button from "../../Component/Button"
import moment from 'moment';
import Commonrow from "../../Component/Commonow"
import Pricinglist from "../../Component/Pricinglist"
import Facility from "../../Component/Facility"
import Activity from "../../Component/Activity"
import Dropdown from "../../Component/Dropdown"
import Close2 from '../../assets/svg/close2.svg';
import Mealstiming from "../../Component/Mealstiming"
import { connect } from 'react-redux';
import { Booking, Bookingdata, BookingStatus, Sendnoti } from '../../Redux/actions/user';
import showToast from '../../utils/Toast';
import { ImageSlider } from "react-native-image-slider-banner";
import Location from "../../assets/image/Location.png";
import axios from 'axios';
import Api from '../../utils/Url';
import Apiheader from "../../utils/Apiheaders"
import { Loader } from '../../Redux/actions/auth';
import RazorpayCheckout from 'react-native-razorpay';
import SuccessModal from "../../Component/Modal"
import Images from "../../Component/Images"
import { useTheme } from '../../../Theme';
import check from '../../assets/image/check.png';
import Textinput from '../../Component/TextInput'
// import { CFPaymentGatewayService, } from 'react-native-cashfree-pg-sdk';
// import {
//     CFDropCheckoutPayment,
//     CFEnvironment,
//     CFPaymentComponentBuilder,
//     CFPaymentModes,
//     CFSession,
//     CFThemeBuilder,
// } from 'cashfree-pg-api-contract';
// useEffect(() => {
//     CFPaymentGatewayService.setCallback({
//         async onVerify(orderID) {
//             props.Booking(orderID)
//         },
//         onError(error, orderID) {
//             if (error?.code == "action_cancelled") {

//             } else {
//                 props?.BookingStatus("notok")
//             }

//         },
//     });
// }, [])
// useEffect(() => {
//     return () => {
//         props?.BookingStatus(null)
// CFPaymentGatewayService.removeCallback();
//     }
// }, [])

// const Pay = async (data) => {
//     try {
//         props.Loader(true)
//         props.BookingStatus(null)
//         await axios(Api.User + `Booking`, {
//             method: 'post',
//             headers: Apiheader().Auth,
//             data: data
//         }).then(async (response) => {
//             if (response?.data?.success == true) {
//                 props.Loader(false)
//                 await AsyncStorage.setItem("booking_id", String(response?.data?.data?.bookingId))
//                 const session = new CFSession(
//                     response?.data?.data?.paymentSessionId,
//                     response?.data?.data?.orderId,
//                     CFEnvironment.SANDBOX
//                 );
//                 const paymentModes = new CFPaymentComponentBuilder()
//                     .add(CFPaymentModes.CARD)
//                     .add(CFPaymentModes.UPI)
//                     .add(CFPaymentModes.NB)
//                     .add(CFPaymentModes.PAYPAL)
//                     .add(CFPaymentModes.UPI)
//                     .add(CFPaymentModes.WALLET)
//                     .build();
//                 const theme = new CFThemeBuilder()
//                     .setNavigationBarBackgroundColor('#3F5629')
//                     .setNavigationBarTextColor('#FFFFFF')
//                     .setButtonBackgroundColor('#3F5629')
//                     .setButtonTextColor('#FFFFFF')
//                     .setPrimaryTextColor('#212121')
//                     .setSecondaryTextColor('#757575')
//                     .build();
//                 const dropPayment = new CFDropCheckoutPayment(session, paymentModes, theme);
//                 CFPaymentGatewayService.doPayment(dropPayment)
//             } else {
//                 setText(response?.data?.message)
//                 props.BookingStatus("notok")
//                 props.Loader(false)
//             }
//         }).catch(error => {
//             setText(error.toString())
//             props.BookingStatus("notok")
//             props.Loader(false)
//         });
//     } catch (e) {
//         setText(e.toString())
//         SetLoader(false)
//         props.Loader(false)
//         props.BookingStatus("notok")
//     }
// }
const MyComponent = (props) => {
    const { centerdata, fromdate, todate, childid } = props?.route?.params
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const navigation = useNavigation()
    const currenttime = moment()
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(childid?.value);
    const [value2, setValue2] = useState([]);
    const [open3, setOpen3] = useState(false);
    const [value3, setValue3] = useState(null);
    const [items3, setItems3] = useState([
        { label: '1 time meal', value: '1' },
        { label: '2 time meal', value: '2' },
        { label: '3 time meal', value: '3' },
        { label: '4 time meal', value: '4' },
    ]);
    const [meals, setMeals] = useState([])
    const [from, setFrom] = useState(fromdate)
    const [to, setTo] = useState(todate)
    const [openmodal, setopenmodal] = useState(false);
    const [openmodal2, setopenmodal2] = useState(false);
    const [term, setTerm] = useState(false);
    const [day, setDay] = useState(null)
    const [datessss, setDatessss] = useState([]);
    const [activity, setActivity] = useState([])
    const [woking, setWoking] = useState([]);
    const [bath, setBath] = useState([]);
    const [batharray, setBatharray] = useState([]);
    const [wokingarray, setWokingarray] = useState([]);
    const [othrsarray, setOthersarray] = useState([]);
    const [text, setText] = useState("");
    const [open4, setOpen4] = useState(false);
    const [timeperiod, setTimeperiod] = useState(null);
    const [fromtime, setFromtime] = useState("")
    const [totime, setTotime] = useState("")
    const [time2, setTime] = useState(null)
    const [pricing, setPricing] = useState([]);
    const [otherprice, setOtherprice] = useState([]);

    var selected_facility = pricing?.filter(item => item?.type == "Facility")
    var no_facility = pricing?.filter(item => item?.type != "Facility")
    var remove_stayPrice = pricing?.filter(item => item?.title != "Stay Price")
    var remove_bath = pricing?.filter(item => item?.type != "Bath")
    var remove_Walk = pricing?.filter(item => item?.type != "Walk & Play")
    var remove_Other = pricing?.filter(item => item?.type != "Other")
    const combinedTODateTime = time2 && timeperiod?.value ? moment(`${moment(to).format("DD-MM-YYYY")} ${moment(totime).format("hh:mm A")}`, "DD-MM-YYYY hh:mm A")?.add(timeperiod?.value, "hours") : ""
    var todatetime = time2 && timeperiod?.value ? moment(combinedTODateTime).format("YYYY-MM-DD") : ''
    const combinedFromDateTime = time2 && timeperiod?.value ? moment(`${moment(from).format("DD-MM-YYYY")} ${moment(fromtime).format("hh:mm A")}`, "DD-MM-YYYY hh:mm A") : ""

    const finaltotime = moment(totime).add(timeperiod?.value, "hours")





    const CountallPrice = () => {
        var PayPrice = 0
        for (let i = 0; i < pricing?.length; i++) {
            var element = pricing[i]?.totalprices
            PayPrice = element + PayPrice
        }
        return PayPrice
    }
    useEffect(() => {
        if (props?.booking == null) {
            return
        }
        if (props?.booking == "ok") {
            setopenmodal(true)
            return
        }
        if (props?.booking == "notok") {
            setopenmodal(true)
            return
        }
    }, [props?.booking])
    useEffect(() => {
        if (from && to) {
            DateDiff(to, from)
        }
    }, [from])


    const Alertstoselect = () => {
        if (timeperiod?.value == undefined || timeperiod?.value == "") {
            showToast("Please select time period")
            return true
        }
        if (from == null || from == "") {
            showToast("Please select stay date")
            return true
        }
        if (time2 == true && (fromtime == null || totime == null)) {
            showToast("Please select time slot")
            return true
        }
        return false
    }
    const Dateselect = (date) => {
        setFrom(date?.from);
        setTo(date?.to);
        DateDiff(date?.to, date?.from);
        setActivity([])
    }
    const DateDiff = (todates, fromdates) => {
        const startDate = moment(moment(fromdates)?.format("YYYY-MM-DD"));
        const endDate = moment(moment(todates)?.format("YYYY-MM-DD"));
        var timeDifferenceInDays = endDate.diff(startDate, 'days');
        var diffdate = timeDifferenceInDays ? (timeDifferenceInDays) : 1
        setDay(diffdate)
        if (time2 == false) {
            setPricing([{ totalprices: centerdata?.price * diffdate, title: "Stay Price", add: diffdate, mainprice: centerdata?.price, id: "nodata" }])
        }
        DateArray(diffdate, fromdates)
    }
    const DateArray = (dayas, from) => {
        var dates = []
        for (let i = 0; i < dayas; i++) {
            const element = moment(from).add(i, "days")
            dates.push({ date: element, bath: false })
        }
        setDatessss(dates)
    }



    const facilitytotal = (facility) => {
        var total = 0
        var list = facility ? facility : []
        var data = []
        if (list?.length > 0) {
            for (let i = 0; i < list?.length; i++) {
                const prices = list[i].price
                total = total + prices
                data.push({
                    totalprices: list[i].price * day,
                    title: list[i].name,
                    add: day,
                    mainprice: list[i].price,
                    type: "Facility",
                    id: list[i].id,
                    name: list[i].name,
                    price: list[i].price
                })
            }
            setPricing([...data, ...no_facility])
        } else {
            total = 0
            setPricing([...no_facility])
        }
        return total ? total : 0
    }



    const WalkingsTotal = (woking, select, Walkitem) => {
        var price = 0
        var Walkprice = Walkitem?.price
        var name = Walkitem?.name
        var id = Walkitem?.id
        if (select) {
            if (woking?.hours != null && woking?.times != null && woking?.times != " ") {
                price = (woking?.hours * Walkprice * woking?.times)
            }
            if (price) {
                setPricing([{
                    totalprices: price, title: "Walk & Play", add: day + " X " + woking?.times,
                    mainprice: (woking?.hours * Walkprice), type: "Walk & Play",
                    id: id, name: name, price: Walkprice
                }, ...remove_Walk])
            } else {
                setPricing([...remove_Walk])
            }
        } else {
            setPricing([...remove_Walk])
        }
        return price
    }
    const Walkings = (woking, select, item) => {
        if (woking?.hours != null && woking?.times != null && woking?.times != " " && select) {
            setWoking({ hours: woking?.hours, times: woking?.times });
            var Walking = activity?.filter(item2 => item2?.name == "Walk & Play")[0]?.time?.map(item => item?.time)
            var hours = woking?.hours == "1" ? "30 Min" : woking?.hours == "2" ? "1 Hours" : woking?.hours == "3" ? "2 Hours" : null
            var noOfTimeWalk = woking?.times
            var time = Walking?.toString();
            setWokingarray([{
                "activityId": String(activity?.filter(item2 => item2?.name == "Walk & Play")[0]?.id),
                "activityType": "2",
                "bookingId": "0",
                "noOfTimeWalk": noOfTimeWalk,
                "bathDates": [],
                "walkTime": hours,
                "activityTime": time ? time : null
            }])
            WalkingsTotal({ hours: woking?.hours, times: woking?.times }, select, item);
        } else {
            setWoking();
            WalkingsTotal({ hours: woking?.hours, times: woking?.times }, select, item);
            setWokingarray([])
        }
    }
    const Walkingtime = (data) => {
        var times = [...wokingarray]
        var Walking = data?.filter(item2 => item2?.name == "Walk & Play")[0]?.time?.map(item => item?.time)
        var time = Walking.toString();
        times[0].activityTime = time
        setWokingarray(times)
    }



    const Bathtotal = (bathdate, select, activity) => {
        var total = 0
        if (select) {
            var dateselect = bathdate?.filter(item => item?.bath == true)?.length
            var Price = activity.filter(item => item?.name == "Bath")[0]?.price
            var id = activity.filter(item => item?.name == "Bath")[0]?.id
            var name = activity.filter(item => item?.name == "Bath")[0]?.name
            total = dateselect * Price
            if (total) {
                setPricing([{
                    totalprices: total, title: "Bath", add: dateselect, mainprice: Price, type: "Bath",
                    id: id, name: name, price: Price
                }, ...remove_bath])
            } else {
                setPricing([...remove_bath])
            }
        } else {
            setPricing([...remove_bath])
        }
        return total ? total : 0
    }
    const Baths = (datass, select, id2, bathitem) => {
        setBath(datass);
        if (select) {
            var bathtrue = datass?.filter(item => item?.bath == true)
            var date = bathtrue?.map(item => moment(item?.date).format("YYYY-MM-DD"))
            var id = activity?.filter(item2 => item2?.name == "Bath")[0]?.id
            var time = activity?.filter(item2 => item2?.name == "Bath")[0]?.time
            if (date?.length > 0) {
                var bathdata = [{
                    "activityId": id2 ? String(id2) : String(id),
                    "activityType": "1",
                    "bookingId": "0",
                    "noOfTimeWalk": 0,
                    "bathDates": date,
                    "walkTime": "",
                    "activityTime": time ? time : null
                }]
                setBatharray(bathdata)
                Bathtotal(bathtrue, select, [bathitem])
            } else {
                setBatharray([])
                Bathtotal(bathtrue, false, [bathitem])
            }
        } else {
            setBatharray([])
            Bathtotal(bathtrue, false, [bathitem])
        }
    }


    const Othertotal = (activity, select, Otheritem) => {
        var otherlistdata = [...otherprice]
        const otherlist = activity?.filter(item2 => item2?.name != "Bath" && item2?.name != "Walk & Play")
        var price = Otheritem?.price
        var name = Otheritem?.name
        var id = Otheritem?.activityId
        if (select) {
            otherlistdata?.push({ totalprices: price * day, title: name, add: day, mainprice: price, type: "Other", id: id, name: name, price: price })
            setOtherprice(otherlistdata)
            setPricing([...otherlistdata, ...remove_Other])
        } else {
            var setdata = otherlistdata?.filter(item => item?.id != id)
            console.log(otherlistdata?.filter(item => item?.id != id))
            setOtherprice(setdata)
            setPricing([...setdata, ...remove_Other])
        }

        var totalOther = 0
        for (let i = 0; i < otherlist?.length; i++) {
            var element = otherlist[i]?.price
            totalOther = element + totalOther
        }
        return totalOther
    }
    const Others = (data, select, item) => {
        var other = []
        const otherlist = data?.filter(item2 => item2?.name != "Bath" && item2?.name != "Walk & Play")
        if (otherlist?.length > 0) {
            Othertotal(data, select, item)
            for (let i = 0; i < otherlist?.length; i++) {
                var id = otherlist[i]?.id
                other?.push({
                    "activityId": String(id),
                    "activityType": "3",
                    "bookingId": "0",
                    "noOfTimeWalk": 0,
                    "bathDates": [],
                    "walkTime": "",
                    "activityTime": otherlist[i]?.time ? otherlist[i]?.time : null
                })
            }
        } else {
            other = []
            Othertotal(data, select, item)
            setPricing([...remove_Other])
        }
        setOthersarray(other)
    }
    const Otherstime = (data) => {
        var times = [...othrsarray]
        const otherlist = data?.filter(item2 => item2?.name != "Bath" && item2?.name != "Walk & Play")
        if (times?.length > 0) {
            for (let i = 0; i < times?.length; i++) {
                var time = otherlist?.filter(item => item?.activityId == times[i]?.id)[0]?.time
                times[i].activityTime = time
            }
        }
        setOthersarray(times)
    }



    const Book = () => {
        if (moment(combinedFromDateTime).isBefore(currenttime)) {
            showToast("Please select proper from and to time.")
            return
        }
        if (value?.value == "" || value?.value == null) {
            showToast("Please Select Pet")
            return
        }
        if (from == "" || from == null) {
            showToast("Please select from date")
            return
        }
        if (to == "" || to == null) {
            showToast("Please select to date")
            return
        }
        if (time2 && (fromtime == null || fromtime == "")) {
            showToast("Please select time slot")
            return
        }
        if (value2.length == 0) {
            showToast("Please enter pet meal")
            return
        }
        if (value2.filter(item => item?.mealId == null || item?.timing == null)?.length > 0) {
            showToast("Please enter all meals details")
            return
        }
        if (activity.filter(item => item?.name == "Bath")?.length > 0) {
            if (bath.filter(item => item?.bath == true)?.length == 0) {
                showToast("Please select Bath date")
                return
            }
        }
        if (activity.filter(item => item?.name == "Walk & Play")?.length > 0) {
            if (woking?.hours == null && (woking?.times == null || woking?.times == " ")) {
                showToast("Please enter walking details")
                return
            }
            if (wokingarray[0]?.activityTime?.split(',')?.filter(item => item == "")?.length > 0) {
                showToast("Please select walking timing")
                return
            }
        }
        if (activity.filter(item => item?.name != "Walk & Play" && item?.name != "Bath")?.length > 0) {
            if (othrsarray?.filter(item => item == null)?.length > 0) {
                showToast("Please select all activity timing")
                return
            }
        }
        if (term == false) {
            showToast("Please accept Terms And Conditions")
            return
        }
        Payrazore()
    }
    const Payrazore = async () => {
        props.Loader(true)
        props.BookingStatus(null)
        await axios(Api.User + `CheckBookingExists`, {
            method: 'post',
            headers: Apiheader().Auth,
            data: {
                "bookingFrom": moment(from).format("YYYY-MM-DD"),
                "bookingTo": time2 ? todatetime : moment(to).format("YYYY-MM-DD"),
                "childId": value?.value,
                "centerId": centerdata?.centerId,
                "fromTime": fromtime ? moment(fromtime).format("hh:mm A") : "",
                "toTime": totime ? moment(totime).add(timeperiod?.value, "hours").format("hh:mm A") : "",
                "isHourlyBooking": time2
            }
        }).then(async (response) => {
            console.log("CheckBookingExists", response?.data, {
                "bookingFrom": moment(from).format("YYYY-MM-DD"),
                "bookingTo": time2 ? todatetime : moment(to).format("YYYY-MM-DD"),
                "childId": value?.value,
                "centerId": centerdata?.centerId,
                "fromTime": fromtime ? moment(fromtime).format("hh:mm A") : "",
                "toTime": totime ? moment(totime).add(timeperiod?.value, "hours").format("hh:mm A") : "",
                "isHourlyBooking": time2
            })
            if (response?.data?.success == true) {
                options = {
                    description: 'Credits towards consultation',
                    currency: 'INR',
                    key: 'rzp_test_ymuHZMJ7uAY03r',
                    amount: Number(CountallPrice()) * 100,
                    name: 'FurEver',
                    prefill: {
                        email: props?.user?.email,
                        contact: props?.user?.mobile,
                        name: props?.user?.name
                    },
                    theme: { color: '#73AB6B', hide_topbar: true }
                }
                RazorpayCheckout.open(options).then(async (data) => {
                    console.log("RazorpayCheckout", data)
                    await axios(Api.User + `Booking`, {
                        method: 'post',
                        headers: Apiheader().Auth,
                        data: {
                            "bookingFrom": moment(from).format("YYYY-MM-DD"),
                            "bookingTo": time2 ? todatetime : moment(to).format("YYYY-MM-DD"),
                            "userId": global.id,
                            "mealTimings": value2?.map(item => ({ mealId: item?.mealId, timing: item?.timing })),
                            "childId": value?.value,
                            "centerId": centerdata?.centerId,
                            "date": moment(),
                            "price": Number(CountallPrice()),
                            "facilities": selected_facility?.map(item => (item?.id)),
                            "activities": [...wokingarray, ...batharray, ...othrsarray],
                            "paymentMode": "Online",
                            "transactionId": data?.razorpay_payment_id,
                            "fromTime": fromtime ? moment(fromtime).format("hh:mm A") : "",
                            "toTime": totime ? moment(totime).add(timeperiod?.value, "hours").format("hh:mm A") : "",
                            "isHourlyBooking": time2
                        }
                    }).then(async (response) => {
                        console.log("Bookingsccess", response?.data)
                        if (response?.data?.success == true) {
                            setText(response?.data?.message)
                            var partnerTokens = response?.data?.data?.partnerTokens?.map((item) => item?.firebaseToken)
                            props?.Sendnoti({
                                "to": partnerTokens,
                                "title": "New booking Placed",
                                "body": "You have one new booking from " + response?.data?.data?.bookingDetails?.userName,
                                "content_available": true,
                                "priority": "max",
                                "visibility": "public",
                                "bookingid": response?.data?.data?.bookingDetails?.bookingId,
                                "nav": "booking_list",
                                "status": "upcoming",
                            })
                            props.BookingStatus("ok")
                            props.Loader(false)
                            return
                        } else {
                            setText(response?.data?.message)
                            props.BookingStatus("notok")
                            props.Loader(false)
                        }
                    }).catch(error => {
                        console.log(error)
                        setText(error.toString())
                        props.BookingStatus("notok")
                        props.Loader(false)
                    });
                }).catch((error) => {
                    console.log(error)
                    props.Loader(false)
                    setText("Please Try Again.")
                    props.BookingStatus("notok")
                });
                return
            } else {
                setText(response?.data?.message)
                props.BookingStatus("notok")
                props.Loader(false)
            }
        }).catch(error => {
            setText(error.toString())
            props.BookingStatus("notok")
            props.Loader(false)
        })
    }






    const Imagesview = ({ item, index }) => <Images item={item} index={index} />;
    const PricingArray = ({ item, index }) => <Pricinglist item={item} index={index} />;
    const FacilitiesArray = ({ item, index }) => <Commonrow item={item} key={index} />;
    const MealsArray = ({ index }) => (
        <Mealstiming
            index={index}
            key={index}
            data={centerdata?.meals}
            isHourlyBooking={time2}
            fromTime={fromtime}
            toTime={finaltotime}
            onSelect={(item2) => {
                if (value2?.length > 0) {
                    let markers = [...value2];
                    markers[item2?.index].mealId = item2?.mealId;
                    markers[item2?.index].timing = item2?.time;
                    setValue2(markers);
                }
            }}
            onPress={(index2, mealid, time) => {
                if (Alertstoselect() == false) {
                    var meals = []
                    if (value2?.length == 0) {
                        meals?.push({ mealId: mealid, timing: time, index: index2 })
                        setValue2(meals)
                    } else {
                        if (value2?.filter(item3 => index2 == item3?.index)?.length > 0) {
                            let markers = [...value2];
                            markers[index2].mealId = mealid;
                            markers[index2].timing = time;
                            setValue2(markers);
                            return
                        } else {
                            meals?.push(...value2, { mealId: mealid, timing: time, index: index2 })
                            setValue2(meals)
                        }
                    }
                }
            }}
        />
    )
    const FacilityArray = ({ item, index }) => {
        return (
            <Facility
                key={index}
                select={selected_facility}
                onPress={() => {
                    if (from & to) {
                        var data = []
                        if (selected_facility?.filter((item3) => item3?.id == item?.facilityId).length > 0) {
                            data = selected_facility?.filter((item3) => item3.id != item?.facilityId)
                            facilitytotal(data)
                            return
                        } else {
                            var setdata = { price: item?.price, id: item?.facilityId, name: item?.name }
                            facilitytotal([...selected_facility, setdata])
                        }
                    } else {
                        Alertstoselect()
                    }
                }}
                item={item}
            />
        )
    }
    const ActivitiesArray = ({ item, index }) => (
        <Activity
            key={index}
            ifHour={timeperiod?.value == 24 ? false : true}
            selectlist={activity}
            isHourlyBooking={time2}
            Datess={datessss}
            from={from}
            to={to}
            fromTime={fromtime}
            toTime={finaltotime}
            OnBath={(item2, select, id, item) => { Baths(item2, select, id, item) }}
            OnWalking={(hours, times, select) => { Walkings({ hours, times }, select, item) }}
            onTimes={(time) => {
                var times = [...activity]
                var samedata = times?.filter(item2 => item?.activityId == item2?.id)
                samedata[0].time = time
                var notsamedata = times?.filter(item2 => item?.activityId != item2?.id)
                times = [...samedata, ...notsamedata]
                setActivity(times)
                if (item?.name == "Walk & Play") {
                    Walkingtime(times)
                    return
                }
                if (item?.name != "Walk & Play" && item?.name != "Bath") {
                    Otherstime(times)
                    return
                }
            }}
            onAlert={() => { if (from && to) { } else { Alertstoselect() } }}
            onPress={(select) => {
                if (Alertstoselect() == false) {
                    var data = []
                    if (activity?.filter((item3) => item3?.id == item?.activityId).length > 0) {
                        var activitydata = activity?.filter((item3) => item3.id != item?.activityId)
                        setActivity(activitydata)
                        if (item?.name != "Bath" && item?.name != "Walk & Play") {
                            Others(activitydata, select, item)
                        }
                        return
                    } else {
                        data.push(...activity, { price: item?.price, id: item?.activityId, name: item?.name })
                        setActivity(data)
                        if (item?.name != "Bath" && item?.name != "Walk & Play") {
                            Others(data, select, item)
                        }
                        return
                    }
                }
            }}
            item={item}
        />
    )


    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: "space-between", flexDirection: "column" }}>
                <View style={{ width: "100%" }}>
                    <View style={{ width: "100%" }}>
                        <ImageSlider
                            data={centerdata?.image?.map(item => ({ img: item }))}
                            caroselImageStyle={[themestyles.image, { resizeMode: "cover" }]}
                            timer={5000}
                            autoPlay={true}
                            showIndicator={true}
                            indicatorContainerStyle={{ bottom: 0 }}
                            inActiveIndicatorStyle={{ width: 10, height: 10, backgroundColor: "rgba(255,255,255,.3)" }}
                            activeIndicatorStyle={{ width: 10, height: 10, backgroundColor: "white" }}
                        />
                        <Header onPress={() => navigation.goBack()} position={true} />
                    </View>

                    <View style={{ width: "100%", paddingHorizontal: 20, paddingTop: 10 }}>

                        <View style={{ width: "100%" }}>
                            <Text style={[themestyles.name2]}>{centerdata?.centerName}</Text>
                            <TouchableOpacity onPress={() => { navigation.navigate("Roomlocation", { location: { address: centerdata?.address, hide: true } }) }} style={[Styles.flexrow, { marginTop: 8 }]}>
                                <Image source={Location} style={themestyles.icon} />
                                <Text style={[themestyles.loacation]}>{centerdata?.address}</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={[themestyles.name1, { marginTop: 20 }]}>
                            Gallery Photos
                        </Text>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        data={centerdata?.image?.map(item => ({ img: item }))}
                        horizontal
                        renderItem={Imagesview}
                        contentContainerStyle={{ marginTop: 15, paddingRight: 5, marginBottom: 20, paddingLeft: 20 }}
                    />

                    <View style={{ width: "100%", paddingHorizontal: 20, paddingBottom: 10 }}>
                        <Text style={[themestyles.name1, { marginBottom: 10 }]}>
                            Rate
                        </Text>

                        <View style={themestyles.grand}>
                            <Text style={[themestyles.name3]}>
                                Full Day Rate
                            </Text>
                            <Text style={[themestyles.name3]}>
                                ₹ {centerdata?.price}
                            </Text>
                        </View>

                        <View style={[themestyles.grand, { marginBottom: 15 }]}>
                            <Text style={[themestyles.name3]}>
                                Hourly Rate
                            </Text>
                            <Text style={[themestyles.name3]}>
                                ₹ {centerdata?.hourlyPrice}
                            </Text>
                        </View>

                        <Text style={[themestyles.name1, { marginBottom: 5 }]}>
                            Facilities
                        </Text>

                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={centerdata?.facilities}
                            renderItem={FacilitiesArray}
                            numColumns={3}
                            key={3}
                            scrollEnabled={false}
                            contentContainerStyle={{ marginBottom: 10 }}
                        />

                        <Dropdown
                            open={open}
                            value={value}
                            items={props?.childlist}
                            setOpen={() => setOpen(!open)}
                            setValue={(value) => setValue(value)}
                            placeholder={"Select Pet"}
                            placeholdercolor={theme?.commontextgrey}
                            label={"Pet"}
                        />

                        <Dropdown
                            open={open4}
                            value={timeperiod}
                            label={"Time period"}
                            items={[
                                { label: '3 Hours', value: '3' },
                                { label: '6 Hours', value: '6' },
                                { label: '12 Hours', value: '12' },
                                { label: 'Full Day and Night', value: '24' },
                            ]}
                            setOpen={() => { setOpen4(!open4); }}
                            setValue={(value) => {
                                setTimeperiod(value);
                                setTime(value?.value == 24 ? false : true)
                                var Price = value?.value == 24 ? centerdata?.price : centerdata?.hourlyPrice
                                var a = from ? moment(from) : null
                                var b = to ? moment(to) : null
                                var diffdate = a && b ? b.diff(a) : null
                                setActivity([])
                                setOthersarray([])
                                setBatharray([])
                                setOtherprice([])
                                if (value?.value != 24) {
                                    Price = Price
                                    setPricing([{ totalprices: Price * value?.value, title: "Stay Price", add: value?.value, mainprice: centerdata?.hourlyPrice, id: "nodata" }])
                                    if (diffdate != 0 || diffdate == null) {
                                        setFrom(null)
                                        setTo(null)
                                    }
                                } else {
                                    Price = diffdate ? Price * diffdate : Price
                                    if (diffdate != 0 || diffdate != null) {
                                        setPricing([{ totalprices: Price, title: "Stay Price", add: diffdate, mainprice: centerdata?.price, id: "nodata" }])
                                    }
                                    if (diffdate == 0 || diffdate == null) {
                                        setPricing([])
                                        setFrom(null)
                                        setTo(null)
                                    }
                                }
                            }}
                            placeholder={"Select time period"}
                            placeholdercolor={theme?.commontextgrey}
                        />

                        {timeperiod?.value == 3 || timeperiod?.value == 12 || timeperiod?.value == 6 ?
                            <View style={[Styles.spacebetween]}>
                                <Textinput
                                    type="date"
                                    datetype={0}
                                    style={{ width: "34%" }}
                                    alert={() => { showToast("Please select time period") }}
                                    showalert={timeperiod?.value == undefined || timeperiod?.value == ""}
                                    placeholder="Date"
                                    label={"Date"}
                                    format={"DD, MMM"}
                                    mintime={moment()}
                                    value={from}
                                    multiple={true}
                                    onChangeText={(date) => { Dateselect(date) }}
                                />
                                <Textinput
                                    type="time"
                                    datetype={0}
                                    style={{ width: "64%" }}
                                    alert={() => { showToast("Please select time period") }}
                                    showalert={timeperiod?.value == undefined || timeperiod?.value == ""}
                                    placeholder="Time slot"
                                    mintime={moment()}
                                    label={"Time slot"}
                                    format={"hh:mm A"}
                                    no_value={2}
                                    value={fromtime}
                                    value2={moment(totime).add(timeperiod?.value, "hours")}
                                    onChangeText={(time) => {
                                        setActivity([])
                                        setOthersarray([])
                                        setBatharray([])
                                        setOtherprice([])
                                        setValue2(value2?.length > 0 ? value2?.map(item => ({ ...item, timing: item?.timing == null })) : [])
                                        setFromtime(moment(time))
                                        setTotime(moment(time))
                                    }}
                                />
                            </View>
                            :
                            null}

                        {timeperiod?.value == 24 ?
                            <View style={[Styles.spacebetween]}>
                                <Textinput
                                    type="date"
                                    datetype={1}
                                    style={{ width: "48%" }}
                                    alert={() => { showToast("Please select time period") }}
                                    showalert={timeperiod?.value == undefined || timeperiod?.value == ""}
                                    multiple={true}
                                    placeholder="From"
                                    label={"From Date"}
                                    format={"DD, MMM"}
                                    value={from}
                                    onChangeText={(date) => { Dateselect(date) }}
                                />
                                <Textinput
                                    type="date"
                                    datetype={1}
                                    style={{ width: "48%" }}
                                    alert={() => { showToast("Please select time period") }}
                                    showalert={timeperiod?.value == undefined || timeperiod?.value == ""}
                                    multiple={true}
                                    label={"To Date"}
                                    placeholder="To"
                                    format={"DD, MMM"}
                                    value={to}
                                    onChangeText={(date) => { Dateselect(date) }}
                                />
                            </View>
                            :
                            null}

                        <View style={[themestyles.line, , { marginTop: 20 }]} />

                        <Text style={[themestyles.name1, { marginTop: 20, marginBottom: 5 }]}>
                            Meals
                        </Text>


                        <Dropdown
                            open={open3}
                            placeholdercolor={theme?.commontextgrey}
                            value={value3}
                            items={items3}
                            alert={() => { Alertstoselect("Please select time period") }}
                            setOpen={() => setOpen3(!open3)}
                            setValue={(value) => { setValue3(value), setMeals([...Array.from({ length: value?.value }, (_, i) => i + 1)]) }}
                            setItems={setItems3}
                            placeholder={"Select meal timing"}
                            style={{ marginVertical: value3?.value ? 0 : 10, marginTop: 15 }}
                        />

                        <FlatList
                            renderItem={MealsArray}
                            data={meals}
                            scrollEnabled={false}
                            showsVerticalScrollIndicator={false}
                            style={{ marginBottom: 20 }}
                        />

                        <View style={themestyles.line} />

                        <Text style={[themestyles.name1, { marginTop: 20, marginBottom: 20 }]}>Facilities</Text>

                        <FlatList
                            showsVerticalScrollIndicator={false}
                            data={centerdata?.facilities}
                            scrollEnabled={false}
                            renderItem={FacilityArray}
                            style={{ marginBottom: 20 }}
                        />

                        {centerdata?.activities?.length > 0 ?
                            <>
                                <View style={themestyles.line} />
                                <Text style={[themestyles.name1, { marginTop: 20, marginBottom: 10 }]}>Activities</Text>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={centerdata?.activities}
                                    scrollEnabled={false}
                                    renderItem={ActivitiesArray}
                                />
                            </>
                            :
                            null
                        }
                        <View style={[themestyles.line, { marginTop: 20 }]} />

                        {pricing?.length > 0 ?
                            <>
                                <Text style={[themestyles.name1, { marginTop: 20, marginBottom: 15 }]}>Pricing Breakup</Text>
                                <FlatList
                                    showsVerticalScrollIndicator={false}
                                    data={pricing}
                                    scrollEnabled={false}
                                    renderItem={PricingArray}
                                />
                                <View style={[themestyles.line, { marginTop: 20, marginBottom: 10 }]} />
                                <View style={themestyles.grand}>
                                    <Text style={[themestyles.name3, { color: "black" }]}>
                                        Total Amount
                                    </Text>
                                    <Text style={[themestyles.name3, { color: "black" }]}>
                                        ₹ {CountallPrice()}
                                    </Text>
                                </View>
                                <View style={[themestyles.line, { marginTop: 10 }]} />
                            </>
                            :
                            null
                        }


                        <View style={[Styles.flexrow, { marginTop: 20 }]}>
                            <TouchableOpacity onPress={() => { setTerm(!term) }} style={[themestyles.box, { backgroundColor: term ? theme.commongreen : null }]}>
                                {term ? <Image source={check} style={themestyles.check} /> : null}
                            </TouchableOpacity>
                            <Text onPress={() => { setopenmodal2(true) }} style={[themestyles.yes]}>Terms & conditions*</Text>
                        </View>

                    </View>
                </View>
                <View style={[themestyles?.Pay, { justifyContent: pricing?.length > 0 ? "space-between" : "center" }]}>
                    {pricing?.length > 0 ?
                        <View style={{ width: "38%" }}>
                            <Text style={[themestyles.name3, { color: "#F6F6F6" }]}>
                                ₹ {CountallPrice()}
                            </Text>
                            <Text style={[themestyles.name3, { color: "#F6F6F6", fontSize: fontSize.font15, marginTop: 3, fontFamily: fontFamily.FontRegular }]}>
                                Total Amount
                            </Text>
                        </View>
                        :
                        null
                    }
                    <Button name="Book Now & Pay" onPress={() => { Book() }} button={themestyles.Paybutton} text={{ fontSize: fontSize.font20 }} />
                </View>
            </ScrollView>


            <SuccessModal
                openmodal={openmodal}
                success={props?.booking == "ok"}
                text={text}
                Stitletext="Booking Confirmed."
                stext={"Your Booking is Successful.\nThank you"}
                Ftitletext="Payment Failed"
                onPress={() => { setopenmodal(!openmodal); }}
                Okay={() => { props?.BookingStatus(null), setopenmodal(!openmodal), navigation.navigate("Bookings", { barno: 1 }) }}
                Cancel={() => { setopenmodal(!openmodal), props?.BookingStatus(null) }}
                Tryagain={() => { setopenmodal(!openmodal), Book() }}
            />
            <Modal
                animationType="none"
                transparent={true}
                visible={openmodal2}
                onRequestClose={() => { setopenmodal2(!openmodal2); }}>
                <View style={themestyles.Modalview}>
                    <View style={themestyles.ModalItem1}>
                        <ScrollView>
                            <View style={Styles.spacebetween}>
                                <Text style={[themestyles.yes, { fontSize: width / 22, fontFamily: fontFamily.FontSemiBold }]}>Terms And Conditions</Text>
                                <TouchableOpacity onPress={() => { setopenmodal2(false) }}>
                                    <Close2 />
                                </TouchableOpacity>
                            </View>
                            <Text style={[themestyles.yes, { fontSize: width / 27, marginTop: 10, paddingHorizontal: 5 }]}>
                                {props?.terms?.terms}
                            </Text>
                            <Button button={{ width: "30%", marginTop: 10, height: width / 12 }}
                                text={{ fontSize: width / 28, }}
                                name="Accept" onPress={() => { setTerm(true), setopenmodal2(false) }} />
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </SafeAreaView >
    );
};


const mapState = (state) => {
    return {
        meals: state.common.meals,
        facilities: state.common.facilities,
        terms: state.common.terms,
        childlist: state.booking.childlist,
        booking: state.booking.Booking,
        bookingdata: state.booking.bookingdata,
        user: state.user.user,
        currentBooking: state.booking.currentBooking,
        Upcomingbooking: state.booking.Upcomingbooking,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Booking: (data) => dispatch(Booking(data)),
        BookingStatus: (data) => dispatch(BookingStatus(data)),
        Bookingdata: (data) => dispatch(Bookingdata(data)),
        Loader: (data) => dispatch(Loader(data)),
        Sendnoti: (data) => dispatch(Sendnoti(data)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);