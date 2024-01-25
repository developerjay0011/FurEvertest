import React, { useEffect, useState, useCallback, useRef } from 'react';
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, RefreshControl, ScrollView, Platform, Image } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import Styles from "../../utils/Styles"
import moment from 'moment';
import Homerow from "../../Component/Homerow"
import { useNavigation } from '@react-navigation/native';
import { GetMedicalConditions, GetNotifications, GetPrivacyPolicy, GetTerms, GetVaccinationStatus } from '../../Redux/actions/common';
import { GetCurrentBooking, GetBookingHistory, GetUpcomingBooking, GetUserChilds, SearchChildCenter, SearchChildCenter2, BookingStatus, GetNotSentReviewList, addReview, Likedata, GetBooking, AddReviewModal, SearchChild2 } from '../../Redux/actions/user';
import Loader from "../../Component/Loader"
import { connect } from 'react-redux';
import { GetSingleUser } from '../../Redux/actions/auth';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Location from "../../assets/svg/location.svg"
import Api from '../../utils/Url';
import Calender from "../../Component/Calender"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Offers from "../../Component/Offers"
import PushNotification, { Importance } from "react-native-push-notification"
import messaging, { firebase } from '@react-native-firebase/messaging';
import { checkNotifications, requestNotifications } from 'react-native-permissions';
import Review from '../../Component/Review';
import glass from '../../assets/image/glass.png';
import plus from '../../assets/image/plus.png';
import minus from '../../assets/image/minus.png';
import { useTheme } from '../../../Theme'
import showToast from '../../utils/Toast';

