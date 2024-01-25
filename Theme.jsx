import React, {createContext, useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Dimensions} from 'react-native';
import font from './src/utils/CustomFont';
import fonts from './src/utils/Responsivefont';
const {width, height} = Dimensions.get('window');

const themes = {
    backgroundcolor: '#FFFFFF',
    appback: '#FFFFFF',
    textinputbackground: 'rgb(246,247,248)',
    eyecolor: '#909090',
    white: 'white',
    textinput: 'black',
    bordercolor1: 'rgba(0, 0, 0, 0.4)',
    blue: '#3972FE',
    black: 'black',
    homerowtext: 'black',
    grey: 'rgba(185, 188, 190, 1)',
    homerowB: 'rgba(57, 114, 254, 0.1)',
    homerow: '#FFFFFF',
    textinputholder: 'black',
    forgot: 'rgba(0, 0, 0, 0.7)',
    forgot2: '#717171',
    commontext: 'black',
    searchrowcolor: 'rgba(202, 223, 184, 1)',
    selecteddrop: 'rgba(196, 196, 196, 0.5)',
    commongreen: '#73AB6B',
    darkgreen: 'rgba(63, 86, 41, 1)',
    Buttoncolor: '#73AB6B',
    bordercolor: 'rgba(176, 204, 157, 1)',
    singtextcolor: 'rgba(63, 86, 41, 1)',
    buttontextcolor: 'rgba(63, 86, 41, 0.9)',
    headername: 'black',
    darkgreen: '#3F5629',
    skyblue: '#35C2C1',
    homereating: '#FF555B',
    homestar: '#FFD33C',
    homerowname: '#FF555B',
    locationtext: '#707070',
    homeprize: '#707470',
    heading: '#74923C',
    drower: '#878787',
    hometextplace: '#878787',
    notification: '#FF555B',
    homebar: '#74923C',
    selected: '#1AB65C',
    homefrom: '#707070',
    searchtext: '#707070',
    tabunactive: '#787878',
    tabactive: '#74923C',
    commontextgrey: '#707070',
    border: '#E8ECF4',
    placeholder: '#8391A1',
    centername: '#000000',
    bookingboder:'rgba(0,0,0,0.25)',
    bookingcircle:"#73AB6B",
};
const ThemeContext = createContext();
export function ThemeProvider({children}) {
  return (
    <ThemeContext.Provider
      value={{
        theme: themes,
        height: height,
        width: width,
        fontFamily: font,
        fontSize: fonts(),
      }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
