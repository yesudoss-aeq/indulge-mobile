import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TopupScreen from '../components/Payment/TopupScreen';
import CalenderScreen from '../screen/calender/index';
import AccountsScreen from '../screen/drawer/accounts/index';
import BookingScreen from '../screen/drawer/booking/index';
import FavoriteScreen from '../screen/drawer/favorites/index';
import PrivacyPolicyScreen from '../screen/drawer/privacyPolicy/index';
import ProfileScreen from '../screen/drawer/profile/index';
import TermAndConditionsScreen from '../screen/drawer/termAndConditions/index';
import BenifitScreen from '../screen/login/BenifitScreen/index';
import ContactConciergePage from '../screen/login/ContactConciergePage/index';
import IntroImageScreen from '../screen/login/IntroImage/index';
import IntroVideoScreen from '../screen/login/introVideoScreen/index';
import LoginMainScreen from '../screen/login/LoginMainScreen/index';
import OtpScreen from '../screen/login/OtpScreen/index';
import RegisterOtpScreen from '../screen/login/RegisterOtpScreen/index';
import RegisterScreen from '../screen/login/RegisterScreen/index';
import WelcomeScreen from '../screen/login/WelcomeScreen/index';
import MyBottomTabs from './bottomTabNavigation';
import MyDrawer from './drawerNavigation';


const Stack = createNativeStackNavigator();

const MyStack = () => {
    return (
        <Stack.Navigator initialRouteName={'MyBottomTabs'}>
            {/* <Stack.Screen name="IntroVideo" component={IntroVideoScreen} options={{
                headerShown: false,
                drawerLockMode: 'locked-closed'

            }} />
            <Stack.Screen name="IntroImage" component={IntroImageScreen} options={{
                headerShown: false,
                gestureEnabled: false,
                drawerLockMode: 'locked-closed'

            }} />
            <Stack.Screen name="WelComeScreen" component={WelcomeScreen} options={{
                headerShown: false,
                drawerLockMode: 'locked-closed'

            }} /> */}

            <Stack.Screen name="MyBottomTabs" component={MyBottomTabs} options={{
                headerShown: false
            }} />
            {/* <Stack.Screen name="LoginMainScreen" component={LoginMainScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="BenifitScreen" component={BenifitScreen} options={{
                headerShown: false
            }} />
            <Stack.Screen name="OtpScreen" component={OtpScreen} options={{
                headerShown: false
            }} /> */}
            <Stack.Screen name="TopupScreen" component={TopupScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
            <Stack.Screen name="Favorites" component={FavoriteScreen} />
            <Stack.Screen name="Calender" component={CalenderScreen} />
            <Stack.Screen name="Accounts" component={AccountsScreen} />
            <Stack.Screen name="Booking" component={BookingScreen} />
            <Stack.Screen name="Terms & Conditions" component={TermAndConditionsScreen} />
            <Stack.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />

            {/*  <Stack.Screen name="Indulge Ai" component={IndulgeAiScreen} />
            <Stack.Screen name="Concierge" component={ConciergeScreen} /> */}
        </Stack.Navigator>
    );
}

const LoginStack = createNativeStackNavigator();


export const MyLoginStack = () => {
    return (
        <Stack.Navigator initialRouteName={'IntroVideo'}>
            <LoginStack.Screen name="IntroVideo" component={IntroVideoScreen} options={{
                headerShown: false,
                // drawerLockMode: 'locked-closed'

            }} />
            <LoginStack.Screen name="IntroImage" component={IntroImageScreen} options={{
                headerShown: false,
                // gestureEnabled: false,
                // drawerLockMode: 'locked-closed'

            }} />
            <LoginStack.Screen name="MyStack" component={MyStack} options={{
                headerShown: false,
                // gestureEnabled: false,
                // drawerLockMode: 'locked-closed'

            }} />
            <LoginStack.Screen name="WelComeScreen" component={WelcomeScreen} options={{
                headerShown: false,
                // drawerLockMode: 'locked-closed'

            }} />
            <LoginStack.Screen name="MyDrawer" component={MyDrawer} options={{
                headerShown: false
            }} />
            <LoginStack.Screen name="LoginMainScreen" component={LoginMainScreen} options={{
                headerShown: false
            }} />
            <LoginStack.Screen name="RegisterScreen" component={RegisterScreen} options={{
                headerShown: false
            }} />
            <LoginStack.Screen name="BenifitScreen" component={BenifitScreen} options={{
                headerShown: false
            }} />
            <LoginStack.Screen name="OtpScreen" component={OtpScreen} options={{
                headerShown: false
            }} />
            <LoginStack.Screen name="RegisterOtpScreen" component={RegisterOtpScreen} options={{
                headerShown: false
            }} />
            <LoginStack.Screen name="ContactConciergePage" component={ContactConciergePage} options={{
                headerShown: false
            }} />
        </Stack.Navigator>
    )
}
export default MyStack