/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import MyStack, { MyLoginStack } from './src/navigator/stackNavigation';
import MyDrawer from './src/navigator/drawerNavigation';
import { Provider } from "react-redux";
import store, { persistor } from './src/StoreRedux/Store';
import { PersistGate } from 'redux-persist/integration/react';
import { StripeProvider } from '@stripe/stripe-react-native';
import { colors } from './src/utils/constant/Colors';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: colors.YELLO_THEME_COLOR,
  };

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <StripeProvider
            publishableKey={'pk_live_51Ms1xKSI1qcmkbjNVAs4kqAxChHDxU9v8onSQsfOVeVtmT0zs9lclh8I1lhWIPhnCQkSsFftX2Ui6gkIMhnCf52g00yuA2WyAe'}
            merchantIdentifier="merchant.identifier" // required for Apple Pay
            urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
          >
            <NavigationContainer>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                // backgroundColor={backgroundStyle.backgroundColor}
              />
              {/* <MyStack /> */}
              <MyLoginStack />
              {/* <View
          style={{
            flex: 1, justifyContent: 'center', alignItems: "center",
          }}>
          <Text style={styles.highlight}>INDULGE</Text>
        </View> */}
            </NavigationContainer>
          </StripeProvider>
        </PersistGate>
      </Provider>

    </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
