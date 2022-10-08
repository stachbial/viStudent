import { createContext } from "react";
import {
  currentImageType,
  imageActionParamsType,
  ImageProcessingContextType,
} from "../types/ImageProcessingContextTypes";

export const initialCurrentImageState: currentImageType = null;

const initialImageProcessingContextState: ImageProcessingContextType = {
  currentImage: initialCurrentImageState,
  imageLoadingState: "EMPTY",
  processImage: (imageActionParams: imageActionParamsType) => {},
  undoProcessImage: () => {},
};

export const ImageProcessingContext = createContext<ImageProcessingContextType>(
  initialImageProcessingContextState
);
