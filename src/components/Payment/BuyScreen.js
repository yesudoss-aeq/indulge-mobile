import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
import Ionicons from 'react-native-vector-icons/Ionicons';

// import * as Font from 'expo-font';
// import fontName from '../../../assets/drawer/payment/PFBeauSansPro-Reg_0.ttf'



const BuyScreen = () => {
    const [isFontLoaded, setFontLoaded] = useState(false);

    //add font-family
    useEffect(() => {
        // const loadFont = async () => {
        //     await Font.loadAsync({
        //         'YourFont-Regular': fontName,
        //     });
        //     setFontLoaded(true);
        // };
        // loadFont();
    }, []);

    // if (!isFontLoaded) {
    //     return null;
    // }
    return (
        <View style={styles.container}>
            <View
                style={styles.sideBar}>
                <Pressable >
                    <Ionicons name="person-outline" size={35} color="white" style={{ marginTop: '44%', marginLeft: '3%'}} />
                </Pressable>
                <Image style={styles.notificationIcon} source={require("../../../assets/drawer/payment/Notification-icon.png")} />
            </View>
            <View>
                <Text style={styles.buyText}>Buy</Text>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/drawer/payment/image1.png')} style={{ width: 44.56, height: 42, borderRadius: 5, marginTop: '3%', marginLeft: '3%' }} />
                    <Text style={{ marginTop: '3%', marginLeft: '2%' }}>
                        <Text style={styles.text1}>Emerald Pendant Set</Text>
                        {"\n"}
                        <Text style={styles.text2}>Luxury Goods</Text>
                    </Text>
                    <View style={{ marginTop: '3%', marginLeft: '10%' }}>
                        <Text style={styles.text3}>Rs. 5,025</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.invoiceText}>Invoice</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <Image source={require('../../../assets/drawer/payment/image1.png')} style={{ width: 44.56, height: 42, borderRadius: 5, marginTop: '3%', marginLeft: '3%' }} />
                    <Text style={{ marginTop: '3%', marginLeft: '2%' }}>
                        <Text style={styles.text1}>Emerald Pendant Set</Text>
                        {"\n"}
                        <Text style={styles.text2}>Luxury Goods</Text>
                    </Text>
                    <View style={{ marginTop: '3%', marginLeft: '10%' }}>
                        <Text style={styles.text3}>Rs. 5,025</Text>
                        <View style={{ alignItems: 'flex-end' }}>
                            <Text style={styles.invoiceText}>Invoice</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: '10%', marginRight: '8%' }}>
                <Text style={styles.totalText}>Total </Text>
                <Text style={styles.totalAmount}>10,050</Text>
            </View>
            <View style={{ marginTop: '10%' }}>
                <Pressable style={styles.walletButton}>
                    <Text style={styles.walletText}>Buy</Text>
                </Pressable>
            </View>
        </View>
    )

}
export default BuyScreen;

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
        width:40,
        height:40
    },
    buyText: {
        color: '#FFFFFF',
        marginTop: '20%',
        textAlign: 'center',
        fontSize: 20,
        fontFamily: 'YourFont-Regular'
    },
    card: {
        borderRadius: 20,
        borderColor: "#282828",
        width: 333,
        height: 68.29,
        marginLeft: 10,
        borderWidth: 1,
        borderColor: "#282828",
        elevation: 5,
        backgroundColor: "#282828",
        marginTop: '15%',
    },
    text1: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'YourFont-Regular',
        fontWeight: '500'
    },
    text2: {
        color: '#C4963D',
        fontSize: 14,
        fontFamily: 'YourFont-Regular',
        fontWeight: '500',
        marginStart: '2%'
    },
    invoiceText: {
        color: '#C4963D',
        fontSize: 14,
        fontFamily: 'YourFont-Regular',
        alignItems: 'flex-end'
    },
    text3: {
        color: '#FFFFFF',
        fontSize: 16,
        fontFamily: 'YourFont-Regular',
        fontWeight: '500'
    },
    totalText: {
        color: '#FFFFFF',
        fontSize: 20,
        textAlign: 'right',
        fontFamily: 'YourFont-Regular',
        fontWeight: '500'
    },
    totalAmount: {
        color: '#C4963D',
        fontSize: 20,
        fontFamily: 'YourFont-Regular',
        fontWeight: '500',
        textAlign: 'right',

    },
    walletText: {
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '500',
        fontFamily: 'YourFont-Regular',
    },
    walletButton: {
        backgroundColor: '#282828',
        width: 333,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: '5%',
        borderRadius: 10,
    },
})