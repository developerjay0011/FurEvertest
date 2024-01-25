import React, { } from 'react';
import { Text, FlatList } from 'react-native';
import styles from "./styles2"
import { useNavigation } from '@react-navigation/native';
import Status from "../../Component/Status"
import { GetFacilityStatusByDateBookingId } from '../../Redux/actions/user';
import { connect } from 'react-redux';
import { useTheme } from '../../../Theme';
import moment from 'moment';
const MyComponent = (props) => {
    const themestyles = styles();
    const renderItem = ({ item, index }) => (
        <Status
            item={item}
            index={index}
            last={"Check-in Status "}
            status={"upcoming"}
            date={item?.checkInStatus}
            onPress={() => { props.GetFacilityStatusByDateBookingId({ "bookingId": item?.bookingId, "date": moment() }, { item: item }) }}
        />
    )
    return (
        <>
            {props?.Upcomingbooking?.length > 0 ?
                <FlatList
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={false}
                    data={props?.Upcomingbooking}
                    renderItem={renderItem}
                    contentContainerStyle={themestyles.flatlist}
                />
                :
                <Text style={[themestyles.tabtext, { alignSelf: "center" }]}>Upcoming booking is not found.</Text>
            }
        </>
    );
};


const mapState = (state) => {
    return {
        Upcomingbooking: state.booking.Upcomingbooking,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetFacilityStatusByDateBookingId: (data, item) => dispatch(GetFacilityStatusByDateBookingId(data, item)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
