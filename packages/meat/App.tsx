import "expo-dev-client";
import React from "react";
import { NativeBaseProvider } from "native-base";
import RootNavigator from "./navigators/RootNavigator";
import { theme as AppTheme } from "@hamburger/recipe";
import { extendTheme } from "native-base";
import { enableScreens } from "react-native-screens";
enableScreens();

const theme = extendTheme(AppTheme);

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <RootNavigator />
    </NativeBaseProvider>
  );
}
