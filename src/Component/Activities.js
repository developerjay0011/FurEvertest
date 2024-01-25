import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import moment from 'moment';
import Styles from '../utils/Styles';
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    return props?.isActivities ? (
        <View style={[themestyles.upcomingview]} key={props?.index} >
            <Text style={[themestyles.upcoming]}>{props?.item?.activityName} - {props?.item?.activityName == "Bath" ? (props?.item?.bathDates?.map((item) => moment(item).format("DD MMM YY")).join(", ")) : props?.item?.activityTime} {props?.item?.activityName == "Walk & Play" ? " - ( " + props?.item?.noOfTimeWalk + " Time in a day - " + props?.item?.walkTime + " )" : null}</Text>
        </View>
    ) : (
        <View style={[themestyles.upcomingview]} key={props?.index} >
            <Text style={[themestyles.upcoming]}>{props?.item?.mealName} - {props?.item?.timing}</Text>
        </View>
    )
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
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
            overflow: "hidden",
            borderWidth: 2.5,
            height: width / 18,
            width: width / 18,
            borderRadius: width,
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
