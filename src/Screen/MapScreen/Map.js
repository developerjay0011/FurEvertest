
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Styles from '../../utils/Styles';
import Button from "../../Component/Button"
import Back from "../../assets/svg/back.svg"
import Locationsvg from "../../assets/svg/location.svg"
import MapView, { Marker } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import { Location } from '../../Redux/actions/common';
import Api from '../../utils/Url';
import showToast from '../../utils/Toast';
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const navigation = useNavigation();
    const map = props?.route?.params
    const [Search, setSearch] = useState(null);
    const [marked, setmarked] = useState({});
    const mapRef = useRef();
    const [region, setRegion] = useState({
        latitude: 11.2027,
        longitude: 17.8739,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0321,
    });

    useEffect(() => {
        Geolocation.getCurrentPosition((pos) => {
            const crd = pos.coords;
            Geocoder.init(Api.map, { language: "en" });
            Geocoder.from(crd.latitude, crd.longitude)
                .then(json => { setSearch(json.results[0].formatted_address) })
                .catch(error => console.warn(error));
            setmarked({
                latitude: crd.latitude,
                longitude: crd.longitude,
            });
        },
            error => console.error(error),
            { timeout: 200000, enableHighAccuracy: false, maximumAge: 3600000, }
        )
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            setTimeout(() => {
                mapRef.current.fitToCoordinates([marked], {
                    animated: false
                }, false);
            }, 200);
        }
    }, [marked]);

    return (
        <SafeAreaView style={themestyles.container}>
            <MapView
                ref={mapRef}
                mapType="satellite"
                style={themestyles.map}
                initialRegion={region}
                loadingEnabled={true}
                onPress={(data) => {
                    Geocoder.init(Api.map, { language: "en" });
                    Geocoder.from(data?.nativeEvent?.coordinate?.latitude, data?.nativeEvent?.coordinate?.longitude)
                        .then(json => { setSearch(json.results[0].formatted_address) })
                        .catch(error => console.warn(error));
                    setmarked(data?.nativeEvent?.coordinate)
                }}
            >
                {
                    marked.latitude != null || marked.longitude != null ?
                        <Marker coordinate={marked} /> : null
                }
            </MapView >

            <TouchableOpacity onPress={() => { navigation.goBack() }} style={themestyles.back}>
                <Back height={20} width={20} />
            </TouchableOpacity>

            <View style={themestyles.bottom}>
                <View style={[Styles.flexrow, { width: "90%", alignItems: null }]}>
                    <Locationsvg height={30} width={30} />
                    <Text style={[themestyles.Partner, { fontSize: fontSize.font20, }]}>{Search}</Text>
                </View>
                <Button
                    button={{}}
                    onPress={() => {
                        if (Search == "" || Search == null) {
                            showToast("Please select location")
                            return
                        }
                        props.Location({
                            location: marked,
                            name: Search,
                            screen: map?.map
                        })
                        setTimeout(() => { navigation.goBack() }, 200);
                    }}
                    name="Continue"
                />
            </View>
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
