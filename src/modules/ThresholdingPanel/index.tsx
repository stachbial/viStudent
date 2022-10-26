import ThresholdOperation from "../ThresholdOperation";
import Divider from "../../components/Divider";
import ThresholdAdaptiveOperation from "../ThresholdAdaptiveOperation";

import { StyledModuleContainer } from "./styled";

const ThresholdingPanel = () => {
  return (
    <StyledModuleContainer>
      <ThresholdOperation />
      <Divider />
      <ThresholdAdaptiveOperation />
    </StyledModuleContainer>
  );
};

export default ThresholdingPanel;
