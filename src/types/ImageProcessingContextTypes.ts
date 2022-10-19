export type currentImageData = Uint8Array | null;

export type currentImageURL = string | null;

export type previousImageStatesData = Uint8Array[];

export type processedImageData = {
  currentImageURL: currentImageURL;
  currentImageData: currentImageData;
  previousImageStatesData: previousImageStatesData;
};

export type imageActionParams = {
  type: string;
  payload?: any;
} | null;

export type imageActionLoadingState = "LOADING" | "LOADED" | "EMPTY" | "ERROR";

export type imageProcessingAction = {
  imageActionParams: imageActionParams;
  loadingState: imageActionLoadingState;
};

export type ImageProcessingCtx = {
  currentImageURL: currentImageURL;
  imageLoadingState: imageActionLoadingState;
  processImage: (imageActionParams: imageActionParams) => void;
  undoProcessImage: () => void;
};
