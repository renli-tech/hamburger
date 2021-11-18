import { useColorMode } from "native-base";

export const _dark = {
  backgroundColor: "blueGray.900",
};
export const _light = {
  backgroundColor: "coolGray.100",
};

export const useTheme = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const theme = colorMode === "light" ? _light : _dark;

  return { theme, toggleTheme: toggleColorMode };
};
