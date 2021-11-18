import React from "react";
import { Switch, useColorMode } from "native-base";
import { SwitchChangeEvent } from "react-native";

export interface ThemeToggleProps {
  onChange?: ((event: SwitchChangeEvent) => void | Promise<void>) | null;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = (props) => {
  const { onChange } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Switch
      isChecked={colorMode === "light"}
      onToggle={toggleColorMode}
      onChange={onChange}
    />
  );
};