const MyComponent = (props) => {
    const { theme, width, fontSize } = useTheme();
    const ref = useRef()
    const themestyles = styles()
    const navigation = useNavigation()
    const [select, setSelect] = useState("Recommended");
    const [location, setLocation] = useState('')
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [marked, setmarked] = useState({});
    const [count, setCount] = useState(0)
    const [refreshing, setRefreshing] = useState(false);
    const datas = [
        {
            image: require("../../assets/image/booking.jpeg")
        },
        {
            image: require("../../assets/image/booking2.jpeg")
        },
    ]
    var data = [
        {
            name: "Recommended"
        },
        {
            name: "Trending"
        },
    ]
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);
    const wait = () => {
        return new Promise(resolve => setTimeout(resolve, 2000));
    }
    const getFavourite = async () => {
        const result = await AsyncStorage.getItem("Favourites")
        var news = JSON.parse(result)
        props?.Likedata(news)
    }
    const call = (data) => {
        getFavourite()
        props?.GetNotSentReviewList()
        props.GetNotifications()
        props.GetCurrentBooking()
        props.GetBookingHistory()
        props.GetUpcomingBooking()
        if (data != "main_data") {
            props.GetSingleUser()
            props.GetUserChilds()
            props.GetMedicalConditions()
            props.GetVaccinationStatus()
            props.GetTerms()
            props?.GetPrivacyPolicy()
        }
    }
    const Add = async (like, item) => {
        if (like) {
            remove(like, item)
        } else {
            const result = await AsyncStorage.getItem("Favourites")
            var tempArr = JSON.parse(result)
            if (tempArr == null) { tempArr = [] }
            tempArr.push(item)
            await AsyncStorage.setItem("Favourites", JSON.stringify(tempArr))
            props.Likedata(tempArr)
            showToast("Added to favourites list")
        }
    }
    const remove = async (like, item) => {
        const result = await AsyncStorage.getItem("Favourites")
        var tempArr = JSON.parse(result)
        var remove = tempArr?.filter?.(item2 => item2?.centerId != item?.centerId)
        await AsyncStorage.setItem("Favourites", JSON.stringify(remove))
        showToast("Remove to favourites list")
        props.Likedata(remove)
    }


    useEffect(() => {
        onRefresh()
        checkNotifications().then(({ status }) => {
            if (status == "denied") {
                requestNotifications(['alert', 'sound']).then(() => { });
            } else { }
        });

        PushNotification.createChannel(
            {
                channelId: "FurEver",
                channelName: "Fur_Ever",
                channelDescription: "All activity notifications",
                playSound: true,
                importance: Importance.HIGH,
                vibrate: true,
            },
            (created) => (`createChannel returned '${created}'`)
        )

        PushNotification.configure({
            onRegister: function (token) { if (Platform.OS === 'android') { console.log('FcmToken', token); } },
            popInitialNotification: true,
            requestPermissions: true,
            onNotification: function (notification) {
                if (notification.userInteraction) {
                    call("main_data")
                    if (notification?.data?.nav == "booking_data") {
                        props?.GetBooking({
                            id: notification?.data?.bookingid,
                            status: notification?.data?.status,
                        })
                        return
                    }
                    if (notification?.data?.nav == "review") {
                        props?.GetBooking({
                            id: notification?.data?.bookingid,
                            status: "history",
                            open: "true"
                        })
                        return
                    }
                }
            },
        });


        messaging().setBackgroundMessageHandler(async () => {
            call("main_data")
        });

        const unsubscribe = messaging().onMessage(async remoteMessage => {
            call("main_data")
            if (remoteMessage?.data?.isScheduled == "true") {
                PushNotification.localNotificationSchedule({
                    title: remoteMessage?.notification?.title,
                    message: remoteMessage?.notification?.body,
                    date: new Date(String(remoteMessage?.data?.scheduledTime)),
                    ignoreInForeground: false,
                    allowWhileIdle: false,
                    repeatTime: 1,
                    vibrate: true,
                    vibration: 300,
                    playSound: true,
                    channelId: "FurEver",
                    priority: firebase.messaging.NotificationAndroidPriority.PRIORITY_MAX,
                    visibility: "public",
                    data: { ...remoteMessage?.data }
                });
                return
            }
            else {
                PushNotification.localNotification({
                    title: remoteMessage?.notification?.title,
                    message: remoteMessage?.notification?.body,
                    date: new Date(Date.now()),
                    ignoreInForeground: false,
                    allowWhileIdle: false,
                    repeatTime: 1,
                    vibrate: true,
                    vibration: 300,
                    playSound: true,
                    priority: firebase.messaging.NotificationAndroidPriority.PRIORITY_MAX,
                    channelId: "FurEver",
                    visibility: "public",
                    data: { ...remoteMessage?.data }
                });
            }
        })
        return unsubscribe;
    }, [])
    useEffect(() => {
        if (props?.location?.sceeen != "home" && props?.location?.name) {
            setLocation(props?.location?.name)
            setmarked(props?.location?.location)
        }
    }, [props?.location])
    useEffect(() => {
        if (refreshing) {
            if (ref?.current) {
                ref?.current?.setAddressText('');
                setLocation('')
            }
            call("calllist")
        }
    }, [refreshing])

    const renderItem = ({ item, index }) => (
        <Homerow
            item={item}
            index={index}
            like={props?.likedata?.filter(item2 => item2?.centerId == item?.centerId)?.length > 0 ? true : false}
            onLike={(like) => { Add(like, item) }}
            skeleton={props?.skeleton}
            onnavigate={() => { navigation.navigate("Roomlocation", { location: item }) }}
            ondetails={() => { props.BookingStatus({ centerdata: { item: item, fromdate: from, todate: to, childid: null }, state: "Satrtbooking" }) }}
        />
    )
    const renderItem2 = ({ item, index }) => (
        <Offers
            item={item}
            index={index}
            length={props?.skeleton}
            onPress={() => { }}
        />
    )
    const renderItem3 = ({ item, index }) => (
        <TouchableOpacity key={index} onPress={() => { setSelect(item?.name) }} style={{ paddingHorizontal: 8, borderRadius: 20, marginRight: 10, paddingVertical: 9, borderWidth: 1, borderColor: select == item?.name ? theme?.selected : theme?.homefrom }}>
            <Text style={[themestyles.option, { color: select == item?.name ? theme?.selected : theme?.homefrom }]}>{item?.name}</Text>
        </TouchableOpacity>
    )

    return (
        <SafeAreaView style={themestyles.container}>
            <Loader loading={props?.loader} />
            <ScrollView nestedScrollEnabled={true} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
                <Header tab={true} onPress={() => { navigation.toggleDrawer() }} home={true} name={"FurEver"} />
                <View style={{ paddingHorizontal: 20, marginTop: 5 }}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", }}>
                        <GooglePlacesAutocomplete
                            ref={ref}
                            placeholder={"Gataways for your Fur Babies"}
                            fetchDetails={true}
                            query={{ key: Api.map, language: 'en', }}
                            onPress={(data, details = null) => {
                                setmarked({ latitude: details?.geometry?.location.lat, longitude: details?.geometry?.location.lng })
                                setLocation(data?.description);
                            }}
                            enablePoweredByContainer={false}
                            textInputProps={{
                                value: location,
                                onChangeText: (text) => setLocation(text),
                                placeholderTextColor: theme.hometextplace
                            }}
                            styles={{
                                textInputContainer: { backgroundColor: "transparent", },
                                textInput: [{ fontSize: fontSize.font20, }, themestyles.textinput, { height: width / 8 }],
                                description: { color: theme.black },
                                poweredContainer: { backgroundColor: "transparent" },
                                row: { backgroundColor: 'transparent', },
                                listView: themestyles?.list
                            }}
                        />
                        <TouchableOpacity onPress={() => { navigation.navigate("Map", { map: "home" }) }} style={{ position: "absolute", right: 13, marginTop: "4%" }}>
                            <Location height={width / 20} width={width / 20} />
                        </TouchableOpacity>
                    </View>
                    <View style={[Styles.spacebetween, { alignItems: "center", marginTop: 5 }]}>
                        <TouchableOpacity onPress={() => { setDatePickerVisibility(true) }} style={[Styles.spacebetween, { width: "48%" }]}>
                            <Text style={[themestyles.datetext]}>{from ? moment(from).format("DD MMM") : "From"}</Text>
                            <Text style={[themestyles.datetext, { width: "2%" }]}>{" - "}</Text>
                            <Text style={[themestyles.datetext]}>{to ? moment(to).format("DD MMM") : "To"}</Text>
                        </TouchableOpacity>
                        <View style={[themestyles?.line]} />
                        <View style={[Styles.spacebetween, { width: "48%", paddingHorizontal: "2%" }]}>
                            <TouchableOpacity disabled={count == 0} onPress={() => { setCount(count - 500) }} style={themestyles?.boxadd}>
                                <Image source={minus} style={themestyles.icon2} />
                            </TouchableOpacity>
                            <Text style={[themestyles.datetext]}>₹0 - {count}</Text>
                            <TouchableOpacity onPress={() => { setCount(count + 500) }} style={themestyles?.boxadd}>
                                <Image source={plus} style={themestyles.icon2} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={[Styles.spacebetween, { alignItems: "center", marginTop: 14, paddingHorizontal: 20 }]}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={data}
                        renderItem={renderItem3}
                        contentContainerStyle={{ width: "80%" }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (location == "" || location == null) {
                                showToast("Please enter location")
                                return
                            }
                            if (from == "" || from == null) {
                                showToast("Please enter from date")
                                return
                            }
                            if (to == "" || to == null) {
                                showToast("Please enter to date")
                                return
                            }
                            if (count == 0) {
                                props.SearchChildCenter2({
                                    "fromDate": from,
                                    "toDate": to,
                                    "latitude": String(marked?.latitude),
                                    "longitude": String(marked?.longitude),
                                })
                            } else {
                                props.SearchChildCenter2({
                                    "fromDate": from,
                                    "toDate": to,
                                    "latitude": String(marked?.latitude),
                                    "longitude": String(marked?.longitude),
                                    "fromRange": String(0),
                                    "toRange": String(count)
                                })
                            }
                        }}
                        style={themestyles.search}>
                        <Image source={glass} style={{ height: width / 22, width: width / 22, tintColor: "white" }} resizeMode="contain" />
                    </TouchableOpacity>
                </View>
                <View style={[Styles.spacebetween, { alignItems: "center", marginTop: 20, paddingRight: 20 }]}>
                    <Text style={[themestyles.Recommendations, {}]}>FurEver’s near you</Text>
                    <TouchableOpacity onPress={async () => {
                        await props.SearchChild2(props?.ChildCenter)
                        navigation.navigate("Searched", { fromdate: from, todate: to, value: null })
                    }}>
                        <Text style={[themestyles.Recommendations, { fontSize: fontSize.font18 }]}>See All</Text>
                    </TouchableOpacity>
                </View>
                {props?.ChildCenter?.length > 0 || props?.skeleton ?
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        data={props?.skeleton ? [...Array.from({ length: 10 }, (_, i) => i + 1)] : select === "Recommended" ? props?.ChildCenter : props?.trendsearchChildcenter}
                        renderItem={renderItem}
                        contentContainerStyle={themestyles.flat}
                    />
                    :
                    <Text style={[themestyles.Recommendations, { alignSelf: "center" }]}>No Recommendations Found.</Text>
                }
                <Text style={[themestyles.Recommendations, { marginTop: 5 }]}>Offers just for you</Text>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    horizontal={true}
                    data={datas}
                    renderItem={renderItem2}
                    contentContainerStyle={themestyles.flat}
                />
                {isDatePickerVisible &&
                    <Calender
                        open={isDatePickerVisible}
                        setOpen={() => { setDatePickerVisibility(false) }}
                        setdate={(date) => {
                            setFrom(date?.from), setTo(date?.to)
                            setDatePickerVisibility(false)
                        }} />
                }
                {props.showreview &&
                    <Review
                        show2={props.showreview}
                        add={true}
                        onPress={() => { props.AddReviewModal(false) }}
                        Reviewsss={props?.Noreview[props?.Noreview?.length - 1]}
                        reviews={[]}
                    />
                }
            </ScrollView>
        </SafeAreaView >
    );
};


