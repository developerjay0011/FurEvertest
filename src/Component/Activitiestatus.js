import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import moment from 'moment';
import Styles from '../utils/Styles';
import { useTheme } from '../../Theme';
import check from '../assets/image/check.png';
const MyComponent = (props) => {
    const { theme } = useTheme();
    const themestyles = styles();
    const lastdate = props?.checkoutdate ? props?.checkoutdate : props?.ischeckout ? props?.toDate : props?.currentDate
    const lastdate2 = moment(moment(lastdate).format("YYYY-MM-DD"))

    const renderItem = (item, index) => (
        <View style={[themestyles.view]} key={index} >
            <Text style={[themestyles.upcoming, { flex: 1, paddingRight: 5 }]}>{item?.name != "Bath" ? item?.name + " - " : item?.name}{item?.timing}</Text>
            <View style={[themestyles.box, { borderColor: item?.isDone ? theme?.bookingcircle : theme?.commontextgrey, backgroundColor: item?.isDone ? theme?.bookingcircle : null }]}>
                {item?.isDone ? <Image source={check} style={themestyles.check} /> : null}
            </View>
        </View>
    )


    return props?.all == false && moment(lastdate2).isSame(props?.item?.date) || (props?.all == true && moment(moment(props?.item?.date).format("YYYY-MM-DD")).isSameOrBefore(moment().format("YYYY-MM-DD"))) ? (
        <View >
            <Text style={[themestyles.date]}>{moment(props?.item?.date).format("YYYY-MM-DD")}</Text>
            <View style={{ flex: 1, marginTop: 10 }}>
                {props?.item?.status?.map((item, index) => renderItem(item, index))}
            </View>
        </View>
    ) : null
};

const styles = () => {
    const { theme, width, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        class2: {
            fontFamily: fontFamily.FontRegular,
            textAlign: "center",
            marginTop: 3,
            color: theme.black,
        },

        upcomingview: {
            marginBottom: 10,
            width: "100%"
        },
        date: {
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font20,
            color: theme.commontextgrey,
            width: "100%",
        },
        upcoming: {
            fontFamily: fontFamily.FontMedium,
            fontSize: fontSize.font20,
            color: theme.commontextgrey,
            width: "100%"
        },
        box: {
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 1,
            borderColor: theme.commongreen,
            height: width / 18,
            width: width / 18,
            borderRadius: 5
        },
        check: {
            height: width / 30,
            width: width / 30,
            resizeMode: "contain",
            tintColor: "white"
        },
        circle: {
            height: width / 28,
            width: width / 28,
            borderRadius: width,
            backgroundColor: theme?.bookingcircle
        },
        view: {
            alignItems: "center",
            ...Styles.spacebetween,
            marginBottom: 10,
        },

    })
}
export default MyComponent;
