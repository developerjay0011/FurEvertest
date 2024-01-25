import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, Image } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import ImageResizer from '@bam.tech/react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
import { useTheme } from '../../Theme';
const MyComponent = (props) => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles();

    let options = {
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };
    const setsize = (image) => {
        ImageResizer.createResizedImage(
            props?.crop ? image.path : image.uri,
            props?.crop ? props.size.width : image.width,
            props?.crop ? props.size.height : image.height,
            'JPEG',
            70,
            0
        ).then((response) => {
            props.setopen()
            props.upload({ "image": response.uri, name: response.name, type: "image/jpeg" })
        }).catch((err) => {
            props.setopen()
        });
    }
    const cameraLaunch = () => {
        if (props?.crop) {
            ImagePicker.openCamera({
                width: props.size.width,
                height: props.size.height,
                cropping: true,
                cropperCircleOverlay: props.size.circle == true ? true : false,
            }).then(image => {
                setsize(image)
            }).catch((err) => {
                props.setopen()
            });
        }
        else {
            launchCamera(options, async (res) => {
                if (res.didCancel || res.error || res.customButton) {
                    props.setopen()
                } else {
                    if (props.type == 'video') {
                        props.upload({ "image": res.assets[0].uri, name: res.assets[0].fileName, type: "video/mp4" })
                    }
                    else {
                        setsize(res.assets[0])
                    }
                }
            });
        }

    }
    const imageGalleryLaunch = () => {
        if (props?.crop) {
            ImagePicker.openPicker({
                width: props.size.width,
                height: props.size.height,
                cropping: true,
                multiple: false,
                cropperCircleOverlay: props.size.circle == true ? true : false,
            }).then(image => {
                setsize(image)
            }).catch((err) => {
                props.setopen()
            });
        } else {
            launchImageLibrary(options, (res) => {
                if (res.didCancel || res.error || res.customButton) {
                    props.setopen()
                } else {
                    setsize(res.assets[0])
                }
            });
        }
    }
    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                cameraLaunch()
            } else {
                console.log(granted)
            }
        } catch (err) {
            console.warn(err);
        }
    }
    const checkReadContactsPermission = async () => {
        const result = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
        if (result == true) {
            cameraLaunch()
        }
        else {
            requestCameraPermission()
        }
    }
    const checkSTORAGE = async () => { imageGalleryLaunch() }



    return (
        <RBSheet
            ref={props?.refs}
            height={width / 2}
            openDuration={250}
            backgroundColor={"rgba(255,255,255,0)"}
            customStyles={{
                container: {
                    justifyContent: "center",
                    alignItems: "center",
                    borderTopRightRadius: 25, borderTopLeftRadius: 25,
                    overflow: "hidden"
                }
            }}
        >
            <View style={[themestyles.Modalview,]}>
                <TouchableOpacity onPress={() => { checkReadContactsPermission() }}>
                    <Image
                        imageStyle={{ resizeMode: "stretch" }}
                        style={[themestyles.Icon, { width: width / 4.5, height: width / 4.5 }]}
                        source={require('../assets/image/camera.png')} />
                    <Text style={[themestyles.text, { fontSize: width / 25 }]}>Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { checkSTORAGE() }}>
                    <Image
                        imageStyle={{ resizeMode: "stretch" }}
                        style={[themestyles.Icon, { width: width / 4.5, height: width / 4.5 }]}
                        source={require('../assets/image/gallery.png')} />
                    <Text style={[themestyles.text, { fontSize: width / 25 }]}>Gallery</Text>
                </TouchableOpacity>
            </View>
        </RBSheet>
    );
};


const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        Modalview: {
            backgroundColor: theme.appback,
            flex: 1,
            width: "100%",
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: "center",
            overflow: "hidden"
        },
        text: {
            fontFamily: fontFamily.FontBold,
            alignSelf: "center",
            color: theme.white,
            marginTop: 3
        },
    })
}


export default MyComponent;
