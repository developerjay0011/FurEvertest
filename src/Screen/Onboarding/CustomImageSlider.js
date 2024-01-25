import React from 'react';
import { useRef } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel-v4';
import Styles from "../../utils/Styles"
import Next from "../../assets/svg/Icons/next.svg"
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../../Theme'
const CustomImageSlider = ({ images }) => {
    const swiperRef = useRef(null);
    const [activeSlide, setActiveSlide] = useState(0);
    const { theme, width, height } = useTheme();
    const themestyles = styles(theme, width, height)
    const navigation = useNavigation()
    const goToNextSlide = async () => {
        if (swiperRef.current && activeSlide < 2) {
            swiperRef.current.snapToNext();
        } else {
            await AsyncStorage.setItem('Onboarding', "true")
            navigation.replace("Options")
        }
    };




    const customAnimationOptions = {
        friction: 1,
        tension: 100,
    };
    const renderItem = ({ item, index }) => (
        <View key={index} style={themestyles.slide}>
            <Image source={item} style={themestyles.image} />
            {/* <Image source={require("../../assets/image/Onboarding/Overlay.png")} style={themestyles.image2} /> */}
            <Image source={require("../../assets/image/Onboarding/overlaytext.png")} style={themestyles.image3} />
        </View>
    );

    return (
        <View style={themestyles.container}>
            <Carousel
                ref={swiperRef}
                data={images}
                renderItem={renderItem}
                sliderWidth={width}
                itemWidth={width}
                loop={false}
                autoplay={false}
                customAnimationOptions={customAnimationOptions}
                onSnapToItem={(index) => {
                    setActiveSlide(index)
                }} />
            <Pagination
                dotsLength={images.length}
                activeDotIndex={activeSlide}
                containerStyle={{ position: "absolute", bottom: height / 12, alignSelf: "center" }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: '#3F5629',
                }}
                inactiveDotStyle={{
                    backgroundColor: 'white',
                }}
                inactiveDotOpacity={1}
                inactiveDotScale={0.7}
            />
            <TouchableOpacity style={[themestyles.customButton]} onPress={goToNextSlide} >
                <Next height={height / 60} width={height / 60} />
            </TouchableOpacity>
        </View>
    );
};

const styles = (theme, width, height) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#3F5629",
        },
        wrapper: {
            flex: 1,
            height: height,
            width: width,
        },
        slide: {
            flex: 1,
        },
        customButton: {
            position: "absolute",
            bottom: height / 25,
            right: height / 40,
            height: height / 25,
            width: height / 25,
            borderRadius: width,
            backgroundColor: "#3F5629",
            justifyContent: "center",
            alignItems: "center",
            ...Styles.up
        },
        image: {
            width: "100%",
            height: "100%",
            position: "absolute",
        },
        linearGradient: {
            position: "absolute",
            height: '50%',
            width: width,
            bottom: 0
        },
        image2: {
            position: "absolute",
            height: '80%',
            width: width,
            bottom: 0,
        },
        image3: {
            position: "absolute",
            height: 250,
            width: 250,
            resizeMode: "contain",
            alignSelf: "center",
            bottom: height / 11
        },
    })
}
export default CustomImageSlider;
