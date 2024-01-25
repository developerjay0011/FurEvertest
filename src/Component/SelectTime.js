
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import moment from 'moment';
import Textinput from "./TextInput";
const MyComponent = (props) => {
    return (
        <View style={{ width: "33.3%", justifyContent: "center", marginBottom: 10 }}>
            <Textinput
                type="time"
                datetype={0}
                style={{ width: "95%" }}
                placeholder="Time"
                format={null}
                value={props?.item?.time}
                fromTime={props?.fromTime}
                toTime={props?.toTime}
                inbetween={true}
                check={props?.ifHour}
                small={true}
                multiple={true}
                onChangeText={(date) => {
                    props?.onTime(moment(date).format("hh:mm A"))
                }}
            />
        </View>
    );
};


export default MyComponent;
