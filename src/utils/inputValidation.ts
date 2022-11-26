import {
  SUPPORTED_IMG_EXTENSIONS,
  SUPPORTED_IMG_DIMENSIONS,
} from "./IMG_PROC_CONSTANTS";

export const validateImageFormat = (fileType: string) => {
  const fileExtension = fileType.split("/");
  if (
    SUPPORTED_IMG_EXTENSIONS.includes(fileExtension[fileExtension.length - 1])
  )
    return true;

  return false;
};

export const validateImageDimensions = (
  imageUrl: string,
  onValid: () => void,
  onInValid: () => void
) => {
  const image = new Image();
  image.src = imageUrl;
  image.onload = () => {
    if (
      image.width <= SUPPORTED_IMG_DIMENSIONS.width &&
      image.height <= SUPPORTED_IMG_DIMENSIONS.height
    ) {
      onValid();
    } else {
      onInValid();
    }
  };
};

export const validateNumericInputValue = (
  value: string,
  initialVal: number,
  min: number,
  max: number,
  parseFn:
    | ((string: string, radix?: number) => number)
    | ((string: string) => number),
  step?: number
) => {
  const parsedValue = parseFn(value);

  if (isNaN(parsedValue)) return initialVal; // TODO: consider debouncing to allow empty str for a moment
  if (parsedValue >= max) return max;
  if (parsedValue <= min) return min;
  if (step) {
    const modulo = parsedValue % step;
    // TODO : edge case: odd numbers with even step
    //number is highly likely to be correct if difference is smaller than step / 1000 -> problem is due to float inaccuracy
    if (modulo !== 0 && step - modulo > step / 1000)
      return Math.floor(parsedValue / step) * step;
  }

  return parsedValue;
};
