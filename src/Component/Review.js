//import liraries
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, } from 'react-native';
import { Modal } from 'react-native-paper';
import closebutton from '../assets/image/closebutton.png';
import Textinput from "../Component/TextInput"
import showToast from '../utils/Toast';
import { GetReview, addReview } from '../Redux/actions/user';
import { connect } from 'react-redux';
import { useTheme } from '../../Theme';
import StarRating from 'react-native-star-rating-widget';
import { I18nManager } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';
const MyComponent = (props) => {
    const { show2, add, reviews, Reviewsss } = props;
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const [review, setReview] = useState(null)
    const [review2, setReview2] = useState(0)

    const StarFull = ({ size, color }) => (
        <Svg height={size} viewBox="0 0 24 24" width={size}>
            <Path d="M0 0h24v24H0z" fill="none" />
            <Path d="M0 0h24v24H0z" fill="none" />
            <Path
                fill={color}
                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
            />
        </Svg>
    );

    const RTL_TRANSFORM = {
        transform: [{ rotateY: '180deg' }],
    };

    const StarHalf = ({ size, color }) => (
        <Svg
            height={size}
            viewBox="0 0 24 24"
            width={size}
            style={I18nManager.isRTL ? RTL_TRANSFORM : undefined}
        >
            <Rect fill="none" height="24" width="24" x="0" />
            <Path
                fill={color}
                d="M22,9.24l-7.19-0.62L12,2L9.19,8.63L2,9.24l5.46,4.73L5.82,21L12,17.27L18.18,21l-1.63-7.03L22,9.24z M12,15.4V6.1 l1.71,4.04l4.38,0.38l-3.32,2.88l1,4.28L12,15.4z"
            />
        </Svg>
    );

    const StarIcon = ({ type, size, color }) => {
        const Component = type === 'full' ? StarFull : type === 'half' ? StarHalf : StarFull;

        return <Component size={size} color={color} />;
    };


    useEffect(() => {
        if (add) {
            setReview(null)
            setReview2(0)
            return
        }
        if (add == false) {
            setReview(reviews[0]?.review ? reviews[0]?.review : null)
            setReview2(reviews[0]?.rating ? reviews[0]?.rating : 0)
        }
    }, [show2 + add])

    return (
        <Modal animationType="none" transparent={true} visible={show2} onRequestClose={() => { props?.onPress() }}>
            <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", position: "absolute", height: height, width: width, }}>
                <View style={themestyles.popup}>
                    <View style={[{ marginBottom: 10, }]}>
                        <Text style={themestyles.class2}>Add Review & Rating</Text>
                        <TouchableOpacity onPress={() => props?.onPress()} style={{ position: "absolute", right: 0 }}>
                            <Image source={closebutton} style={themestyles.close} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[themestyles.class2, { marginBottom: 10, width: "100%", alignSelf: "center" }]}>How many stars would you give to us?</Text>

                    <Textinput multiline={true} editable={add == true ? true : false} value={review} placeholder={"Share your experience"}
                        onChangeText={(text) => { setReview(text) }} style={{
                            marginTop: 5, height: width / 3.5, textAlignVertical: "top",
                            marginBottom: 15, borderRadius: 20
                        }} />
                    <StarRating
                        readonly={add == false ? true : false}
                        maxStars={5}
                        rating={review2}
                        onChange={(rating) => setReview2(rating)}
                        color={'yellow'}
                        enableHalfStar={true}
                        emptyColor={'white'}
                        starSize={width / 15}
                        StarIconComponent={StarIcon}
                        style={{ width: "50%", alignSelf: "center" }}
                    />

                    <TouchableOpacity style={[themestyles.container, { height: width / 10 }]} activeOpacity={.5}
                        onPress={() => {
                            if (review2 == null) {
                                showToast("Please select rating")
                                return
                            }
                            props.addReview({
                                "bookingId": Reviewsss?.bookingId,
                                "review": review ? review : "",
                                "rating": String(review2)
                            })
                            props?.onPress()
                        }}
                    >
                        <Text style={[themestyles.name, { fontSize: fontSize.font18 }]}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: theme.white,
            width: "50%",
            borderRadius: 1000,
            alignSelf: "center",
            marginTop: 20,
        },
        name: {
            fontFamily: fontFamily.FontSemiBold,
            color: theme.commongreen,
            alignSelf: "center",
            textAlign: "center",
        },
        popup: {
            alignSelf: "center",
            backgroundColor: "#73AB6B",
            width: "90%",
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 15,
        },
        class2: {
            fontFamily: fontFamily.FontMedium,
            color: theme.white,
            fontSize: fontSize.font22,
            textAlign: "center"
        },
        close: {
            height: width / 15,
            width: width / 15,
            resizeMode: "contain",
            tintColor: "#FFF9F9"
        },
        Modalview: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white"
        },
        review: {
            borderWidth: 1,
            paddingVertical: 10,
            borderColor: theme.bordercolor,
            borderRadius: 5
        },
        button: { marginBottom: 20, marginTop: 10, },
    })
}

const mapState = (state) => {
    return {
        loader: state.user.loader,
        Review: state.booking.Review,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        addReview: (data) => dispatch(addReview(data)),
        GetReview: (data) => dispatch(GetReview(data)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);

