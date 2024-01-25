//import liraries
import React, { useEffect, useState } from 'react';
import Styles from '../utils/Styles';
import { View, StyleSheet, Dimensions } from 'react-native';
import Dropdown from "./Dropdown"
import Textinput from "./TextInput"
const MyComponent = (props) => {
    const { width } = Dimensions.get("screen")
    const [bannerWidth, setBannerWidth] = useState(width)
    const [woking, SetWoking] = useState([])
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [timeaday, setTimeaday] = useState(null);
    const [items, setItems] = useState([
        { label: '30 Min', value: '30' },
        { label: '1 Hours', value: '60' },
        { label: '2 Hours', value: '120' },
        { label: '3 Hours', value: '180' }
    ]);
    useEffect(() => {
        const remove = Dimensions.addEventListener("change", status => { setBannerWidth(status.window.width) })
        return () => { remove.remove() }
    }, [])
    useEffect(() => {
        SetWoking(props?.woking)
    }, [props?.woking])

    return (
        <View style={[Styles.spacebetween, { marginVertical: 3, marginBottom: (props?.index + 1) == props?.woking?.length ? 10 : null }]}>
            <Dropdown
                open={open}
                value={value}
                items={items}
                setOpen={() => setOpen(!open)}
                setValue={(value) => {
                    var data = [...woking]
                    setValue(value);
                    data[props?.index].time = value?.value;
                    SetWoking(data);
                    props.wakling(data);
                }}
                placeholder={"Select Pet"}
                style={{ width: "49%" }}
                container={{ borderRadius: 5, height: bannerWidth / 10 }}
            />
            <Textinput keyboardType="number-pad" value={timeaday} bottom={0} placeholder={"Time in a day"} width="49%" style={{ borderRadius: 5, height: bannerWidth / 10, marginBottom: 0 }} onChangeText={(text) => {
                setTimeaday(text);
                var data = [...woking]
                data[props?.index].timeaday = text;
                SetWoking(data);
                props.wakling(data);
            }} />
        </View>
    );
};


export default MyComponent;
