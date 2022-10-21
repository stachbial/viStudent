import { createContext } from "react";
import {
  imageActionParams,
  ImageProcessingCtx,
} from "../types/ImageProcessingContextTypes";

const initialImageProcessingContextState: ImageProcessingCtx = {
  currentImageURL: null,
  isLoading: false,
  canUndo: false,
  processImage: (imageActionParams: imageActionParams) => {},
  undoProcessImage: () => {},
};

export const ImageProcessingContext = createContext<ImageProcessingCtx>(
  initialImageProcessingContextState
);
