import React from 'react';
import { Text, SafeAreaView, FlatList, View, ScrollView } from 'react-native';
import styles from "./styles"
import Header from "../../Component/Header"
import { useNavigation } from '@react-navigation/native';
import Searchrow from "../../Component/Searchrow"
import { connect } from 'react-redux';
import { BookingStatus, Likedata } from '../../Redux/actions/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import showToast from '../../utils/Toast';
const MyComponent = (props) => {
    const navigation = useNavigation()
    const { fromdate, todate, value } = props?.route?.params
    const themestyles = styles()
    const Add = async (like, item) => {
        if (like) {
            remove(like, item)
        } else {
            const result = await AsyncStorage.getItem("Favourites")
            var tempArr = JSON.parse(result)
            if (tempArr == null) { tempArr = [] }
            tempArr.push(item)
            await AsyncStorage.setItem("Favourites", JSON.stringify(tempArr))
            props.Likedata(tempArr)
            showToast("Added to favourites list")
        }
    }
    const remove = async (like, item) => {
        const result = await AsyncStorage.getItem("Favourites")
        var tempArr = JSON.parse(result)
        var remove = tempArr?.filter?.(item2 => item2?.centerId != item?.centerId)
        await AsyncStorage.setItem("Favourites", JSON.stringify(remove))
        showToast("Remove to favourites list")
        props.Likedata(remove)
    }
    const renderItem = ({ item, index }) => (
        <Searchrow
            item={item}
            index={index}
            like={props?.likedata?.filter(item2 => item2?.centerId == item?.centerId)?.length > 0 ? true : false}
            onLike={(like) => { Add(like, item) }}
            onnavigate={() => {
                navigation.navigate("Roomlocation", {
                    location: item,
                    fromdate: fromdate, todate: todate, childid: value
                })
            }}
            onPress={() => {
                props.BookingStatus({
                    centerdata: { item: item, fromdate: fromdate, todate: todate, childid: value },
                    state: "Satrtbooking"
                })
            }}
        />
    )
    console.log(props?.ChildCenter2)
    return (
        <SafeAreaView style={themestyles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Header onPress={() => navigation.goBack()} name={"FurEver"} />
                <Text style={[themestyles.Explore,]}>Found {props?.ChildCenter2 ? props?.ChildCenter2?.length : 0} FurEver homes</Text>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={props?.ChildCenter2}
                    scrollEnabled={false}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingHorizontal: 20, marginTop: 5 }}
                />
            </ScrollView>
        </SafeAreaView>
    );
};


const mapState = (state) => {
    return {
        ChildCenter2: state.booking.ChildCenter2,
        likedata: state.booking.likedata,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        BookingStatus: (data) => dispatch(BookingStatus(data)),
        Likedata: (data) => dispatch(Likedata(data)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
