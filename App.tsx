import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppComponent } from './src/App.component';
import Axios from "axios";
import config from "./app.json";
import { useFonts } from 'expo-font';


Axios.defaults.baseURL = "http://runeo.mycpnv.ch/api";

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
    <AppComponent/>
  );
}
