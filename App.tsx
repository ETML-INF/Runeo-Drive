import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppComponent } from './src/App.component';
import Axios from "axios";
import config from "./app.json";


Axios.defaults.baseURL = config.expo.apiUrl;

export default function App() {
  return (
    <AppComponent/>
  );
}
