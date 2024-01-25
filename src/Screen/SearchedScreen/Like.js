import React, { } from 'react';
import { Text, SafeAreaView, FlatList, ScrollView } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import { useNavigation } from '@react-navigation/native';
import Likerow from "../../Component/Likerow"
import { connect } from 'react-redux';
import { BookingStatus, Likedata } from '../../Redux/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const navigation = useNavigation()
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    var mapid = props?.likedata?.map(item => item.centerId)
    const List = props?.ChildCenter?.length > 0 ? props?.ChildCenter?.filter(item => mapid?.includes(item?.centerId)) : []


    const renderItem = ({ item, index }) => (
        <Likerow
            item={item}
            index={index}
            onnavigate={() => { navigation.navigate("Roomlocation", { location: item, fromdate: null, todate: null, childid: null }) }}
            get={async () => {
                const result = await AsyncStorage.getItem("Favourites")
                var tempArr = JSON.parse(result)
                var remove = tempArr?.filter?.(item2 => item2?.centerId != item?.centerId)
                await AsyncStorage.setItem("Favourites", JSON.stringify(remove))
                props?.Likedata(remove)
            }}
            onPress={() => {
                props.BookingStatus({
                    centerdata: { item: item, fromdate: null, todate: null, childid: null },
                    state: "Satrtbooking"
                })
            }}
        />
    )


    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header tab={true} onPress={() => { navigation.toggleDrawer() }} name={"Favourites"} />
                <Text style={[themestyles.Explore]}>Furever you have liked</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    data={props?.likedata?.length > 0 ? List : []}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: 20, marginTop: 5 }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        ChildCenter: state.booking.ChildCenter,
        likedata: state.booking.likedata,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        BookingStatus: (data) => dispatch(BookingStatus(data)),
        Likedata: (data) => dispatch(Likedata(data))
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
