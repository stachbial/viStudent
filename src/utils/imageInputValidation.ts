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
  // "tiff",
];

export const validateImageInput = (fileType: string) => {
  const fileExtension = fileType.split("/");
  if (
    supportedImageExtensions.includes(fileExtension[fileExtension.length - 1])
  )
    return true;

  return false;
};
