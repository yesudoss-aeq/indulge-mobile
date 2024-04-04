import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Slider from '@react-native-community/slider';

const VideoProgressBar = ({ currentTime, totalTime, onSlideComplete, onValueChange }) => {
    // Calculate progress percentage
    const progress = (currentTime / totalTime) * 100;

    // Format time to display in minutes and seconds
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    return (
        <View style={styles.container}>
            <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={totalTime}
                value={currentTime}
                onSlidingComplete={onSlideComplete}
                onValueChange={onValueChange}
                minimumTrackTintColor="#FF5733"
                maximumTrackTintColor="#CCCCCC"
                thumbTintColor="#FF5733"
            />
            <View style={styles.timeContainer}>
                <Text style={styles.timeText}>{formatTime(currentTime)}</Text>
                <Text style={styles.timeText}>{formatTime(totalTime)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    slider: {
        width: '80%',
        marginBottom: 10,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    timeText: {
        color: '#FFFFFF',
    },
});

export default VideoProgressBar;
