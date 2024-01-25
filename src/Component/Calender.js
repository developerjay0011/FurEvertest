import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Styles from '../utils/Styles';
import Close2 from '../assets/svg/close2.svg';
import showToast from '../utils/Toast';
import { useTheme } from '../../Theme';

const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [date, SetDate] = useState(new Date());
    const onDateChange = (date, type) => {
        SetDate(date)
        if (type === 'END_DATE') {
            setSelectedEndDate(date);
        } else {
            setSelectedEndDate(null);
            setSelectedStartDate(date);
        }
    };
    return (
        <Modal
            animationType={"none"}
            transparent={true}
            visible={props.open}
            onRequestClose={() => { props.setOpen() }}>
            <View style={themestyles.Modalview}>
                <View style={themestyles.ModalItem}>
                    <CalendarPicker
                        startFromMonday={true}
                        allowRangeSelection={props?.customrange == 0 ? false : true}
                        dayLabelsWrapper={{ borderBottomWidth: 0, borderTopWidth: 0 }}
                        weekdays={
                            [
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thur',
                                'Fri',
                                'Sat',
                                'Sun'
                            ]}
                        months={[
                            'January',
                            'Febraury',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December',
                        ]}
                        previousTitle="Previous"
                        nextTitle="Next"
                        selectedDayColor={'#1AB65C'}
                        selectedDayTextColor="white"
                        todayBackgroundColor={"grey"}
                        minDate={new Date()}
                        textStyle={{
                            color: '#000000', fontFamily: fontFamily.FontMedium,
                        }}
                        onDateChange={onDateChange}
                        minRangeDuration={props?.customrange == 0 ? null : 1}
                        width={280}
                        height={280}
                    />
                    <TouchableOpacity onPress={() => { props.setOpen() }} style={{ alignSelf: "flex-end", position: "absolute", top: -2 }}>
                        <Close2 height={25} width={25} />
                    </TouchableOpacity>
                    <Text style={themestyles.text} onPress={() => {
                        if (props?.customrange == 0 || props?.customrange == 1) {
                            if (props?.customrange != 0 && (selectedEndDate == null || selectedStartDate == null)) {
                                showToast("Please select from and to date")
                                return
                            }
                            if (props?.customrange == 0 && date == null) {
                                showToast("Please select from and to date")
                                return
                            }
                            props.setdate(props?.customrange == 0 ? { from: date, to: date } : { from: selectedStartDate, to: selectedEndDate })
                            return
                        }
                        else {
                            if (selectedEndDate == null || selectedStartDate == null) {
                                showToast("Please select from and to date")
                                return
                            }
                            props.setdate({ from: selectedStartDate, to: selectedEndDate })
                        }
                    }}>Ok</Text>
                </View>
            </View>
        </Modal>
    );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        text: {
            padding: 4,
            color: "#1AB65C",
            alignSelf: "flex-end",
            marginRight: 10,
            fontFamily: fontFamily.FontBold,
        },
        Modalview: {
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, .3)"
        },
        ModalItem: {
            backgroundColor: theme.white,
            paddingTop: 35,
            paddingBottom: 10,
            overflow: "hidden",
            alignItems: "center",
            width: 290,
            borderRadius: 15,
            ...Styles.up
        },
    })
}
export default MyComponent;

