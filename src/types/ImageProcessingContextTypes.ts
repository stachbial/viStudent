export type currentImageType = ArrayBuffer | null;

export type previousImageStatesType = ArrayBuffer[];

export type processedImageDataType = {
  currentImage: currentImageType;
  previousImageStates: previousImageStatesType;
};

export type imageActionParamsType = {
  type: string;
  payload?: any;
} | null;

export type imageActionLoadingStateType =
  | "LOADING"
  | "LOADED"
  | "EMPTY"
  | "ERROR";

export type imageProcessingActionType = {
  imageActionParams: imageActionParamsType;
  loadingState: imageActionLoadingStateType;
};

export type ImageProcessingContextType = {
  currentImage: currentImageType;
  imageLoadingState: imageActionLoadingStateType;
  processImage: (imageActionParams: imageActionParamsType) => void;
  undoProcessImage: () => void;
};
