// import { NativeBaseProvider } from "native-base";
import React from "react";
import RootNavigator from "./navigators/RootNavigator";
import { theme as AppTheme } from "@hamburger/recipe";
import { extendTheme } from "native-base";

const theme = extendTheme(AppTheme);

export default function App() {
  console.log(theme);
  return <RootNavigator />;
}
