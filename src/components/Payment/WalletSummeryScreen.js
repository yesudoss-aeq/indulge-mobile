import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Image, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import * as Font from 'expo-font';
// import fontName from '../assets/PFBeauSansPro-Reg_0.ttf';
// import fontBold from '../assets/PFBeauSansPro-Bold_0.ttf';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const WalletSummeryScreen = () => {
    const [isFontLoaded, setFontLoaded] = useState(false);
    const navigation = useNavigation();
    const [walletBalance, setWalletBalance] = useState(0)
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');

    useEffect(() => {
        const getPhoneNumber = async () => {
            try {
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
                if (storedNumber !== null) {
                    setStoredPhoneNumber(storedNumber);
                }
            } catch (error) {
                console.error('Error retrieving phone number:', error);
            }
        };

        getPhoneNumber();
    }, []);



    useEffect(() => {
        const fetchWalletBalance = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const storedNumber = await AsyncStorage.getItem('phoneNumber');
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
                    setWalletBalance(updatedBalance || 0);
                } else {
                    console.error('Stored phone number is undefined');
                    Alert.alert('Error', 'Stored phone number is undefined');
                }
            } catch (error) {
                console.error('Error fetching wallet balance:', error);
                Alert.alert('Error', 'Failed to fetch wallet balance.');
            }
        };

        fetchWalletBalance();
    }, []);


    //add font-family
    useEffect(() => {
        const loadFont = async () => {
            await Font.loadAsync({
                'YourFont-Regular': fontName,
                'YourFont-Bold': fontBold
            });
            setFontLoaded(true);
        };
        loadFont();
    }, []);

    if (!isFontLoaded) {
        return null;
    }

    const handleTopUpScreen = () => {
        navigation.navigate('TopupScreen')
    }


    return (
        <View style={styles.container}>
            <View
                style={styles.sideBar}>
                <Pressable >
                    <Ionicons name="person-outline" size={35} color="white" style={{ marginTop: '45%', marginLeft: '3%' }} />
                </Pressable>
                <Image style={styles.notificationIcon} source={require("../../../assets/drawer/payment/Notification-icon.png")} />
            </View>
            <View>
                <Text style={styles.buyText}>Wallet Summery</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <View style={{ marginTop: '17%', marginLeft: '5%', }}>
                    <Text style={styles.currentBalanceText}>Current Balance</Text>
                    <Text style={styles.rupeeText}>Rs.{walletBalance}</Text>
                </View>
                <View>
                    <Pressable style={styles.topUpButton} onPress={handleTopUpScreen}>
                        <Text style={styles.topUpText}>Top Up Now</Text>
                    </Pressable>
                </View>
            </View>
            <Pressable style={styles.transferButton}>
                <Text style={styles.transitionText}>Confirm</Text>
            </Pressable>
        </View>
    )
}
export default WalletSummeryScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000'
    },
    sideBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        zIndex: 1,
        padding: 10,
    },
    notificationIcon: {
        tintColor: '#FFFFFF',
        marginTop: '6%',
        marginLeft: '60%',
        width: 40,
        height: 40
    },
    buyText: {
        color: '#FFFFFF',
        marginTop: '20%',
        textAlign: 'center',
        fontSize: 18,
        fontFamily: 'YourFont-Regular'
    },
    currentBalanceText: {
        color: '#FFFFFF',
        fontFamily: 'YourFont-Regular',
        fontSize: 15
    },
    rupeeText: {
        color: '#FFFFFF',
        fontFamily: 'YourFont-Bold',
        fontSize: 25
    },
    topUpButton: {
        backgroundColor: '#C4963D',
        width: 144,
        height: 42,
        borderRadius: 200,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '35%',
        marginLeft: '20%'
    },
    topUpText: {
        fontFamily: 'YourFont-Regular',
        fontSize: 17
    },
    transitionButton: {
        backgroundColor: '#282828',
        width: 333,
        height: 50.82,
        marginTop: '30%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '10%',
        borderRadius: 10
    },
    transitionText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '500',
        fontFamily: 'YourFont-Regular',
    },
    transferButton: {
        backgroundColor: '#282828',
        width: 333,
        height: 50.82,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        marginRight: '10%',
        borderRadius: 10,
        marginTop: '7%'
    }
})