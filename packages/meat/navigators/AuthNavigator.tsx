import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Login } from "../screens";

export type RootNavigatorScreenList = {
  Login: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootNavigatorScreenList>();

const AuthNavigator: React.FC<unknown> = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
