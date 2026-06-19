import * as Notifications from "expo-notifications";
import { Platform } from "react-native";
import Axios from "axios";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function registerPushToken(): Promise<void> {
  if (Platform.OS === "web") return;

  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") return;

    const tokenData = await Notifications.getExpoPushTokenAsync({
      projectId: "d5569d2f-0ca9-4d7b-a8bf-7e4ff4f1319e",
    });
    const token = tokenData.data;

    await Axios.post("/me/push-token", { token });
  } catch (e) {
    // Firebase pas encore configuré ou permissions refusées — non bloquant
    console.warn("[PushNotification] Impossible d'enregistrer le token :", e);
  }
}
