import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Styles from '../utils/Styles';
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const themestyles = styles()
    return (
        <View key={props?.index}>
            <TouchableOpacity onPress={() => { props.onPress() }} style={[Styles.flexrow, themestyles.container,]}>
                <Image source={{ uri: props?.item?.image?.length > 0 ? props?.item?.image[0] : "" }} resizeMode="stretch" style={themestyles.image} />
                <View style={{ width: "60%", paddingVertical: 8 }}>
                    <View style={Styles.spacebetween}>
                        <Text style={[themestyles.name, { flex: 1 }]} numberOfLines={1}>{props?.item?.centerName}</Text>
                        <TouchableOpacity onPress={() => { props.onLike(props?.like) }} >
                            <Image source={require("../assets/image/heart.png")} style={[themestyles?.heart, { tintColor: props?.like ? "#E74C3C" : "grey" }]} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { props.onnavigate() }} style={[Styles.flexrow, { marginVertical: 5 }]}>
                        <Text numberOfLines={1} style={[themestyles.name2]}>{props?.item?.address}</Text>
                    </TouchableOpacity>
                    <View style={[Styles.spacebetween, { marginTop: 2 }]}>
                        <Text style={[themestyles.name2]}>₹ {props?.item?.price} / Day</Text>
                        {props?.item?.totalReview != 0 ?
                            <View View style={[Styles.flexrow, { justifyContent: "flex-end" }]}>
                                <Image source={require("../assets/image/star.png")} resizeMode="contain" style={themestyles?.star} />
                                <Text style={[themestyles.name2]}>{props?.item?.rating?.toFixed(2)}</Text>
                            </View>
                            :
                            null
                        }
                    </View>
                </View>
            </TouchableOpacity>
            <View style={themestyles?.line} />
        </View>
    );
};
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        heart: {
            height: width / 26,
            width: width / 26,
            resizeMode: "contain",
            tintColor: "#E74C3C"
        },
        star: {
            height: width / 24,
            width: width / 24,
            tintColor: theme?.homestar,
            marginRight: width / 100
        },
        line: {
            borderWidth: .5,
            borderColor: theme.searchtext,
            width: "100%",
            marginVertical: 20,
            borderStyle: "dashed"
        },
        image: {
            borderRadius: 6,
            height: width / 3.9,
            width: width / 3.22,
            marginRight: 10
        },
        container: {
            ...Styles.up,
            backgroundColor: theme.backgroundcolor,
            borderRadius: 6,
            marginVertical: 2,
            width: "100%",
            overflow: "hidden",
            alignItems: null
        },
        name: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.searchtext,
            fontSize: fontSize.font20
        },
        name2: {
            fontFamily: fontFamily.FontMedium,
            color: theme.searchtext,
            fontSize: fontSize.font16
        },
    })
}
export default MyComponent;
