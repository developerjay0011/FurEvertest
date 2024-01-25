
import React, { useEffect, useRef, useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Back from "../../assets/svg/back.svg"
import { Location } from '../../Redux/actions/common';
import Video from 'react-native-video';
import { ActivityIndicator } from 'react-native-paper';
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const navigation = useNavigation()
    const { data } = props?.route?.params
    const image = useRef()
    const [buffer, setBuffer] = useState(false)
    return (
        <SafeAreaView style={themestyles.container}>

            <View style={{ height: width, width: height, flex: 1, justifyContent: "center" }}>
                <Video
                    source={{ uri: data[0]?.hls }}
                    ref={image}
                    // controls={true}
                    fullscreen={true}
                    resizeMode="contain"
                    onLoad={(e) => setBuffer(false)}
                    onVideoLoadStart={(e) => {
                        if (e?.isBuffering) {
                            setBuffer(true)
                        } else {
                            setBuffer(false)
                        }
                    }}
                    onError={(error) => {
                        setBuffer(false)
                    }}
                    playInBackground={true}
                    style={[themestyles.video, { height: "100%", width: "100%", }]}
                    onBuffer={(value) => { setBuffer(true) }}
                    onEnd={() => setBuffer(false)}
                    fullscreenOrientation="portrait"
                    fullscreenAutorotate={true}
                />
                {buffer ?
                    <ActivityIndicator color={"blue"} size={"large"} style={{ position: "absolute", alignSelf: "center", justifyContent: "center" }} />
                    :
                    null
                }
            </View>
            {/* 
            <TouchableOpacity onPress={() => { navigation.goBack() }} style={themestyles.back}>
                <Back height={20} width={20} />
            </TouchableOpacity> */}
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        location: state.common.location
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        Location: (data) => dispatch(Location(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);

