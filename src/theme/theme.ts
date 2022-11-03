import { createTheme } from "@mui/material/styles";

import { Theme } from "@mui/material/styles";
export const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#323f52",
      main: "#515966",
      dark: "#0a1929",
    },
    secondary: {
      light: "#87c0c0",
      main: "#c9e6e5",
      dark: "#1a2f4f",
    },
    grey: {
      "100": "#dbe5ea",
      "300": "#455a64",
      "800": "#21252B",
    },
  },
  components: {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          background: "#21252B",
        },
      },
    },
  },
});

export const histChartLineColors = ["#2b67e8", "#57bb7d", "#ba3e3e", "#000000"];
