import { createTheme } from "@mui/material/styles";
import { Theme } from "@mui/material/styles";
export const theme: Theme = createTheme({
  palette: {
    primary: {
      light: "#323f52",
      main: "#5d6a7e",
      dark: "#0a1929",
    },
    secondary: {
      light: "#b0ffff",
      main: "#b0ffff",
      dark: "#323f52",
    },
    grey: {
      "100": "#718792",
      "300": "#455a64",
      "800": "#1c313a",
    },
    // background: {
    //   default: "#323f52",
    //   paper: "#282c34",
    // },
    // blueGray: {
    //   "300": "#323f52",
    // },
  },
});
