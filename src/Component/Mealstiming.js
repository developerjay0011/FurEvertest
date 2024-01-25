import React, { useState } from 'react';
import { View } from 'react-native';
import Styles from "../utils/Styles"
import Dropdown from "../Component/Dropdown"
import moment from 'moment';
import showToast from '../utils/Toast';
import Textinput from '../Component/TextInput'
const Meal = (props) => {
    const [open2, setOpen2] = useState(false);
    const [items2, setItems2] = useState(props?.data?.map(item => ({ value: item?.mealId, label: item?.name })));
    const [value2, setValue2] = useState(null);
    const [time2, setTime] = useState(null);


    return (
        <View key={props?.index} style={[Styles.spacebetween, { marginTop: 10 }]}>
            <Dropdown
                open={open2}
                value={value2}
                items={items2}
                setOpen={() => setOpen2(!open2)}
                setValue={(value) => { setValue2(value); if (time2) { props.onPress(props.index, value2?.value, time2) } }}
                setItems={setItems2}
                placeholder={"Choose meal"}
                style={{ width: "48%" }}
            />
            <Textinput
                type="time"
                style={{ width: "48%" }}
                format={null}
                value={time2}
                fromTime={props?.fromTime}
                toTime={props?.toTime}
                inbetween={true}
                check={props?.isHourlyBooking}
                placeholder="Timings"
                onChangeText={(time) => {
                    if (value2?.value) {
                        setTime(moment(time).format("hh:mm A"));
                        props.onPress(props.index, value2?.value, moment(time).format("hh:mm A"))
                    } else { showToast("Please select meal first") }
                }}
            />
        </View>

    );
};

export default Meal
