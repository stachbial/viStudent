import React from "react";
import { IMG_PROC_PANELS_DATA } from "../../utils/IMG_PROC_CONSTANTS";
import ThresholdAdaptivePanel from "../../imgProcPanels/ThresholdAdaptivePanel";
import ThresholdBasicPanel from "../../imgProcPanels/ThresholdBasicPanel";
import MorphDilatePanel from "../../imgProcPanels/MorphDilatePanel";
import MorphErodePanel from "../../imgProcPanels/MorphErodePanel";
import MorphAdvancedPanel from "../../imgProcPanels/MorphAdvancedPanel";
import HistogramPanel from "../../imgProcPanels/HistogramPanel";
import ConvolutionPanel from "../../imgProcPanels/ConvolutionPanel";
import GaussianBlurPanel from "../../imgProcPanels/GaussianBlurPanel";
import MedianBlurPanel from "../../imgProcPanels/MedianBlurPanel";
import { StyledSubPanelContainer } from "./styled";

const ControlSubPanel = ({ displayedSubPanel }) => {
  switch (displayedSubPanel) {
    case IMG_PROC_PANELS_DATA.SEGMENTATION.PANELS.THRESHOLD_BASIC:
      return (
        <StyledSubPanelContainer>
          <ThresholdBasicPanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.SEGMENTATION.PANELS.THRESHOLD_ADAPTIVE:
      return (
        <StyledSubPanelContainer>
          <ThresholdAdaptivePanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.ERODE:
      return (
        <StyledSubPanelContainer>
          <MorphErodePanel />
        </StyledSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.DILATE:
      return (
        <StyledSubPanelContainer>
          <MorphDilatePanel />
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
    case IMG_PROC_PANELS_DATA.FILTER_LINEAR.PANELS.MEDIAN_BLUR:
      return (
        <StyledSubPanelContainer>
          <MedianBlurPanel />
        </StyledSubPanelContainer>
      );
    default:
      return <div>No such panel found :/</div>;
  }
};

export default ControlSubPanel;
