import React from "react";
import { IMG_PROC_PANELS_DATA } from "../../utils/IMG_PROC_CONSTANTS";
import ThresholdingPanel from "../ThresholdingPanel";
import MorphErodeDilatePanel from "../MorphErodeDilatePanel";
import MorphAdvancedPanel from "../MorphAdvancedPanel";

const ControlSubPanel = ({ displayedSubPanel }) => {
  switch (displayedSubPanel) {
    case IMG_PROC_PANELS_DATA.THRESHOLDING.PANELS.BASIC_ADAPTIVE:
      return <ThresholdingPanel />;
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.ERODE_DILATE:
      return <MorphErodeDilatePanel />;
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.ADVANCED:
      return <MorphAdvancedPanel />;
    default:
      return <div>No such panel found :/</div>;
  }
};

export default ControlSubPanel;
