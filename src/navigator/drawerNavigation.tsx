import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Pressable, Image, StyleSheet, FlatList, Alert, } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme, useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import MyBottomTabs from './bottomTabNavigation';
import MyStack from './stackNavigation';
import axios from "axios";

// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define custom drawer content
const CustomDrawerContent = () => {
    const { colors } = useTheme();
    // const dispatch = useDispatch();
    // const userName = useSelector(state => state.user.name);
    // const walletAmount = useSelector(state => state.wallet.amount);
    const navigation = useNavigation();
    const [darkMode, setDarkMode] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [walletBalance, setWalletBalance] = useState(0)
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');

    const toggleTheme = () => {
        // Implement your theme toggling logic here
    };

    const editProfile = () => {
        // Navigate to edit profile screen
        navigation.navigate('EditProfile');
    };

    const addAmount = () => {
        // Navigate to add amount screen
        navigation.navigate('AddAmount');
    };

    const fetchWalletBalance = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const storedNumber = await AsyncStorage.getItem('phoneNumber');
            console.log("token:::", token, "storedNumber:::", storedNumber)
            if (storedNumber) {
                const response = await axios.get("https://www.indulge.blokxlab.com/get-wallet-balance", {
                    params: {
                        mobile_no: storedNumber,
                    },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const updatedBalance = response.data.customer_balance;
                setWalletBalance(updatedBalance);
            } else {
                console.error('Stored phone number is undefined');
                Alert.alert('Error', 'Stored phone number is undefined');
            }
        } catch (error) {
            console.error('Error fetching wallet balance:', error);
            Alert.alert('Error', 'Failed to fetch wallet balance.');
        }
    };
    useEffect(() => {
        const fetchProfileDetails = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                console.log("token:1111::", token, "storedNumber:1111::", storedNumber)

                if (storedNumber) {
                    const response = await axios.get("https://www.indulge.blokxlab.com/get-profile-details", {
                        params: {
                            mobile_no: storedNumber,
                        },
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const { name } = response.data;
                    console.log(response.data, "profile response");
                    setProfileName(name);
                } else {
                    console.error('Stored phone number is undefined');
                }
            } catch (error) {
                console.error('Error fetching profile details:', error);
            }
        };
        fetchProfileDetails()
        fetchWalletBalance();
    }, []);
    const closeDrawer = () => {
        // navigation.closeDrawer();
        navigation.dispatch(DrawerActions.closeDrawer())

    };
    const data = [
        { id: '1', title: 'Profile', icon: require('../../assets/drawer/ProfileIconImage.png') },
        { id: '2', title: 'Favorites', icon: require('../../assets/drawer/FavoriteIcon.png') },
        // { id: '3', title: 'Calender', icon: require('../../assets/drawer/CalIconImage.png') },
        // { id: '4', title: 'Accounts', icon: require('../../assets/drawer/CalIconImage.png') },
        // { id: '5', title: 'Booking', icon: require('../../assets/drawer/BookIngIconImage.png') },
        { id: '6', title: 'Terms & Conditions', icon: require('../../assets/drawer/TermImageIcon.png') },
        { id: '7', title: 'Privacy Policy', icon: require('../../assets/drawer/TermImageIcon.png') },
        { id: '8', title: 'Logout', icon: require('../../assets/drawer/TermImageIcon.png') }
    ];
    const logout = async () => {

        await AsyncStorage.setItem('token', "");
        await AsyncStorage.setItem('profilePictureURI', "");
        await AsyncStorage.setItem('phoneNumber', "")
        navigation.reset({
            index: 0,
            routes: [{ name: 'WelComeScreen' }],
        })
        closeDrawer()
    }
    const showLogoutConfirmationAlert = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "Logout", onPress: () => logout(),
                    style: 'destructive',
                },
            ]
        );
    }
    const onPressMenu = (item) => {
        if (item.title === "Logout") {
            showLogoutConfirmationAlert()
        }
        else {
            navigation.navigate(item.title)
        }

    }
    const handleProfileScreen = () => {
        navigation.navigate("Profile")
    }
    const handleWalletScreen = () => {
        navigation.navigate('TopupScreen')
    }
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.itemContainer} onPress={() => onPressMenu(item)}>
            <Image source={item.icon} style={styles.icon} />
            <Text style={styles.title}>{item.title}</Text>
        </TouchableOpacity>
    );
    return (
        <View style={{ flex: 1, backgroundColor: '#000000' }}>
            <View style={{ backgroundColor: darkMode ? colors.background : '#202020', borderBottomRightRadius: 20, borderBottomLeftRadius: 20, height: 240, marginBottom: 10 }}>
                <Pressable style={{ marginTop: 20, marginLeft: 10 }} onPress={closeDrawer}>
                    <Image style={{ width: 42, height: 42 }} source={require('../../assets/drawer/Close.png')} />
                </Pressable>
                <View style={{ marginTop: 40, marginLeft: 20, marginRight: 25, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={styles.profileText}>{profileName}</Text>
                    <Pressable style={{}} onPress={handleProfileScreen}
                    >
                        <Image source={require('../../assets/drawer/EditImageIcon.png')} />
                    </Pressable>
                </View>
                <View style={{ marginTop: 35, marginRight: 25, marginLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* <View style={{}}>
                        <Text style={styles.walletText}>Wallet</Text>
                        <Text style={styles.priceText}>₹ {walletBalance}</Text>
                    </View> */}
                    {/* <TouchableOpacity style={{ paddingHorizontal: 16, borderRadius: 12, padding: 10, backgroundColor: '#D39F3A' }} onPress={handleWalletScreen}>
                        <Text style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: '#000000',
                            // lineHeight: 32
                        }}>Add</Text>
                    </TouchableOpacity> */}
                </View>
            </View>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

// Create drawer navigator
const Drawer = createDrawerNavigator();

const MyDrawer = () => {
    return (
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
            <Drawer.Screen name="Stack" component={MyStack} options={{ headerShown: false }} />
            {/* Add more screens as needed */}
        </Drawer.Navigator>
    );
};
export default MyDrawer;


const styles = StyleSheet.create({
    crossImage: {
        marginLeft: 20,
        marginTop: 38
    },
    profileText: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: '700',
        // marginLeft: 30
    },
    walletText: {
        fontSize: 16,
        fontWeight: '300',
        color: '#FFFFFF',
        lineHeight: 24
    },
    priceText: {
        fontSize: 20,
        fontWeight: '900',
        color: '#FFFFFF',
        lineHeight: 24
    },
    addButton: {
        width: 64,
        height: 36
    },
    editableText: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingLeft: 10
    },
    logoutText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'YourFont-Regular',
        textAlign: 'left'
    },
    logoutImage: {
        width: 18,
        height: 19.17,
        marginRight: 12
    },
    logoutButton: {
        backgroundColor: '#20202080',
        width: 250,
        height: 42,
        borderRadius: 8,
        alignSelf: 'center',
        padding: 10,
        flexDirection: 'row',
        marginTop: '3%'
    },
    favouriteImage: {
        width: 23,
        height: 19.17,
        marginRight: 10
    },
    profileImage: {
        width: 18.86,
        height: 19.17,
        marginRight: 15
    },
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#181818',
        margin: 10,
        borderRadius: 8,
    },
    icon: {
        width: 20,
        height: 20,
        marginRight: 10
    },
    title: {
        fontSize: 16,
        fontWeight: '400',
        color: '#FFFFFF',
        lineHeight: 20
    },

}) 
