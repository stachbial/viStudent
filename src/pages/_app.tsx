import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { ImageProcessingContextProvider } from "../store/ImageProcessingContextProvider";
import { theme } from "../theme/theme";
import AppContainer from "../components/AppContainer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../theme/style.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

// This default export is required in a new `pages/_app.js` file.
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <ImageProcessingContextProvider>
        <AppContainer>
          <Component {...pageProps} />
          <ToastContainer />
        </AppContainer>
      </ImageProcessingContextProvider>
    </ThemeProvider>
  );
}
