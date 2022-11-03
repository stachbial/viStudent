import React from "react";
import { IMG_PROC_PANELS_DATA } from "../../utils/IMG_PROC_CONSTANTS";
import ThresholdingPanel from "../ThresholdingPanel";
import MorphErodeDilatePanel from "../MorphErodeDilatePanel";
import MorphAdvancedPanel from "../MorphAdvancedPanel";
import HistogramPanel from "../HistogramPanel";
import { StyledSubPanelContainer } from "./styled";

const ControlSubPanel = ({ displayedSubPanel }) => {
  switch (displayedSubPanel) {
    case IMG_PROC_PANELS_DATA.THRESHOLDING.PANELS.BASIC_ADAPTIVE:
      return (
        <StyledSubPanelContainer>
          <ThresholdingPanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.ERODE_DILATE:
      return (
        <StyledSubPanelContainer>
          <MorphErodeDilatePanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.ADVANCED:
      return (
        <StyledSubPanelContainer>
          <MorphAdvancedPanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.HISTOGRAMS.PANELS.GLOBAL_HIST:
      return (
        <StyledSubPanelContainer wide>
          <HistogramPanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.HISTOGRAMS.PANELS.LOCAL_HIST:
      return (
        <StyledSubPanelContainer wide>
          <HistogramPanel enableMask />
        </StyledSubPanelContainer>
      );
    default:
      return <div>No such panel found :/</div>;
  }
};

export default ControlSubPanel;
