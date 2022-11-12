//does not come along with next/image files!!
// export const supportedImageExtensions = [
//   "bmp",
//   "dib",x?
//   "jpeg",
//   "jpeg",
//   "jpg",
//   "jpe",
//   "jp2",x
//   "png",
//   "webp",
//   "pbm",x
//   "pgm",x
//   "ppm",x
//   "pxm",
//   "pnm",
//   "sr",
//   "ras",
//   "tiff",??????
//   "tif",???
//   "hdr",x
//   "pic",x
//   "apng". x
// ];

export const supportedImageExtensions = [
  "jpeg",
  "gif",
  "png",
  "svg",
  "bmp",
  "ico",
  "webp",
];

export const validateImageInput = (fileType: string) => {
  const fileExtension = fileType.split("/");
  if (
    supportedImageExtensions.includes(fileExtension[fileExtension.length - 1])
  )
    return true;

  return false;
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
