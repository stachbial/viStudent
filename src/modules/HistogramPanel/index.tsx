import React from "react";
import HistOperation from "../../operationFroms/HistOperation";

const HistogramPanel = ({ enableMask }: { enableMask?: boolean }) => {
  return <HistOperation enableMask={enableMask} />;
};

export default HistogramPanel;
