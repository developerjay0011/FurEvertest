import React, { } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Styles from '../utils/Styles';
import moment from 'moment';
import { useTheme } from '../../Theme';
import needhelp from "../assets/image/needhelp.png"
import bookagain from "../assets/image/bookagain.png"
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { GetCenterDetail } from '../Redux/actions/user';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const dispatch = useDispatch();
    const navigation = useNavigation()
    var iscomplet = props.item?.isCompleteAllMeal == true && props.item?.isCompleteAllActivity == true
    return (
        <>
            <TouchableOpacity onPress={() => { props.onPress() }} style={[Styles.spacebetween, themestyles.container]}>
                <Image source={{ uri: props?.item?.centerImage?.split(",")?.[0] }} resizeMode={"contain"} style={themestyles?.image} />
                <View style={[Styles.spacebetween, { width: width / 1.78, paddingVertical: 8, flexDirection: "column" }]}>
                    <View style={{ width: "100%" }}>
                        <View style={[Styles.spacebetween, { paddingRight: width / 50 }]}>
                            <Text numberOfLines={1} style={[themestyles.name, { width: "90%", flex: 1, paddingRight: 5 }]}>{props?.item?.centerName}</Text>
                            {props?.item?.status == 'Current' ?
                                <View style={[themestyles?.icon3, { backgroundColor: iscomplet ? "#73AB6B" : "#FF555B" }]} />
                                : null
                            }
                        </View>
                        <Text numberOfLines={1} style={[themestyles.name2]}>{props?.item?.centerAddress}</Text>
                        {props?.item?.isHourlyBooking != 1 ?
                            <Text style={[themestyles.name2]}>{moment(props?.item?.bookingFrom).format("DD-MM-YYYY")} to {moment(props?.item?.bookingTo).format("DD-MM-YYYY")}</Text>
                            :
                            <Text style={[themestyles.name2]}>{moment(props?.item?.bookingFrom).format("DD-MM-YYYY")} , {props?.item?.fromTime + " - " + props?.item?.toTime}</Text>
                        }
                    </View>
                    <View style={{ backgroundColor: props?.item?.isCancelled ? theme?.notification : "#73AB6B", paddingHorizontal: 10, paddingVertical: 4, borderRadius: 20, alignSelf: "flex-end", marginRight: 10 }}>
                        <Text style={[themestyles.name4]}>{props?.item?.isCancelled ? "Cancelled" : props?.item?.checkInStatus}</Text>
                    </View>
                </View>
            </TouchableOpacity >
            <View style={[Styles.flexrow, { marginTop: 15 }]}>
                <TouchableOpacity onPress={() => { dispatch(GetCenterDetail(props?.item?.centerId)) }} style={[Styles.flexrow, { marginRight: 10, alignItems: "center" }]}>
                    <Image source={bookagain} style={themestyles?.icon} />
                    <Text numberOfLines={1} style={[themestyles.name3, {}]}>Book again</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate("Contactus") }} style={[Styles.flexrow, { alignItems: "center" }]}>
                    <Image source={needhelp} style={themestyles?.icon} />
                    <Text numberOfLines={1} style={[themestyles.name3,]}>Need help</Text>
                </TouchableOpacity>
            </View >
            <View style={themestyles?.line} />
        </>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        image: {
            height: width / 3.9,
            width: width / 3.22,
            borderRadius: 10,
        },
        line: {
            borderWidth: .5,
            borderColor: theme.searchtext,
            borderRadius: 1,
            width: "100%",
            marginTop: 15,
            marginBottom: 24,
            borderStyle: "dashed"
        },
        container: {
            ...Styles.up,
            backgroundColor: theme.white,
            borderRadius: 10,
            marginTop: 1,
            width: "100%",
            alignItems: null,
        },
        name: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.commontextgrey,
            fontSize: fontSize.font18,
            width: "100%"
        },
        name3: {
            fontFamily: fontFamily.FontMedium,
            color: theme.commontextgrey,
            fontSize: fontSize.font16,
            paddingLeft: 5,
        },
        name4: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.commontextgrey,
            fontSize: fontSize.font10,
            color: "white",
        },
        name2: {
            fontFamily: fontFamily.FontMedium,
            color: theme.commontextgrey,
            fontSize: fontSize.font16,
            width: "100%",
            marginTop: 5
        },
        icon: {
            height: width / 25,
            width: width / 25,
            resizeMode: "contain",
            tintColor: theme?.drower
        },
        icon2: {
            height: width / 22,
            width: width / 22,
            borderColor: "#73AB6B",
            borderWidth: 2.5,
            borderRadius: width,
            justifyContent: "center",
            alignItems: "center"
        },
        icon3: {
            height: width / 30,
            width: width / 30,
            borderRadius: width
        },
    })
}
export default MyComponent;

