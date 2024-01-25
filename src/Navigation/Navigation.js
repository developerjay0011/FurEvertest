import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Screen/LoginScreen/Login';
import Signup from '../Screen/SignupScreen/Signup';
import Forgotpassword from '../Screen/ForgotpasswordScreen/Forgotpassword';
import Profile from '../Screen/ProfileScreen/Profile';
import EditProfile from '../Screen/EditProfileScreen/EditProfile';
import Search from '../Screen/SearchScreen/Search';
import Searched from '../Screen/SearchedScreen/Searched';
import Forgotpassword2 from '../Screen/ForgotpasswordScreen2/Forgotpassword2';
import Welcome from '../Screen/WelcomeScreen/Welcome';
import Booking from "../Screen/BookingScreen/Booking"
import Changepass from "../Screen/ChangepassScreen/Changepass"
import Bookings from "../Screen/BookingsScreen/Bookings"
import Notification from "../Screen/NotificationScreen/Notification"
import Addchild from "../Screen/AddchildScreen/Addchild"
import Checkdetail from "../Screen/CheckdetailScreen/Checkdetail"
import Bookingdetail from "../Screen/BookingdetailScreen/Bookingdetail"
import Childs from "../Screen/ChildsScreen/Childs"
import Otp from '../Screen/OtpScreen/Otp';
import { navigationRef } from './RootNavigation';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../Screen/HomeScreen/Home"
import LiveScreen from "../Screen/LiveScreen/LiveScreen"
import Roomlocation from "../Screen/RoomlocationScreen/Roomlocation"
import font from '../utils/CustomFont';
import { Image, StyleSheet } from 'react-native';
import Map from "../Screen/MapScreen/Map"
import Upcomingbooking from '../Screen/BookingsScreen/Upcomingbooking';
import Historybooking from '../Screen/BookingsScreen/Historybooking';
import Currentbooking from '../Screen/BookingsScreen/Currentbooking';
import Privacypolicy from '../Screen/PrivacypolicyScreen/Privacypolicy';
import Options from '../Screen/Options/Options';
import Onboarding from '../Screen/Onboarding/Onboarding';
import Contactus from '../Screen/ContactusScreen/Contactus';
import Like from '../Screen/SearchedScreen/Like';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from "../Component/Drawer"
import { useTheme } from '../../Theme';


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator();
function MyTabs() {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    const themestyles = styles()
    return (
        <Tab.Navigator
            initialRouteName='Home'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.tabactive,
                tabBarInactiveTintColor: theme.tabunactive,
                tabBarIconStyle: { marginBottom: 20 },
                tabBarLabelStyle: { fontSize: 13, fontFamily: font.FontSemiBold, position: "absolute", bottom: 13 },
                tabBarStyle: [{ backgroundColor: theme.appback, elevation: -1, height: Platform.OS == "ios" ? 95 : 65, }],
            }}
        >
            <Tab.Screen name="home"
                options={{
                    headerShown: false,
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => {
                        return <Image source={require("../assets/image/Bottomtab/house.png")} style={focused ? themestyles.active : themestyles.inactive} />
                    },
                }} component={Home} />
            <Tab.Screen name="Favourite"
                options={{
                    headerShown: false,
                    title: "Favourite",
                    tabBarIcon: ({ color, focused }) => {
                        return <Image source={require("../assets/image/Bottomtab/heart.png")} style={focused ? themestyles.active : themestyles.inactive} />
                    },
                }} component={Like} />
            <Tab.Screen name="Bookings"
                options={{
                    headerShown: false,
                    title: "Booking",
                    tabBarIcon: ({ color, focused }) => {
                        return <Image source={require("../assets/image/Bottomtab/book.png")} style={focused ? themestyles.active : themestyles.inactive} />
                    },
                }} component={Bookings} />

            {/* <Tab.Screen name="Notification"
                options={{
                    headerShown: false,
                    title: "Notification",
                    tabBarIcon: ({ color, focused }) => {
                        return <Image source={require("../assets/image/Bottomtab/noti.png")} style={focused ? themestyles.active : themestyles.inactive} />
                    },
                }} component={Notification} /> */}

            <Tab.Screen name="Childs"
                options={{
                    headerShown: false,
                    title: "Pet Profile",
                    tabBarIcon: ({ color, focused }) => {
                        return <Image source={require("../assets/image/Bottomtab/child.png")} style={focused ? themestyles.active : themestyles.inactive} />
                    },
                }} component={Childs} />

            <Tab.Screen name="Profile"
                options={{
                    headerShown: false,
                    title: "Profile",
                    tabBarIcon: ({ color, focused }) => {
                        return <Image source={require("../assets/image/Profile/user.png")} style={focused ? themestyles.active : themestyles.inactive} />
                    },
                }} component={Profile} />
        </Tab.Navigator>
    );
}

function MyDrawer2() {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent type={global.type} {...props} />} animationDuration={200} screenOptions={{ headerShown: false, drawerStyle: { width: "65%", } }}>
            <Drawer.Screen name="Home2" component={MyTabs} />
        </Drawer.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer ref={navigationRef} >
            <Stack.Navigator screenOptions={{ headerShown: false, animation: "fade_from_bottom", animationDuration: 4000 }} initialRouteName="Welcome">
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Signup" component={Signup} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Forgotpassword" component={Forgotpassword} />
                <Stack.Screen name="Forgotpassword2" component={Forgotpassword2} />
                <Stack.Screen name="Otp" component={Otp} />
                <Stack.Screen name="Search" component={Search} />
                <Stack.Screen name="Map" component={Map} />
                <Stack.Screen name="EditProfile" component={EditProfile} />
                <Stack.Screen name="Changepass" component={Changepass} />
                <Stack.Screen name="Searched" component={Searched} />
                <Stack.Screen name="Booking" component={Booking} />
                <Stack.Screen name="Checkdetail" component={Checkdetail} />
                <Stack.Screen name="Addchild" component={Addchild} />
                <Stack.Screen name="Bookingdetail" component={Bookingdetail} />
                <Stack.Screen name="Home" component={MyDrawer2} />
                <Stack.Screen name="LiveScreen" component={LiveScreen} />
                <Stack.Screen name="Roomlocation" component={Roomlocation} />
                <Stack.Screen name="Upcomingbooking" component={Upcomingbooking} />
                <Stack.Screen name="Currentbooking" component={Currentbooking} />
                <Stack.Screen name="Historybooking" component={Historybooking} />
                <Stack.Screen name="Privacypolicy" component={Privacypolicy} />
                <Stack.Screen name="Contactus" component={Contactus} />
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Notification" component={Notification} />
                <Stack.Screen name="Options" component={Options} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = () => {
    const { theme, width, height, fontFamily, fontSize } = useTheme();
    return StyleSheet.create({
        active: {
            height: 22,
            width: 22,
            tintColor: theme.tabactive,
            resizeMode: "contain"
        },
        inactive: {
            height: 22,
            width: 22,
            tintColor: theme.tabunactive,
            resizeMode: "contain"
        }

    })
}
export default App;