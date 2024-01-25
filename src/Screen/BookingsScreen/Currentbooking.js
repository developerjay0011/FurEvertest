import React, { } from 'react';
import { FlatList, Text } from 'react-native';
import styles from "./styles2"
import Status from "../../Component/Status"
import { GetFacilityStatusByDateBookingId } from '../../Redux/actions/user';
import moment from 'moment';
import { connect } from 'react-redux';
import { useTheme } from '../../../Theme';
const MyComponent = (props) => {
    const themestyles = styles();
    const renderItem = ({ item, index }) => (
        <Status
            item={item}
            index={index}
            last={"Check-In Date"}
            status={"current"}
            date={moment(item?.checkInDate).format("DD-MM-YYYY")}
            onPress={() => props.GetFacilityStatusByDateBookingId({ "bookingId": item?.bookingId, "date": moment() }, { item: item })} />
    )
    return (
        <>
            {props?.currentBooking?.length > 0 ?
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={props?.currentBooking}
                    scrollEnabled={false}
                    renderItem={renderItem}
                    contentContainerStyle={themestyles.flatlist}
                />
                :
                <Text style={[themestyles.tabtext, { alignSelf: "center" }]}>Current booking is not found.</Text>
            }
        </>
    );
};


const mapState = (state) => {
    return {
        currentBooking: state.booking.currentBooking,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetFacilityStatusByDateBookingId: (data, item) => dispatch(GetFacilityStatusByDateBookingId(data, item)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);
