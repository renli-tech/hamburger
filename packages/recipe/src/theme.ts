import { colors } from "./colors";

export const theme = {
  colors: colors,
  config: {
    // Changing initialColorMode to 'dark'
    initialColorMode: "dark",
  },
} as const;

export type Theme = keyof typeof theme;
