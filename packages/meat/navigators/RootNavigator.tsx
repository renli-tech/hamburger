import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  StackNavigationOptions,
} from "@react-navigation/stack";
import { RouteProp } from "@react-navigation/core";
import React from "react";
import { View } from "react-native";
import AuthNavigator from "./AuthNavigator";
import MainNavigator from "./MainNavigator";
import { StatusBar } from "native-base";

export type RootNavigatorScreenList = {
  Auth: undefined;
  Main: undefined;
};

const Stack = createStackNavigator<RootNavigatorScreenList>();

export const navigationOptions:
  | StackNavigationOptions
  | ((props: {
      route: RouteProp<RootNavigatorScreenList, keyof RootNavigatorScreenList>;
      navigation: any;
    }) => StackNavigationOptions)
  | undefined = {
  headerShown: false,
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: {
        opacity: progress,
      },
    };
  },
  cardOverlay: () => {
    return (
      <View
        style={{
          flex: 1,
        }}
      ></View>
    );
  },
};

export const RootNavigator: React.FC<unknown> = () => {
  return (
    <NavigationContainer>
      <StatusBar />
      <Stack.Navigator screenOptions={navigationOptions}>
        <Stack.Screen name='Main' component={MainNavigator} />
        <Stack.Screen name='Auth' component={AuthNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
