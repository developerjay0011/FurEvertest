import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import Dropdowntext from "../Component/dropdowntext"
import Dropd from "../assets/image/down.png"
import Add from "../Component/Add"
import { useTheme } from '../../Theme';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';
import { AddEditChildDetail } from '../Redux/actions/user';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    const [posi, setPosi] = useState(20)
    const [withs, setWidth] = useState("90%")
    const [left, setRigth] = useState(10)
    const DropdownButton = useRef();
    const navigation = useNavigation();


    const renderItem = ({ item, index }) => (
        <Dropdowntext
            item={item}
            index={index}
            values={props.value}
            onPress={(value) => { props.setValue(value), props.setOpen() }}
        />
    )

    const openDropdown = (): void => {
        DropdownButton.current.measure((_fx, _fy, _w, h, _px, py) => {
            setPosi(py + h);
            setWidth(_w)
            setRigth(_px);
        });
        setTimeout(() => { props.setOpen() }, 200);
    };

    return (
        <View style={props?.style}>
            {props?.label ? <Text style={[themestyles.text2, { fontSize: fontSize.font18 }]}>{props?.label}</Text> : null}
            <TouchableOpacity ref={DropdownButton} onPress={() => { openDropdown() }} style={[themestyles.container, { height: width / 8, }, props?.container]}>
                <Text numberOfLines={1} style={[themestyles.text, {
                    fontSize: fontSize.font20,
                    width: "90%", color: props?.value?.label ? "black" : props?.placeholdercolor ? props?.placeholdercolor : theme?.placeholder
                }, props?.text]}>{props?.value?.label ? props.value?.label : props.placeholder}</Text>
                <Image source={Dropd} style={{ width: width / 18, height: width / 18, resizeMode: "contain", tintColor: theme?.placeholder }} />
            </TouchableOpacity>

            <Modal
                animationType={"none"}
                visible={props.open}
                transparent={true}
                onRequestClose={() => { props.setOpen() }}>
                <TouchableOpacity activeOpacity={0} onPress={() => { props.setOpen() }} style={{ height: "100%" }}>
                    <View style={[themestyles.modal, { left: left, top: posi, width: withs }]}>
                        {props?.items?.length > 0 ?
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={props?.items}
                                renderItem={renderItem}
                            />
                            : props.placeholder == "Select Pet" ?
                                <Text style={[themestyles.text, { textAlign: "center", marginTop: 10 }]}>Please Add pet.</Text>
                                :
                                <Image source={require("../assets/image/nodata.png")} style={{ marginTop: 10, height: 50, width: 50, alignSelf: "center", }} />
                        }

                        {props.placeholder == "Select Pet" ?
                            <Add
                                style={{ height: 25, width: 25, position: "relative", alignSelf: "flex-end", bottom: 0 }}
                                height={12}
                                width={12}
                                onPress={() => {
                                    props.AddEditChildDetail(null)
                                    navigation.navigate("Addchild")
                                    props.setOpen()
                                }} child={true} />
                            :
                            null
                        }
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    );
};
const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        container: {
            borderWidth: 1,
            borderRadius: 50,
            borderColor: theme?.border,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 20,
            backgroundColor: theme.textinputbackground,
        },
        text: {
            fontFamily: fontFamily.FontRegular,
            color: theme.textinput,
        },
        text2: {
            color: theme.darkgreen,
            fontFamily: fontFamily.FontSemiBold,
            marginBottom: 5,
            marginTop: 10
        },
        modal: {
            maxHeight: 200,
            backgroundColor: theme.textinputbackground,
            position: 'absolute',
            borderRadius: 20,
            elevation: 12,
            paddingVertical: 10,
            width: '100%',
            shadowColor: '#000000',
            shadowRadius: 4,
            shadowOffset: { height: 4, width: 0 },
            shadowOpacity: 1,
        }
    })
}

const mapState = (state) => {
    return {
        loader: state.user.loader,
    };
}
const mapDispatchToProps = (dispatch) => {
    return {
        AddEditChildDetail: (param) => dispatch(AddEditChildDetail(param)),
    }
}

export default connect(mapState, mapDispatchToProps)(MyComponent);