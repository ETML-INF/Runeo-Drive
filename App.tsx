/**
 *   Modified by: Clément Sartoni
 *   Modified time: 2023-05-22 13:47:47
 *   Description: Transformé la manière de gérer l'URL en ajoutant la possibilité de renseigner plusieurs festivals
 *   parmis lesquels l'utilisateur peut choisir. (il peut aussi renseigner un URL manuellement).
 */


import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Platform } from 'react-native';
import { AppComponent } from './src/App.component';
import Axios from "axios";
import { useFonts } from 'expo-font';
import { RootSiblingParent } from 'react-native-root-siblings';
import Constants from 'expo-constants';

// Le paramétrage concernant les URLs par défaut utilisés par l'application a été transformé sous la forme suivante pour
// pouvoir accepter plusieurs festivals ou pouvoir rentrer une IP personnalisée pour le débug (Autre). 
// Laisser la valeur de l'option "Autre" vide pour que le champ "url" aparaisse. 
export const urlConfigData = [
  { label: 'Paléo', value: 'http://runeo.paleo.ch/api' },
  { label: 'Belfort', value: 'https://runeurock.eurockeennes.fr/api' },
  { label: 'Autre', value: '' }
];

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
    marginTop: 0,
    //marginTop: (Platform.OS === 'ios') ? 0 : Constants.statusBarHeight,
  },
});
