/**
 * @format
 */

import { AppRegistry, StatusBar } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

StatusBar.setBackgroundColor('#FFFFFF');
if (!__DEV__) {
    console.log = () => { };
}
AppRegistry.registerComponent(appName, () => gestureHandlerRootHOC(App));