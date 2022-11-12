import React from "react";
import { IMG_PROC_PANELS_DATA } from "../../utils/IMG_PROC_CONSTANTS";
import Divider from "../../components/Divider";
import ThresholdAdaptivePanel from "../../imgProcPanels/ThresholdAdaptivePanel";
import ThresholdBasicPanel from "../../imgProcPanels/ThresholdBasicPanel";
import MorphDilatePanel from "../../imgProcPanels/MorphDilatePanel";
import MorphErodePanel from "../../imgProcPanels/MorphErodePanel";
import MorphAdvancedPanel from "../../imgProcPanels/MorphAdvancedPanel";
import HistogramPanel from "../../imgProcPanels/HistogramPanel";
import ConvolutionPanel from "../../imgProcPanels/ConvolutionPanel";
import GaussianBlurPanel from "../../imgProcPanels/GaussianBlurPanel";
import { StyledSubPanelContainer } from "./styled";

const ControlSubPanel = ({ displayedSubPanel }) => {
  switch (displayedSubPanel) {
    case IMG_PROC_PANELS_DATA.SEGMENTATION.PANELS.THRESHOLDING:
      return (
        <StyledSubPanelContainer>
          <ThresholdBasicPanel />
          <Divider />
          <ThresholdAdaptivePanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.ERODE_DILATE:
      return (
        <StyledSubPanelContainer>
          <MorphDilatePanel />
          <Divider />
          <MorphErodePanel />
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
          <HistogramPanel maskEnabled />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_LINEAR.PANELS.CONVOLUTION:
      return (
        <StyledSubPanelContainer wide>
          <ConvolutionPanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_LINEAR.PANELS.GAUSSIAN_BLUR:
      return (
        <StyledSubPanelContainer>
          <GaussianBlurPanel />
        </StyledSubPanelContainer>
      );
    default:
      return <div>No such panel found :/</div>;
  }
};

export default ControlSubPanel;
