import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home, Search } from "../screens";
import { BottomTabBar } from "../components";

export type RootNavigatorScreenList = {
  Home: undefined;
  Search: undefined;
};

const Tab = createBottomTabNavigator<RootNavigatorScreenList>();

const MainNavigator: React.FC<unknown> = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <BottomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='Search' component={Search} />
    </Tab.Navigator>
  );
};

export default MainNavigator;
