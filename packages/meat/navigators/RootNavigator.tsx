import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";

export type RootNavigatorScreenList = {
  Main: undefined;
  Auth: undefined;
};

const Stack = createStackNavigator<RootNavigatorScreenList>();

export const RootNavigator: React.FC<unknown> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name='Auth' component={AuthNavigator} />
        <Stack.Screen name='Main' component={MainNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
