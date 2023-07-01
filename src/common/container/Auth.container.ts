/**
 * @ Modified by: Clément Sartoni
 * @ Modified time: 2023-03-24 08:45:23
 * @ Description: added the URL as a variable to get from the TokenAuth component,
 * and the distinction between rejection and network errors.
 */

import { useState } from "react";
import { UserResource } from "../resources/User.resource";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Axios from "axios";
import { Container } from "unstated-next";
import { NetworkContainer } from "./Network.container";
import { clearCaches } from "../utils/Cache.utils";
import parseErrorStack from "react-native/Libraries/Core/Devtools/parseErrorStack";

const TOKEN_STORAGE_KEY = "apiToken";
const URL_STORAGE_KEY = "apiUrl";
const USER_STORAGE_KEY = "authenticatedUser";

export interface AuthContainer {
  authenticatedUser: UserResource | null;
  authenticate: (values: { token: string; url: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshAuthenticated: () => Promise<void>;
  refreshUserStatus: () => Promise<void>;
}

export function useAuthContainer(networkContainer: Container<NetworkContainer>) {
  return (): AuthContainer => {
    const network = networkContainer.useContainer();

    const [authenticatedUser, setAuthenticatedUser] = useState<UserResource | null>(null);

    const authenticate = async (values: { token: string; url: string }): Promise<void> => {
      await AsyncStorage.setItem(TOKEN_STORAGE_KEY, values.token);
      await AsyncStorage.setItem(URL_STORAGE_KEY, values.url);

      return refreshAuthenticated();
    };

    const refreshAuthenticated = async (): Promise<void> => {
      const token = await AsyncStorage.getItem(TOKEN_STORAGE_KEY);
      const url = await AsyncStorage.getItem(URL_STORAGE_KEY);

      if (token && url) {
        Axios.defaults.headers.common = {
          Authorization: `Bearer ${token}`,
          Accept: "application/json"
        };

        try {
          Axios.defaults.baseURL = url;
          const user = await getAuthenticatedUserApi();
          await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
          setAuthenticatedUser(user);
        } catch (e) {
          console.log(e);
          throw e;
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

    function refreshUserStatus(): Promise<void> {
      return getAuthenticatedUserApi()
        .then((user: UserResource) => setAuthenticatedUser(user))
        .catch((e) => {
          console.log("error while updating user:  " + e);
          throw e;
        });
    }

    return {
      authenticatedUser,
      authenticate,
      logout,
      refreshAuthenticated,
      refreshUserStatus
    };
  };
}

function getAuthenticatedUserApi(): Promise<UserResource> {
  return Axios.get<UserResource>("/me", { timeout: 10000 }).then((res) => res.data);
}
