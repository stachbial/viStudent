import ThresholdOperation from "../../operationFroms/ThresholdOperation";
import Divider from "../../components/Divider";
import ThresholdAdaptiveOperation from "../../operationFroms/ThresholdAdaptiveOperation";

const ThresholdingPanel = () => {
  return (
    <>
      <ThresholdOperation />
      <Divider />
      <ThresholdAdaptiveOperation />
    </>
  );
};

export default ThresholdingPanel;
