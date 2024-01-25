import React, { createContext, useContext, useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const ResponsiveContext = createContext();

export function useResponsive() {
    return useContext(ResponsiveContext);
}

export function ResponsiveProvider({ children }) {
    const [screenWidth, setScreenWidth] = useState(Math.round(Dimensions.get('window').width));
    const [screenHeight, setScreenHeight] = useState(Math.round(Dimensions.get('window').height));

    useEffect(() => {
        const updateScreenWidth = ({ window }) => {
            setScreenWidth(Math.round(window.width));
            setScreenHeight(Math.round(window.height));
        };

        // Add event listener only once when the component mounts
        Dimensions.addEventListener('change', updateScreenWidth);

        // Remove the event listener when the component unmounts
        return () => {
            Dimensions.removeEventListener('change', updateScreenWidth);
        };
    }, []); // Empty dependency array ensures the event listener is added and removed only once

    const calculateFontSizes = (width) => {
        return {
            font20: Math.round(width / 24),
            font22: Math.round(width / 22),
            font25: Math.round(width / 18),
            font27: Math.round(width / 16),
            font18: Math.round(width / 26),
            font16: Math.round(width / 30),
            font15: Math.round(width / 32),
            font30: Math.round(width / 16),
        };
    };

    const fontSizes = calculateFontSizes(screenWidth);

    return (
        <ResponsiveContext.Provider value={{ screenWidth, screenHeight, fontSizes }}>
            {children}
        </ResponsiveContext.Provider>
    );
}
