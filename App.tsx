/**
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-03-24 15:28:12
 *   Description: J'ai déplacé la possibilité de choisir l'URL du backend par défaut dans
 *   le fichier ./src/auth/TokenAuth.component.tsx, tout en ajoutant la possibilité de renseigner plusieurs festivals
 *   parmis lesquels l'utilisateur peut choisir. (il peut aussi renseigner un URL manuellement).
 */


import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { AppComponent } from './src/App.component';
import Axios from "axios";
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import Constants from 'expo-constants';

// Le paramétrage concernant les URLs par défaut utilisés par l'application a été déplacé dans le fichier suivant :
// './src/auth/TokenAuth.component.tsx'

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
    <RootSiblingParent>
      <SafeAreaView style={styles.container}>
        <AppComponent/>
      </SafeAreaView>
    </RootSiblingParent>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: (Platform.OS === 'ios') ? 0 : Constants.statusBarHeight,
  },
});
