import "expo-dev-client";
import { NativeBaseProvider } from "native-base";
import React from "react";
import RootNavigator from "RootNavigator";

const App: React.FC<unknown> = () => {
  return (
    <NativeBaseProvider>
      <RootNavigator />
    </NativeBaseProvider>
  );
};

export default App;
