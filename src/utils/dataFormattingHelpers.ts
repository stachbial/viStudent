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

export const serializeImageData = (uint8imageData: Uint8Array) => {
  return uint8imageData.toString();
};

export const deserializeRustImageResponse = (rustImageData: string) => {
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

export const formatHistJSONtoChartData = (histJSON: string) => {
  //parse stringified vectors as intArrays
  let parsedData = {};
  Object.keys(histJSON).map((key) => {
    parsedData = {
      ...parsedData,
      [key]: histJSON[key]
        .replace("[", "")
        .replace("]", "")
        .split(",")
        .map((el: string) => parseInt(el)),
    };
  });
  //convert to chartData format => { "name" : pixelIntensityValue, "Channel x": channel'sValuesArray}
  let parsedChartData = [];
  for (let i = 0; i < parsedData[0].length; i++) {
    let chartDataPoint: any = { name: i };
    Object.keys(parsedData).map((channel) => {
      chartDataPoint = {
        ...chartDataPoint,
        [`Channel ${channel}`]: parsedData[channel][i],
      };
    });
    parsedChartData = [...parsedChartData, chartDataPoint];
  }

  return parsedChartData;
};

export const serializeKernelValues = (kernel: number[][]) => {
  return kernel.map((row) => `[${row.toString()}]`).toString();
};
