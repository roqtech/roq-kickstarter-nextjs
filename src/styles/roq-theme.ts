import { createCustomTheme } from "@roq/nextjs";

export const roqThemeLight = createCustomTheme({
  name: "ROQ Custom Theme",
  base: {
    primary: "#A07EFF",
    secondary: "#CA58FF",
  },
  spacing: {
    borderRadius: "16px",
  },
  typography: {
    family: "'Lato', sans-serif",
  },
});
