
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccountsStyle from './style'

const AccountsScreen = () => {
    const [userData, setUserData] = useState(null);
    const [storedPhoneNumber, setStoredPhoneNumber] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.indulge.blokxlab.com/get-zoho-link', {
                    params: {
                        mobile_no: storedPhoneNumber,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (storedPhoneNumber) {
            fetchData();
        }
    }, [storedPhoneNumber]);
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

    return (
        <View style={{ flex: 1 }}>
            {userData && userData.zoho_Link && (
                <WebView
                    source={{ uri: userData.zoho_Link }}
                    style={{ flex: 1 }}
                />
            )}
        </View>
    );
};

export default AccountsScreen;
