import React from "react";
import HistOperation from "../../operationFroms/HistOperation";

const HistogramPanel = ({ maskEnabled }: { maskEnabled?: boolean }) => {
  return <HistOperation maskEnabled={maskEnabled} />;
};

export default HistogramPanel;
