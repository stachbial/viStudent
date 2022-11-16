import React from "react";
import { IMG_PROC_PANELS_DATA } from "../../utils/IMG_PROC_CONSTANTS";
import { MotionSubPanelContainer } from "./motion";
import ThresholdAdaptivePanel from "../../imgProcPanels/ThresholdAdaptivePanel";
import ThresholdBasicPanel from "../../imgProcPanels/ThresholdBasicPanel";
import MorphDilatePanel from "../../imgProcPanels/MorphDilatePanel";
import MorphErodePanel from "../../imgProcPanels/MorphErodePanel";
import MorphAdvancedPanel from "../../imgProcPanels/MorphAdvancedPanel";
import HistogramPanel from "../../imgProcPanels/HistogramPanel";
import ConvolutionPanel from "../../imgProcPanels/ConvolutionPanel";
import GaussianBlurPanel from "../../imgProcPanels/GaussianBlurPanel";
import MedianBlurPanel from "../../imgProcPanels/MedianBlurPanel";
import BilateralBlurPanel from "../../imgProcPanels/BilateralBlurPanel";
import CannyEdgesPanel from "../../imgProcPanels/CannyEdgesPanel";
import SobelEdgesPanel from "../../imgProcPanels/SobelEdgesPanel";
import LaplacianPanel from "../../imgProcPanels/LaplacianPanel";
import HoughLines from "../../imgProcPanels/HoughLines";

const ControlSubPanel = ({ displayedSubPanel }) => {
  switch (displayedSubPanel) {
    case IMG_PROC_PANELS_DATA.SEGMENTATION.PANELS.THRESHOLD_BASIC:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <ThresholdBasicPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.SEGMENTATION.PANELS.THRESHOLD_ADAPTIVE:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <ThresholdAdaptivePanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.ERODE:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <MorphErodePanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.DILATE:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <MorphDilatePanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.MORPH_OPERATIONS.PANELS.ADVANCED:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <MorphAdvancedPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.HISTOGRAMS.PANELS.GLOBAL_HIST:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel} wide>
          <HistogramPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.HISTOGRAMS.PANELS.LOCAL_HIST:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel} wide>
          <HistogramPanel maskEnabled />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_BASIC.PANELS.CONVOLUTION:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel} wide>
          <ConvolutionPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_BASIC.PANELS.GAUSSIAN_BLUR:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <GaussianBlurPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_BASIC.PANELS.MEDIAN_BLUR:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <MedianBlurPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_ADVANCED.PANELS.BILATERAL_BLUR:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <BilateralBlurPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_ADVANCED.PANELS.CANNY_EDGES:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <CannyEdgesPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_ADVANCED.PANELS.SOBEL_EDGES:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <SobelEdgesPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.FILTER_ADVANCED.PANELS.LAPLACE_EDGES:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <LaplacianPanel />
        </MotionSubPanelContainer>
      );
    case IMG_PROC_PANELS_DATA.CONTOURS.PANELS.HOUGH_LINES:
      return (
        <MotionSubPanelContainer presenceKey={displayedSubPanel}>
          <HoughLines />
        </MotionSubPanelContainer>
      );
    default:
      return <div>No such panel found :/</div>;
  }
};

export default ControlSubPanel;
