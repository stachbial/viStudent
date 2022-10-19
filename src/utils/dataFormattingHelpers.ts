export const getURLfromUint8Array = (uint8imageData: Uint8Array) => {
  const blob = new Blob([uint8imageData]);
  return window.URL.createObjectURL(blob);
};

export const getImageDataFromBuffer = (buffer: ArrayBuffer) => {
  const uint8imageData = new Uint8Array(buffer);
  const imageUrl = getURLfromUint8Array(uint8imageData);

  return {
    uint8imageData,
    imageUrl,
  };
};

export const formatRustImageResponse = (rustImageData: string) => {
  const arrayFromRustStr = rustImageData
    .replace("[", "")
    .replace("]", "")
    .split(",")
    .map((el) => parseInt(el));

  const uint8imageData = new Uint8Array(arrayFromRustStr);
  const imageUrl = getURLfromUint8Array(uint8imageData);

  return {
    uint8imageData,
    imageUrl,
  };
};
