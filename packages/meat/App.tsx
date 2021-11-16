import "expo-dev-client";
import { NativeBaseProvider, extendTheme } from "native-base";
import React from "react";
import RootNavigator from "./navigators/RootNavigator";
import { theme } from "@hamburger/recipe";

const App: React.FC<unknown> = () => {
  return (
    <NativeBaseProvider theme={extendTheme(theme)}>
      <RootNavigator />
    </NativeBaseProvider>
  );
};

export default App;
