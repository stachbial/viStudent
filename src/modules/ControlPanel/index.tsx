import { StyledWrapper, StyledBackground } from "./styled";
import { theme } from "../../theme/theme";

const ControlPanel = () => {
  //secondary.dark
  return (
    <StyledWrapper item sm={5.5}>
      <StyledBackground bgcolor={theme.palette.grey[800]}>
        ControlPanel
      </StyledBackground>
    </StyledWrapper>
  );
};

export default ControlPanel;
