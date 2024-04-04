import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PrivacyPolicyStyle from './style'
import { WebView } from 'react-native-webview';

const PrivacyPolicyScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <WebView
                source={{ uri: 'https://indulge.global/privacy-policy/' }}
            />

        </View>
    )
}
export default PrivacyPolicyScreen;
