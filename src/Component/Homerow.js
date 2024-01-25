import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Styles from '../utils/Styles';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { connect } from 'react-redux';
import { useTheme } from '../../Theme';

const Homerow = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    return (
        <TouchableOpacity key={props?.index} disabled={props?.skeleton} onPress={() => { props.ondetails() }} activeOpacity={.5} style={[themestyles?.container, { width: width / 1.7, marginRight: 20 }]}>
            <SkeletonPlaceholder speed={1000} borderRadius={10} enabled={props?.skeleton} backgroundColor='#E1E9EE'>
                <View style={{ height: width / 2.06, width: "100%" }}>
                    {props?.item?.image?.length > 0 ?
                        <ImageBackground source={{ uri: props?.item?.image?.length > 0 ? props?.item?.image[0] : "" }} style={{ height: "100%", width: "100%" }} >
                            <TouchableOpacity onPress={() => { props.onLike(props?.like) }} style={themestyles?.like}>
                                <Image source={require("../assets/image/heart.png")} style={[themestyles?.heart, { tintColor: props?.like ? "#E74C3C" : "grey" }]} />
                            </TouchableOpacity>
                        </ImageBackground>
                        :
                        <View style={{ height: "100%", width: "100%" }} >
                            <View style={themestyles?.like}>
                                <Image source={require("../assets/image/heart.png")} style={[themestyles?.heart, { tintColor: props?.like ? "#E74C3C" : "grey" }]} />
                            </View>
                        </View>
                    }
                </View>
                <View style={{ paddingHorizontal: width / 30, paddingBottom: 10, paddingTop: 8 }}>
                    {props?.item?.centerName ?
                        <View style={[Styles.spacebetween]}>
                            <Text style={[themestyles?.name]}>{props?.item?.centerName}</Text>
                            {props?.item?.totalReview != 0 && props?.item?.totalReview ?
                                <View style={[Styles.flexrow, themestyles?.review]}>
                                    <Image source={require("../assets/image/star.png")} resizeMode="contain" style={themestyles?.star} />
                                    <Text style={[themestyles?.Rating]}>{props?.item?.rating?.toFixed(2)}</Text>
                                </View>
                                :
                                null
                            }
                        </View>
                        :
                        <View style={[Styles.spacebetween]}>
                            <Text style={[themestyles?.name]}></Text>
                            {props?.item?.totalReview != 0 && props?.item?.totalReview ?
                                <View style={[Styles.flexrow, themestyles?.review]}>
                                    <Image source={require("../assets/image/star.png")} resizeMode="contain" style={themestyles?.star} />
                                    <Text style={[themestyles?.Rating]}></Text>
                                </View>
                                :
                                null
                            }
                        </View>
                    }
                    {props?.item?.address ?
                        <TouchableOpacity onPress={() => { props.onnavigate() }} style={{ marginTop: 8 }}>
                            <Text numberOfLines={1} style={[themestyles?.loaction]}>{props?.item?.address}</Text>
                        </TouchableOpacity>
                        :
                        <Text numberOfLines={1} style={[themestyles?.loaction]}></Text>
                    }
                    {props?.item?.price ?
                        <Text style={[themestyles?.price, { marginTop: 8 }]}>₹ {props?.item?.price}<Text style={[{ fontFamily: fontFamily.FontRegular }]}>/ Day</Text></Text>
                        :
                        <Text style={[themestyles?.price, { marginTop: 10 }]}> </Text>
                    }
                </View>
            </SkeletonPlaceholder>
        </TouchableOpacity>
    );
};


const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            backgroundColor: theme.homerow,
            borderRadius: 10,
            overflow: "hidden",
            marginRight: 10,
            ...Styles.up
        },
        star: {
            height: width / 24,
            width: width / 24,
            tintColor: theme?.homestar
        },
        name: {
            color: theme.homerowname,
            fontSize: width / 22,
            width: "60%",
            fontFamily: fontFamily.FontMedium
        },
        loaction: {
            fontFamily: fontFamily.FontRegular,
            color: theme.locationtext,
            fontSize: width / 28,
            width: "100%",
        },
        review: {
            marginBottom: 0,
            width: "30%",
            justifyContent: "flex-end"
        },
        like: {
            position: "absolute",
            right: width / 40,
            top: width / 40,
            padding: width / 55,
            borderRadius: 1000,
            backgroundColor: 'white',
            // ...Styles.up,
            // elevation: 1,
        },
        heart: {
            height: width / 26,
            width: width / 26,
        },
        Rating: {
            fontSize: width / 30,
            fontFamily: fontFamily.FontMedium,
            color: theme?.homereating,
            marginLeft: width / 70
        },
        price: {
            fontFamily: fontFamily.FontMedium,
            color: theme.homeprize,
            fontSize: width / 24,
            width: "100%",
        }
    })
}




const mapState = (state) => {
    return {
        likedata: state.booking.likedata,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
    }
}

export default connect(mapState, mapDispatchToProps)(Homerow);
