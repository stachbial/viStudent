import React, { useState, useEffect } from "react";
import { ImageProcessingContext } from "./ImageProcessingContext";
import {
  processedImageData,
  imageActionParams,
  imageProcessingAction,
} from "../types/ImageProcessingContextTypes";

import { dispatchRustImageOperation } from "../utils/dispatchRustImageOperation";
import {
  formatRustImageResponse,
  getURLfromUint8Array,
} from "../utils/dataFormattingHelpers";

export const ImageProcessingContextProvider = ({ children }) => {
  const [processedImageData, setProcessedImageData] =
    useState<processedImageData>({
      currentImageURL: null,
      currentImageData: null,
      previousImageStatesData: [],
    });
  const [imageProcessingAction, setImageProcessingAction] =
    useState<imageProcessingAction>({
      imageActionParams: null,
      loadingState: "EMPTY",
    });

  const handleUndoProcessImage = () => {
    setProcessedImageData((prev) => {
      const previousImageStatesData = prev.previousImageStatesData;

      if (previousImageStatesData.length !== 0) {
        const lastImageData =
          previousImageStatesData[previousImageStatesData.length - 1];
        const slicedPreviousImageStatesData = previousImageStatesData.slice(
          0,
          -1
        );

        const lastImageUrl = getURLfromUint8Array(lastImageData);

        return {
          currentImageURL: lastImageUrl,
          currentImageData: lastImageData,
          previousImageStatesData: slicedPreviousImageStatesData,
        };
      }
      return prev;
    });
  };

  const handleImageProcessing = (params: imageActionParams) => {
    setImageProcessingAction({
      imageActionParams: params,
      loadingState: "LOADING",
    });
  };

  useEffect(() => {
    const handleRustImageProcessing = async () => {
      try {
        const rustImageData = await dispatchRustImageOperation(
          imageProcessingAction.imageActionParams
        );

        const { uint8imageData, imageUrl } =
          formatRustImageResponse(rustImageData);

        setProcessedImageData((prev) => {
          return {
            currentImageURL: imageUrl,
            currentImageData: uint8imageData,
            previousImageStatesData: [
              ...prev.previousImageStatesData,
              prev.currentImageData,
            ],
          };
        });
      } catch {
        console.log(`error while handling rust img operation`);
      }
    };

    handleRustImageProcessing();
  }, [imageProcessingAction]);

  return (
    <ImageProcessingContext.Provider
      value={{
        currentImageURL: processedImageData.currentImageURL,
        imageLoadingState: imageProcessingAction.loadingState,
        processImage: handleImageProcessing,
        undoProcessImage: handleUndoProcessImage,
      }}
    >
      {children}
    </ImageProcessingContext.Provider>
  );
};
