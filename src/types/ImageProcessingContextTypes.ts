export type imageData = Uint8Array;

export type currentImageData = imageData | null;

export type currentImageURL = string | null;

export type previousImageStatesData = imageData[];

export type processedImageData = {
  currentImageURL: currentImageURL;
  currentImageData: currentImageData;
  previousImageStatesData: previousImageStatesData;
};

export type imageActionParams = {
  type: string;
  payload?: any;
} | null;

export type ImageProcessingCtx = {
  currentImageURL: currentImageURL;
  currentImageData: currentImageData;
  isLoading: boolean;
  canUndo: boolean;
  processImage: (imageActionParams: imageActionParams) => void;
  undoProcessImage: () => void;
};
