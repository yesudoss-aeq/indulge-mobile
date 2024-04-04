import React, { useState } from 'react';
import { View, ImageBackground, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const IntroImageScreen = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigation = useNavigation();

    const images = [
        require('../../../../assets/intro/ACCESSGLOBALEVENTS.png'),
        require('../../../../assets/intro/AIRPORTPROTOCOLAPPSLIDE.png'),
        require('../../../../assets/intro/PrivacyAPPSLIDE.png'),
        require('../../../../assets/intro/AccessSlide.png')
    ];

    const onNextImage = () => {
        if (currentImageIndex === images.length - 1) {
            onSkip()
        } else {
            setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
        }
    };

    const onPreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const onSkip = () => {
        // Logic to handle skip button action, for example, navigate to the next screen
        navigation.reset({
            index: 0,
            routes: [{ name: 'WelComeScreen' }], //MyBottomTabs
        });
    };

    return (
        <View style={styles.container}>
            <ImageBackground source={images[currentImageIndex]} style={styles.imageBackground}>
                <TouchableOpacity onPress={onSkip} style={styles.skipButton}>
                    <Image source={require('../../../../assets/intro/SkipButtonImage.png')} style={styles.skipIcon} />
                </TouchableOpacity>
                {/* Other content on top of the background image */}
                <View style={styles.navigationContainer}>
                    <TouchableOpacity onPress={onPreviousImage}>
                        <Image source={require('../../../../assets/intro/BackArrow.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onNextImage}>
                        <Image source={require('../../../../assets/intro/BackArrow1.png')} style={styles.arrowIcon} />
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    imageBackground: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
    },
    skipButton: {
        position: 'absolute',
        top: 28,
        right: 5,
    },
    skipIcon: {
        width: 80,
        height: 36,
    },
    navigationContainer: {
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        bottom: 20,
        left: 0,
        right: 0,
    },
    arrowIcon: {
        width: 50,
        height: 50,
    },
});

export default IntroImageScreen;