const mapState = (state) => {
    return {
        user: state.user.user,
        showreview: state.user.showreview,
        loader: state.user.loader,
        location: state.common.location,
        likedata: state.booking.likedata,
        ChildCenter: state.booking.ChildCenter,
        skeleton: state.booking.skeleton,
        childlist: state.booking.childlist,
        Noreview: state.booking.Noreview,
        trendsearchChildcenter: state.booking.trendsearchChildcenter,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddReviewModal: (data) => dispatch(AddReviewModal(data)),
        GetPrivacyPolicy: () => dispatch(GetPrivacyPolicy()),
        GetNotSentReviewList: () => dispatch(GetNotSentReviewList()),
        BookingStatus: (data) => dispatch(BookingStatus(data)),
        GetUpcomingBooking: () => dispatch(GetUpcomingBooking()),
        GetBooking: (data) => dispatch(GetBooking(data)),
        GetBookingHistory: () => dispatch(GetBookingHistory()),
        GetUserChilds: () => dispatch(GetUserChilds()),
        SearchChildCenter: (data) => dispatch(SearchChildCenter(data)),
        GetSingleUser: () => dispatch(GetSingleUser()),
        GetMedicalConditions: () => dispatch(GetMedicalConditions()),
        GetVaccinationStatus: () => dispatch(GetVaccinationStatus()),
        GetCurrentBooking: () => dispatch(GetCurrentBooking()),
        SearchChild2: (data) => dispatch(SearchChild2(data)),
        SearchChildCenter2: (data, item) => dispatch(SearchChildCenter2(data, item)),
        GetTerms: (data) => dispatch(GetTerms(data)),
        addReview: (data) => dispatch(addReview(data)),
        GetNotifications: (data) => dispatch(GetNotifications(data)),
        Likedata: (data) => dispatch(Likedata(data)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
