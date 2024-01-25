import React, { useState, useRef, useEffect } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import Styles from "../../utils/Styles"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Button from "../../Component/Button"
import moment from 'moment';
import Calendar from "../../assets/svg/calendar.svg"
import { useNavigation } from '@react-navigation/native';
import Recommend from "../../Component/Recommend"
import Dropdown from "../../Component/Dropdown"
import { connect } from 'react-redux';
import { BookingStatus, SearchChildCenter2 } from '../../Redux/actions/user';
import showToast from '../../utils/Toast';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Location from "../../assets/svg/location.svg"
import Api from '../../utils/Url';
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const navigation = useNavigation()
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const [location, setLocation] = useState(null)
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [from, setFrom] = useState(null)
    const [to, setTo] = useState(null)
    const [type, setType] = useState(true)
    const [show, setshow] = useState(false)
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Boy', value: 'Boy' },
        { label: 'Girl', value: 'Girl' },
    ]);
    const [marked, setmarked] = useState({});
    const [rangebid, setrangebid] = useState([0, 0])
    const ref = useRef()
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
        if (type == true && to == null) {
            setDatePickerVisibility(true);
        }
    };
    const handleConfirm = (date) => {
        if (type == true) {
            setFrom(date);
            setType(false)
        } else {
            setTo(date);
        }
        hideDatePicker();
    };
    useEffect(() => {
        if (props?.location?.sceeen != "home") {
            setLocation(props?.location?.name)
            setmarked(props?.location?.location)
        }
    }, [props?.location])

    const renderItem = ({ item, index }) => (
        <Recommend
            item={item}
            index={index}
            onPress={() => {
                props.BookingStatus({
                    centerdata: { item: item, fromdate: from, todate: to, childid: null },
                    state: "Satrtbooking"
                })
            }}
        />
    )
    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'}>
                <Header tab={true} onPress={() => { setshow(true) }} name={"FurEver"} />
                <Text style={[themestyles.Explore, { fontSize: fontSize.font20 }]}>Explore home for your fur babies</Text>

                <View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <GooglePlacesAutocomplete
                            ref={ref}
                            placeholder={"Location"}
                            fetchDetails={true}
                            query={{ key: Api.map, language: 'en', }}
                            onPress={(data, details = null) => {
                                setmarked({ latitude: details?.geometry?.location.lat, longitude: details?.geometry?.location.lng })
                                setLocation(data?.description);
                            }}
                            textInputProps={{ placeholderTextColor: theme.textinputholder, value: location, onChangeText: (text) => { setLocation(text) } }}
                            styles={{
                                textInputContainer: { backgroundColor: "transparent" },
                                textInput: { fontSize: fontSize.font16, },
                                description: { color: theme.black },
                                poweredContainer: { backgroundColor: "transparent" },
                                row: { backgroundColor: 'transparent', },
                                textInput: [themestyles.textinput, { height: width / 9 }]
                            }}
                        />
                        <TouchableOpacity onPress={() => { navigation.navigate("Map", { map: "search" }) }} style={{ position: "absolute", right: 13, marginTop: "3%" }}>
                            <Location height={20} width={20} />
                        </TouchableOpacity>
                    </View>

                    <View style={[Styles.spacebetween, { marginBottom: 7, }]}>
                        <TouchableOpacity onPress={() => { setDatePickerVisibility(true), setType(true) }} style={[Styles.spacebetween, themestyles.date, { height: width / 9 }]} >
                            <Text style={[themestyles.datetext, { fontSize: fontSize.font16 }]}>{from ? moment(from).format("DD MMM") : "From"}</Text>
                            <Calendar style={{ position: "absolute", right: 10, }} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { setDatePickerVisibility(true), setType(false) }} style={[Styles.spacebetween, themestyles.date, { height: width / 9 }]} >
                            <Text style={[themestyles.datetext, { fontSize: fontSize.font16 }]}>{to ? moment(to).format("DD MMM") : "To"}</Text>
                            <Calendar style={{ position: "absolute", right: 10 }} />
                        </TouchableOpacity>
                    </View>

                    <Dropdown
                        open={open}
                        value={value}
                        items={items}
                        setOpen={() => { setOpen(!open) }}
                        setValue={(value) => { setValue(value) }}
                        setItems={setItems}
                        placeholder={"Select Pet Gender"}
                    />

                    <View style={{ marginTop: 8, borderWidth: 1, borderRadius: 5, borderColor: theme.bordercolor, paddingVertical: 10 }}>
                        <View style={[Styles.spacebetween, { paddingHorizontal: 10 }]}>
                            <Text style={[themestyles.datetext, { fontSize: fontSize.font16 }]}>Budget</Text>
                            <Text style={[themestyles.datetext, { fontSize: fontSize.font16 }]}>Rs. {rangebid[0]} - {rangebid[1]}</Text>
                        </View>
                    </View>


                    <Button
                        button={{ marginTop: 20, width: "80%" }}
                        onPress={() => {
                            if (value?.label == "" || value?.label == null) {
                                showToast("Please Select Pet type")
                                return
                            }
                            if (from == "" || from == null) {
                                showToast("Please enter from date")
                                return
                            }
                            if (to == "" || to == null) {
                                showToast("Please enter to date")
                                return
                            }
                            props.SearchChildCenter2({
                                "fromDate": from,
                                "toDate": to,
                                "latitude": String(marked?.latitude),
                                "longitude": String(marked?.longitude),
                                "childType": value?.label,
                                "fromRange": rangebid[0],
                                "toRange": rangebid[1]
                            })
                        }}
                        name="Search"
                    />

                    <Text style={[themestyles.Recommendations, { fontSize: fontSize.font20 }]}>Recommendations</Text>

                    <View style={{}}>
                        {props?.ChildCenter?.length > 0 ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                scrollEnabled={false}
                                data={props?.ChildCenter}
                                renderItem={renderItem}
                            />
                            :
                            <Text style={{ color: theme.commongreen, alignSelf: "center" }}>Search for available center</Text>
                        }
                    </View>
                </View>

            </ScrollView>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
                minimumDate={new Date()}
            />
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        user: state.user.user,
        location: state.common.location,
        loader: state.user.loader,
        ChildCenter: state.booking.ChildCenter,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        SearchChildCenter2: (data) => dispatch(SearchChildCenter2(data)),
        BookingStatus: (data) => dispatch(BookingStatus(data)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
