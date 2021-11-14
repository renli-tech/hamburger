import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens";

export type RootNavigatorScreenList = {
  Home: undefined;
};

const Stack = createStackNavigator<RootNavigatorScreenList>();

const MainNavigator: React.FC<unknown> = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
