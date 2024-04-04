import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import CalenderScreen from '../screen/calender/index';
import ConciergeScreen from '../screen/concierge/index';
import FeedScreen from '../screen/feedOld/index_Vertical_Flatlist';
import IndulgeAiScreen from '../screen/indulgeAi/index';
import TastesScreen from '../screen/tastes/index';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Image, Linking, Pressable } from 'react-native';
// import image from "../../assets/screen/Indulge_LOGO_ONLY.png""
import { useTheme } from 'react-native-paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeedDemo from '../screen/feed/index';

const Tab = createMaterialBottomTabNavigator();

type UserData = {
    whatsAppLink: string;
};

function MyBottomTabs() {
    const theme = useTheme();
    theme.colors.secondaryContainer = "transparent"

    const [storedPhoneNumber, setStoredPhoneNumber] = useState(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    // const [userData, setUserData] = useState(null);
    // const [userData, setUserData] = useState<{ whatsAppLink: string } | null>(null);


    // useEffect(() => {
    //     const getPhoneNumber = async () => {
    //         try {
    //             const storedNumber = await AsyncStorage.getItem("phoneNumber");
    //             console.log(storedNumber, "number...")
    //             if (storedNumber !== null) {
    //                 setStoredPhoneNumber(storedNumber);
    //             }
    //         } catch (error) {
    //             console.error('Error retrieving phone number:', error);
    //         }
    //     };

    //     getPhoneNumber();
    // }, []);

    useEffect(() => {
        const fetchData = async () => {
            const storedNumber = await AsyncStorage.getItem('phoneNumber');

            try {
                const response = await axios.get('https://www.indulge.blokxlab.com/get-whatsapp-group', {
                    params: {
                        mobile_no: storedNumber,
                    },
                });
                console.log(response.data, "responseData::::")
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        // if (storedPhoneNumber) {
        fetchData();
        // }
    }, []);



    return (
        <Tab.Navigator
            initialRouteName="Tastes"
            // labeled={false}
            // shifting={true} // Enable shifting behavior for icons and labels
            barStyle={{ backgroundColor: '#000000' }} // Customize the background color of the tab bar
            activeColor="#C4963D"
            inactiveColor="#ffffff"

            sceneAnimationEnabled={true}
            screenOptions={{
                // tabBarActiveTintColor: '#ffffff', // Set the active tab color
                // tabBarInactiveTintColor: '#808080', // Set the inactive tab color
                // tabBarLabelStyle: {
                //     display: "none"
                // },
                tabBarVisible: ({ route }) => {
                    if (route.name === 'Feed') {
                        return false;
                    }
                    return true;
                },
                tabBarLabelStyle: {
                    display: "none"
                },
                tabBarStyle: { height: 60 },
                activeBackgroundColor: 'transparent'
            }}
        >
            <Tab.Screen
                name="Tastes"
                component={TastesScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        // <Ionicons name="options-outline" size={26} color={color} />
                        <Image
                            source={require('../../assets/screen/FilterIconData.png')}
                            style={{
                                height: 30, width: 30, tintColor: color,
                            }}
                        />
                    ),
                    tabBarLabel: 'Tastes', // Set the label text
                }}

            />
            <Tab.Screen
                name="Calendar"
                component={CalenderScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        // <Ionicons name="calendar-outline" size={26} color={color} />
                        <Image
                            source={require('../../assets/screen/IconCalenderData.png')}
                            style={{
                                height: 30, width: 30, tintColor: color,
                            }}
                        />
                    ),
                    // tabBarColor: '#ffffff'
                }}
            />
            <Tab.Screen
                name="Feed"
                component={FeedScreen}
                // component={FeedDemo}

                options={{
                    // tabBarStyle: {
                    //     display: 'none',
                    // },
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={require('../../assets/screen/Indulge_LOGO_ONLY.png')}
                            style={{
                                height: 49, width: 49, tintColor: color, marginTop: -9
                            }}
                        />
                    ),
                    // tabBarColor: '#ffffff'
                }}
            />
            <Tab.Screen
                name="Indulge AI"
                component={IndulgeAiScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        // <Ionicons name="search-circle-outline" size={26} color={color} />
                        <Image
                            source={require('../../assets/screen/GinneyIconData.png')}
                            style={{
                                height: 38, width: 38, tintColor: color, marginTop: -5
                            }}
                        />
                    ),
                    // tabBarColor: '#ffffff'
                }}
            />
            <Tab.Screen
                name="Concierge"
                component={ConciergeScreen}
                options={{
                    tabBarIcon: ({ color }) => (
                        // <Ionicons name="logo-whatsapp" size={26} color={color} />

                        <Image
                            source={require('../../assets/screen/WhatsappIconData.png')}
                            style={{
                                height: 30, width: 30, tintColor: color,
                            }}
                        />

                    ),

                    // tabBarOnPress: () => handleWhatsAppOpen(),

                }}
                listeners={{
                    // tabPress: () => {
                    //     // Replace 'https://api.whatsapp.com/send?phone=123456789' with the actual WhatsApp link you want to open
                    //     Linking.openURL(userData.whatsAppLink);
                    // },
                }}
            />
        </Tab.Navigator>
    );
}

export default MyBottomTabs;
