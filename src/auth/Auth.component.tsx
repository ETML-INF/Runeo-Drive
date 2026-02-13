import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { TokenAuthComponent } from "./TokenAuth.component";

export function AuthComponent() {
  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.textCenter}>
        <Text style={{ fontFamily: "Montserrat-SemiBold", fontSize: 30, marginBottom: 50 }}>Runeo Drive</Text>
      </View>
      <TokenAuthComponent />
      <Text style={styles.version}>2026.1.0</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    margin: 30
  },
  textCenter: {
    flexDirection: "row",
    justifyContent: "center"
  },
  version: {
    textAlign: "right",
    color: "#ddd",
    marginTop: "auto"
  }
});
