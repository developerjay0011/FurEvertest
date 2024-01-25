import React, { useEffect } from 'react';
import { Animated, SafeAreaView } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GetSingleUser, Loader } from "../../Redux/actions/auth"
import Logo from "../../assets/svg/Icons/logo.svg"
import Styles from '../../utils/Styles';
const MyComponent = (props) => {
    const themestyles = styles();
    const getData = async () => {
        try {
            props.Loader(false)
            const id = await AsyncStorage.getItem('id')
            const token = await AsyncStorage.getItem('token')
            const fcmtoken = await AsyncStorage.getItem('fcmtoken')
            const Onboarding = await AsyncStorage.getItem('Onboarding')
            global.token = token
            global.id = id
            global.fcmtoken = fcmtoken
            console.log("global.token:", global.token, id, fcmtoken)
            if (global.token) {
                props.GetSingleUser()
                setTimeout(() => {
                    props.navigation.replace("Home")
                }, 3000);
            } else {
                if (Onboarding) {
                    setTimeout(() => {
                        props.navigation.replace("Options")
                    }, 3000);
                } else {
                    setTimeout(() => {
                        props.navigation.replace("Onboarding")
                    }, 2000);
                }
            }
        } catch (e) {
            setTimeout(() => {
                props.navigation.replace("Options")
            }, 3000);
        }
    }
    const logoScale = new Animated.Value(0);

    useEffect(() => {
        getData()
        Animated.timing(logoScale, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
        }).start();
    }, []);
    return (
        <SafeAreaView style={themestyles.container}>
            <Animated.View style={{ transform: [{ scale: logoScale }] }}>
                <Logo height={Styles.hw.width / 2.8} width={Styles.hw.width / 3} style={{ alignSelf: "center", marginTop: 10 }} />
            </Animated.View>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Loader: (data) => dispatch(Loader(data)),
        GetSingleUser: (data) => dispatch(GetSingleUser(data))
    }
}
export default connect(mapState, mapDispatchToProps)(MyComponent);