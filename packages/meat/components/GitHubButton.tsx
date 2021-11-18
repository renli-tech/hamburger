import { Pressable, Text } from "native-base";
import React from "react";
import { Feather } from "@expo/vector-icons";
import { Linking } from "react-native";

export const GitHubButton = () => {
  return (
    <Pressable
      flexDirection='row'
      background='black'
      py='2'
      px='3'
      my='2'
      rounded='md'
      onPress={() => Linking.openURL("https://github.com/renli-tech/hamburger")}
    >
      <Text mr='2' color='white'>
        Github
      </Text>
      <Text color='white'>
        <Feather
          name='github'
          size={20}
          style={{
            padding: 10,
          }}
        />
      </Text>
    </Pressable>
  );
};
