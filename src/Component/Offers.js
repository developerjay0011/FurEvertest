import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';

const MyComponent = (props) => {
    const { width } = Dimensions.get("screen")
    const [bannerWidth, setBannerWidth] = useState(width)
    useEffect(() => {
        const remove = Dimensions.addEventListener("change", status => { setBannerWidth(status.window.width) })
        return () => { remove.remove() }
    }, [])
    return (
        <TouchableOpacity key={props?.index} onPress={() => { props?.onPress() }} style={{ width: bannerWidth / 1.2, marginRight: 20, height: bannerWidth / 3, borderRadius: 10, overflow: "hidden" }}>
            <Image source={props?.item?.image} style={{ height: "100%", width: "100%" }} />
        </TouchableOpacity>
    );
};

export default MyComponent;
