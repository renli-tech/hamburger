import React from "react";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { HStack, Text } from "native-base";
import { TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const getTabIcon = (route: string): React.ReactNode => {
  if (route === "Home") {
    return <Feather name='home' size={20} />;
  }

  return <Feather name='search' size={20} />;
};

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <HStack
      backgroundColor='darkBlue.400'
      alignItems='center'
      justifyContent='space-evenly'
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const tabBarIcon = getTabIcon(route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole='button'
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              padding: 12,
              flexDirection: "column",
              alignItems: "center",
            }}
            key={index}
          >
            <Text style={{ color: isFocused ? "white" : "#333" }}>
              {tabBarIcon}
            </Text>
            <Text style={{ color: isFocused ? "white" : "#333" }}>{label}</Text>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
};
