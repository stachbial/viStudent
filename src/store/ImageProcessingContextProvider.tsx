import React, { useState, useEffect } from "react";
import {
  ImageProcessingContext,
  initialCurrentImageState,
} from "./ImageProcessingContext";
import {
  processedImageDataType,
  imageActionParamsType,
  imageProcessingActionType,
} from "../types/ImageProcessingContextTypes";

const initialProcessedImageDataState: processedImageDataType = {
  currentImage: initialCurrentImageState,
  previousImageStates: [],
};

export const ImageProcessingContextProvider = ({ children }) => {
  const [processedImageData, setProcessedImageData] = useState(
    initialProcessedImageDataState
  );
  const [imageProcessingAction, setImageProcessingAction] =
    useState<imageProcessingActionType>({
      imageActionParams: null,
      loadingState: "EMPTY",
    });

  const handleUndoProcessImage = () => {
    setProcessedImageData((prev) => {
      const previousImageStates = prev.previousImageStates;

      if (previousImageStates.length !== 0) {
        const lastImageState =
          previousImageStates[previousImageStates.length - 1];
        const slicedPreviousImageStates = previousImageStates.slice(0, -1);

        return {
          currentImage: lastImageState,
          previousImageStates: slicedPreviousImageStates,
        };
      }
      return prev;
    });
  };

  const handleImageProcessing = (params: imageActionParamsType) => {
    setImageProcessingAction({
      imageActionParams: params,
      loadingState: "LOADING",
    });
  };

  useEffect(() => {

    
  }, [imageProcessingAction]);

  return (
    <ImageProcessingContext.Provider
      value={{
        currentImage: processedImageData.currentImage,
        imageLoadingState: imageProcessingAction.loadingState,
        processImage: handleImageProcessing,
        undoProcessImage: handleUndoProcessImage,
      }}
    >
      {children}
    </ImageProcessingContext.Provider>
  );
};
