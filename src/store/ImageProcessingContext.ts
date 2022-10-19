import { createContext } from "react";
import {
  imageActionParams,
  ImageProcessingCtx,
} from "../types/ImageProcessingContextTypes";

const initialImageProcessingContextState: ImageProcessingCtx = {
  currentImageURL: null,
  imageLoadingState: "EMPTY",
  processImage: (imageActionParams: imageActionParams) => {},
  undoProcessImage: () => {},
};

export const ImageProcessingContext = createContext<ImageProcessingCtx>(
  initialImageProcessingContextState
);
