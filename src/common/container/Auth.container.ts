import { useState } from "react";
import { UserResource } from "../resources/User.resource";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { Container } from "unstated-next";
import { NetworkContainer } from "./Network.container";
import { clearCaches } from "../utils/Cache.utils";

const TOKEN_STORAGE_KEY = "apiToken";
const USER_STORAGE_KEY = "authenticatedUser";

export interface AuthContainer {
  authenticatedUser: UserResource | null;
  authenticate: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthenticated: () => Promise<void>;
}

export function useAuthContainer(
  networkContainer: Container<NetworkContainer>
) {
  return (): AuthContainer => {
    const network = networkContainer.useContainer();

    const [authenticatedUser, setAuthenticatedUser] =
      useState<UserResource | null>(null);

    const authenticate = async (token: string): Promise<void> => {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, token);

      return refreshAuthenticated();
    };

    const refreshAuthenticated = async (): Promise<void> => {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);

      if (token) {
        Axios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        };

        try {
          const user = await getAuthenticatedUserApi();
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
          setAuthenticatedUser(user);
        } catch (e) {
          console.log(e);
          await logout();
          throw new Error();
        }
      }
    };

    const logout = async () => {
      clearCaches().finally(() => {
        AsyncStorage.removeItem(TOKEN_STORAGE_KEY);
        AsyncStorage.removeItem(USER_STORAGE_KEY);
      });
      setAuthenticatedUser(null);
    };

    return {
      authenticatedUser,
      authenticate,
      logout,
      refreshAuthenticated,
    };
  };
}

function getAuthenticatedUserApi(): Promise<UserResource> {
  return Axios.get<UserResource>("/me").then((res) => res.data);
}
