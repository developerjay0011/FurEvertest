import React, { } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Styles from "../utils/Styles"
import { useTheme } from '../../Theme';
// create a component
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    return (
        <TouchableOpacity disabled={true} style={{ width: "100%" }}>
            <View style={[Styles.flexrow, { marginBottom: 2, marginTop: 2 }]}>
                <View style={themestyles.dot}></View>
                <Text style={[themestyles.renderItemtext, { fontSize: width / 28 }]}>{props?.item?.activityName} : {props?.item?.activityName != "Walk & Play" && props?.item?.activityName != "Bath" ? "Every day" : null}</Text>
            </View>
            {props?.item?.activityName != "Walk & Play" && props?.item?.activityName != "Bath" ?
                <Text style={[themestyles.renderItemtext2, { fontSize: width / 32 }]}>Time : <Text style={themestyles.value}>{props?.item?.activityTime}</Text></Text>
                : props?.item?.activityName == "Walk & Play" ?
                    props?.item?.activityTime?.split(',')?.map((item, index) =>
                        <Text style={[themestyles.renderItemtext2, { fontSize: width / 32 }]}>Time {index + 1} : <Text style={themestyles.value}>{item}</Text></Text>
                    )
                    :
                    null
            }

            {props?.item?.activityName == "Walk & Play" ?
                <View style={{ marginBottom: 2 }}>
                    <Text style={[themestyles.renderItemtext2, { fontSize: width / 32 }]}>Time in a day : <Text style={themestyles.value}>{props?.item?.noOfTimeWalk}</Text>  Duration : <Text style={themestyles.value}>{props?.item?.walkTime}</Text></Text>
                </View>
                : props?.item?.activityName == "Bath" ?
                    props?.item?.bathDates?.map(item =>
                        <Text style={[themestyles.renderItemtext2, { fontSize: width / 32, paddingVertical: 2 }]}>Date : <Text style={themestyles.value}>{item}</Text></Text>
                    )
                    :
                    null
            }

        </TouchableOpacity>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        dot: {
            height: 4,
            width: 4,
            borderRadius: 5,
            backgroundColor: theme.black,
            marginLeft: 20
        },
        value: {
            fontFamily: fontFamily.FontRegular
        },
        renderItemtext: {
            color: theme.black,
            fontFamily: fontFamily.FontBold,
            marginLeft: 10,
            width: "80%",
        },
        renderItemtext2: {
            color: theme.black,
            fontFamily: fontFamily.FontBold,
            marginLeft: 35,
        },
    })
}
export default MyComponent;
