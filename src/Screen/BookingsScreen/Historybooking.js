import React, { } from 'react';
import { FlatList, Text } from 'react-native';
import styles from "./styles2"
import Status from "../../Component/Status"
import { GetFacilityStatusByDateBookingId } from '../../Redux/actions/user';
import { connect } from 'react-redux';
import moment from 'moment';
import { useTheme } from '../../../Theme';

const MyComponent = (props) => {
    const themestyles = styles();
    const renderItem = ({ item, index }) => (
        <Status
            item={item}
            index={index}
            last={"Payment Status "}
            date={item?.paymentStatus}
            status={"history"}
            onPress={() => props.GetFacilityStatusByDateBookingId({ "bookingId": item?.bookingId, "date": moment() }, { item: item })}
        />
    )
    return (
        <>
            {props?.Bookinghistory?.length > 0 ?
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={props?.Bookinghistory}
                    scrollEnabled={false}
                    renderItem={renderItem}
                    contentContainerStyle={themestyles.flatlist}
                />
                :
                <Text style={[themestyles.tabtext, { alignSelf: "center" }]}>History booking is not found.</Text>
            }
        </>
    );
};


const mapState = (state) => {
    return {
        Bookinghistory: state.booking.Bookinghistory,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        GetFacilityStatusByDateBookingId: (data, item) => dispatch(GetFacilityStatusByDateBookingId(data, item)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);