import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/theme";
import AppContainer from "../components/layout/AppContainer";
import ControlPanel from "../modules/control/ControlPanel";
import MediaInput from "../modules/media/MediaInput";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <ControlPanel />
        <MediaInput />
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
