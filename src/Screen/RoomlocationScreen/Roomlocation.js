
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from "@react-navigation/native"
import styles from './styles';
import Styles from '../../utils/Styles';
import Button from "../../Component/Button"
import Back from "../../Component/Back"
import { Location } from '../../Redux/actions/common';
import Geocoder from 'react-native-geocoding';
import Locationsvg from "../../assets/svg/location.svg"
import Api from '../../utils/Url';
import { BookingStatus } from '../../Redux/actions/user';
import { useTheme } from '../../../Theme';
import MapView, { Marker } from 'react-native-maps';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    const navigation = useNavigation();
    const location = props?.route?.params
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
        setSearch(location?.location?.address)
        Geocoder.init(Api.map, { language: "en" })
        Geocoder.from(location?.location?.address)
            .then(json => {
                var location = json?.results[0]?.geometry?.location;
                setmarked({
                    "latitude": location?.lat,
                    "longitude": location?.lng,
                })
            })
            .catch(error => console.warn(error))
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
            <MapView ref={mapRef} mapType="standard" style={themestyles.map} initialRegion={region} loadingEnabled={true}>
                {marked.latitude != null || marked.longitude != null ? <Marker coordinate={marked} /> : null}
            </MapView >

            <Back style={themestyles.back} onPress={() => { navigation.goBack() }} press={true} />

            {location?.location?.hide != true ?
                <View style={themestyles.bottom}>
                    <View style={[Styles.flexrow, { width: "90%", alignItems: null }]}>
                        <Locationsvg height={30} width={30} />
                        <Text style={[themestyles.Partner, { fontSize: fontSize.font20, }]}>{Search}</Text>
                    </View>
                    <Button
                        name="Continue"
                        onPress={() => {
                            props.BookingStatus({
                                centerdata: { item: location?.location, fromdate: location?.fromdate, todate: location?.todate, childid: location?.childid },
                                state: "Satrtbooking"
                            })
                        }}
                    />
                </View>
                :
                null
            }
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
        Location: (data) => dispatch(Location(data)),
        BookingStatus: (data) => dispatch(BookingStatus(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
