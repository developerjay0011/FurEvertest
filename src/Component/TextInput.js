import React, { useRef, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../Theme';
import Styles from "../utils/Styles"
import upload from "../assets/image/upload.png"
import Imagepicker from "../Component/Imagepicker"
import clock from "../assets/image/clock.png"
import bookagain from "../assets/image/bookagain.png"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import Calender from "../Component/Calender"
import showToast from '../utils/Toast';

const MyComponent = (props) => {
    const [show, setShow] = useState(true)
    const [timepick, setTimepick] = useState(false);
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();
    const image = useRef();
    var showdate = props?.placeholder
    if (props?.type == "date" || props?.type == "time") {
        showdate = props?.no_value == 2 ? (props?.value2 || props?.value ?
            (props?.format ?
                props?.value2 && props?.value ? moment(props.value)?.format(props?.format) + " - " + moment(props?.value2)?.format(props?.format) : props.placeholder
                : props?.value2 && props?.value ? props.value + " - " + props?.value2 : props.placeholder) : props.placeholder) :
            props?.value ? props?.format ? moment(props?.value)?.format(props?.format) : props?.value : props.placeholder
    }

    return (props?.type == "date" || props?.type == "time") && props?.small ? (
        <View style={props.style}>
            {props?.label ? <Text style={[themestyles.text, { fontSize: fontSize.font18 }]}>{props?.label}</Text> : null}
            <TouchableOpacity activeOpacity={.5} onPress={() => { if (props?.showalert) { props?.alert() } else { setTimepick(true) } }} style={[Styles.spacebetween, themestyles.date3, props.style, { marginTop: 0 }]} >
                <Text style={[themestyles?.datetext2, { color: props.value ? "black" : theme?.commontextgrey }]}>{showdate}</Text>
                <Image source={props?.type == "time" ? clock : bookagain} style={themestyles?.icon3} />
            </TouchableOpacity>
            {props?.type == "date" && props?.multiple ?
                <Calender
                    customrange={props?.datetype == "1" ? 1 : 0}
                    open={timepick}
                    setOpen={() => { setTimepick(false) }}
                    setdate={(date) => {
                        setTimepick(false)
                        props.onChangeText(date)
                    }} />
                :
                <DateTimePickerModal
                    maximumDate={new Date()}
                    isVisible={timepick}
                    date={new Date()}
                    mode={props?.type}
                    onConfirm={(time) => {
                        if (props?.inbetween == true && props?.check == true) {
                            if (moment(time)?.isBetween(props?.fromTime, props?.toTime)) {
                                setTimepick(false)
                                props.onChangeText(time)
                            } else {
                                showToast("Please select proper time.")
                                setTimepick(false)
                                return
                            }
                        } else {
                            setTimepick(false)
                            props.onChangeText(time)
                        }
                    }}
                    onCancel={() => setTimepick(false)}
                />
            }
        </View>) :
        props?.type == "date" || props?.type == "time" ? (
            <View style={props.style}>
                {props?.label ? <Text style={[themestyles.text, { fontSize: fontSize.font18 }]}>{props?.label}</Text> : null}
                <TouchableOpacity activeOpacity={.5} onPress={() => { if (props?.showalert) { props?.alert() } else { setTimepick(true) } }} style={[Styles.spacebetween, themestyles.date2, { marginTop: 0 }]} >
                    <Text style={[themestyles?.datetext, { color: props.value ? "black" : theme?.commontextgrey }]}>{showdate}</Text>
                    <Image source={props?.type == "time" ? clock : bookagain} style={themestyles?.icon2} />
                </TouchableOpacity>
                {props?.type == "date" && props?.multiple ?
                    <Calender
                        customrange={props?.datetype == "1" ? 1 : 0}
                        open={timepick}
                        setOpen={() => { setTimepick(false) }}
                        setdate={(date) => {
                            setTimepick(false)
                            props.onChangeText(date)
                        }} />
                    :
                    <DateTimePickerModal
                        maximumDate={new Date()}
                        isVisible={timepick}
                        date={new Date()}
                        mode={props?.type}
                        onConfirm={(time) => {
                            if (props?.inbetween == true && props?.check == true) {
                                if (moment(time)?.isBetween(props?.fromTime, props?.toTime)) {
                                    setTimepick(false)
                                    props.onChangeText(time)
                                } else {
                                    showToast("Please select proper time.")
                                    setTimepick(false)
                                    return
                                }
                                return
                            }
                            if (props?.mintime) {
                                if (moment(time).isBefore(props?.mintime)) {
                                    showToast("Please select proper time.")
                                    setTimepick(false)
                                    return
                                }
                                setTimepick(false);
                                props.onChangeText(time);
                            } else {
                                setTimepick(false);
                                props.onChangeText(time);
                            }
                        }}
                        onCancel={() => setTimepick(false)}
                    />
                }
            </View>
        ) : props?.type == "upload" ? (
            <>
                {props?.label ? <Text style={[themestyles.text, { fontSize: fontSize.font18 }]}>{props?.label}</Text> : null}
                <TouchableOpacity activeOpacity={.5} onPress={() => { image.current.open() }} style={[Styles.spacebetween, themestyles.date2]} >
                    <Text numberOfLines={1} style={[themestyles.datetext, { color: props.value ? "black" : theme?.placeholder }]}>{props.value ? props.value?.name ? props.value?.name : props.value?.image?.split("/")?.pop() : props?.placeholder}</Text>
                    <Image source={upload} style={[themestyles?.icon2, { tintColor: theme?.placeholder }]} />
                </TouchableOpacity>
                <Imagepicker
                    open={image}
                    refs={image}
                    imagestyle={props?.imagestyle}
                    setopen={() => { image.current.close(); }}
                    upload={(item) => {
                        if (item) {
                            props?.onChangeText(item)
                            image.current.close();
                        }
                    }}
                />
            </>
        ) : (
            <View style={{ width: props?.width ? props?.width : null, marginBottom: props?.bottom == 0 ? 0 : props?.bottom ? props?.bottom : 5 }}>
                {props?.label ? <Text style={[themestyles.text, { fontSize: fontSize.font18 }]}>{props?.label}</Text> : null}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <TextInput
                        style={[themestyles.textinput, { height: width / 8, fontSize: fontSize.font20, }, props.style]}
                        onChangeText={(text) => { props.onChangeText(text) }}
                        maxLength={props.maxLength}
                        value={props.value}
                        secureTextEntry={props.password ? show : false}
                        multiline={props?.multiline}
                        numberOfLines={props?.numberOfLines}
                        keyboardType={props.keyboardType}
                        onSubmitEditing={props?.onSubmitEditing}
                        editable={props?.editable == false ? props?.editable : true}
                        placeholder={props.placeholder}
                        placeholderTextColor={theme?.placeholder}
                        mode="outlined"
                        outlineColor={theme.bordercolor}
                        activeOutlineColor={theme.bordercolor}
                        textColor={theme.black}
                        selectionColor={"black"}
                    />
                    {props?.password == true ?
                        <TouchableOpacity onPress={() => { setShow(!show) }} style={{ position: "absolute", right: 13 }}>
                            {show ?
                                <Image source={require("../assets/image/hide.png")} resizeMode="contain" style={{ width: 20, height: 20, tintColor: theme.eyecolor }} />
                                :
                                <Image source={require("../assets/image/eye.png")} resizeMode="contain" style={{ width: 20, height: 20, tintColor: theme.eyecolor }} />
                            }
                        </TouchableOpacity>
                        :
                        null
                    }
                </View>
            </View>
        );
};

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        icon2: {
            height: width / 26,
            width: width / 26,
            resizeMode: "contain"
        },
        icon3: {
            height: width / 30,
            width: width / 30,
            resizeMode: "contain"
        },
        text: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontSemiBold,
            marginBottom: 5,
            marginTop: 10
        },
        textinput: {
            fontFamily: fontFamily.FontRegular,
            backgroundColor: theme.textinputbackground,
            color: "black",
            height: null,
            borderRadius: 50,
            alignSelf: "center",
            paddingHorizontal: 20,
            width: "100%",
            borderWidth: 1,
            borderColor: theme?.border
        },
        datetext: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontRegular,
            fontSize: fontSize.font20,
            color: theme?.placeholder,
            width: "90%"
        },
        datetext2: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontRegular,
            fontSize: fontSize.font15,
            color: theme?.placeholder,
            width: "90%",
            flex: 1
        },
        date2: {
            backgroundColor: theme.white,
            borderColor: theme?.border,
            borderWidth: 1,
            borderRadius: 100,
            width: "100%",
            paddingHorizontal: 20,
            height: width / 8,
            backgroundColor: theme.textinputbackground,
        },
        date3: {
            backgroundColor: theme.white,
            borderColor: theme?.border,
            borderWidth: 1,
            borderRadius: 100,
            width: "100%",
            paddingHorizontal: 10,
            height: width / 10,
            backgroundColor: theme.textinputbackground,
            marginTop: 10,
        }


    })
}
export default MyComponent;
