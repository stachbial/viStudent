import React, { useState, useEffect, useCallback } from "react";
import { ImageProcessingContext } from "./ImageProcessingContext";
import { dispatchRustImageOperation } from "../utils/dispatchRustImageOperation";
import {
  serializeImageData,
  deserializeRustImageResponse,
  getURLfromUint8Array,
} from "../utils/dataFormattingHelpers";
import {
  processedImageData,
  imageActionParams,
} from "../types/ImageProcessingContextTypes";
import { imageAction } from "../utils/imageActions";

export const ImageProcessingContextProvider = ({ children }) => {
  const [processedImageData, setProcessedImageData] =
    useState<processedImageData>({
      currentImageURL: null,
      currentImageData: null,
      previousImageStatesData: [],
    });

  const [currentImageActionParams, setCurrentImageActionParams] =
    useState<imageActionParams>(null);

  const [editingState, setEditingState] = useState({
    isLoading: false,
    canUndo: false,
  });

  const handleUndoProcessImage = useCallback(() => {
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
  }, [setProcessedImageData, getURLfromUint8Array]);

  const handleImageProcessing = useCallback(
    (params: imageActionParams) => {
      // providing currentImageData if not loading new image
      const payload =
        params.type === imageAction.LOAD_IMAGE
          ? params?.payload
          : {
              ...params?.payload,
              img: serializeImageData(processedImageData.currentImageData),
            };

      setCurrentImageActionParams({ ...params, payload: payload });
      setEditingState((prev) => {
        return { ...prev, isLoading: true };
      });
    },
    [setCurrentImageActionParams, setEditingState, processedImageData]
  );

  useEffect(() => {
    const handleRustImageProcessing = async () => {
      try {
        const rustImageData = await dispatchRustImageOperation(
          currentImageActionParams
        );

        const { uint8imageData, imageUrl } =
          deserializeRustImageResponse(rustImageData);

        setProcessedImageData((prev) => {
          // not pushing currentImageData if "null"  to image history
          const newPreviousImageStatesData =
            prev.currentImageData === null
              ? prev.previousImageStatesData
              : [...prev.previousImageStatesData, prev.currentImageData];

          return {
            currentImageURL: imageUrl,
            currentImageData: uint8imageData,
            previousImageStatesData: newPreviousImageStatesData,
          };
        });
      } catch {
        (error: any) => {
          console.error(`error while handling rust img operation: `, error);
        };
      }
    };

    handleRustImageProcessing();
  }, [currentImageActionParams]);

  useEffect(() => {
    setEditingState({
      isLoading: false,
      canUndo: processedImageData.previousImageStatesData.length > 0,
    });
  }, [processedImageData]);

  return (
    <ImageProcessingContext.Provider
      value={{
        currentImageURL: processedImageData.currentImageURL,
        isLoading: editingState.isLoading,
        canUndo: editingState.canUndo,
        processImage: handleImageProcessing,
        undoProcessImage: handleUndoProcessImage,
      }}
    >
      {children}
    </ImageProcessingContext.Provider>
  );
};
