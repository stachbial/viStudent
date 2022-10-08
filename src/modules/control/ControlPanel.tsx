import { StyledWrapper, StyledBackground } from "./styled";
import { theme } from "../../theme/theme";

const ControlPanel = () => {
  return (
    <StyledWrapper item sm={5.5}>
      <StyledBackground bgcolor={theme.palette.secondary.dark}>
        ControlPanel
      </StyledBackground>
    </StyledWrapper>
  );
};

export default ControlPanel;
