import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { AppComponent } from './src/App.component';
import Axios from "axios";
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';

Axios.defaults.baseURL = "https://runeo.mycpnv.ch/api";

export default function App() {
  const [loaded] = useFonts({
    "Montserrat-ExtraBold": require('./assets/fonts/Montserrat-ExtraBold.ttf'),
    "Montserrat-Medium": require('./assets/fonts/Montserrat-Medium.ttf'),
    "Montserrat-Regular": require('./assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-SemiBold": require('./assets/fonts/Montserrat-SemiBold.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <AppComponent/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? 0 : Constants.statusBarHeight,
  },
});
