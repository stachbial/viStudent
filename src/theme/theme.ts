import { createTheme } from "@mui/material/styles";

import { Theme } from "@mui/material/styles";
export const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#323f52",
      main: "#5d6a7e",
      dark: "#0a1929",
    },
    secondary: {
      light: "#87c0c0",
      main: "#fafafa",
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


