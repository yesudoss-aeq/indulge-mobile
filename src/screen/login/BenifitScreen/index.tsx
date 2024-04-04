import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const BenifitScreen = () => {
    const navigation = useNavigation();

    const handleBackDrawerScreen = () => {
        navigation.navigate("WelComeScreen");
    };

    return (
        <View style={styles.container}>
            {/* Background Image */}
            <Image
                source={require('../../../../assets/intro/BENEFITSPAGEEE.png')}
                style={styles.backgroundImage}
            />
            {/* Back Arrow */}
            <TouchableOpacity style={styles.backButton} onPress={handleBackDrawerScreen}>
                <Image source={require('../../../../assets/intro/WhiteBackArrow.png')} />
            </TouchableOpacity>
            {/* Screen Title */}
            {/* <Text style={styles.screenTitle}>Benefit</Text> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        zIndex: -1,
    },
    backButton: {
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1,
    },
    screenTitle: {
        color: '#FFFFFF',
        fontSize: 16,
        position: 'absolute',
        top: 20,
        left: 50, // Adjust this value to position the title relative to the back button
        zIndex: 1,
    },
});

export default BenifitScreen;
