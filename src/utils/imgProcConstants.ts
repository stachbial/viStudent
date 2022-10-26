export const IMG_PROC_PANELS = {
  THRESHOLDING: "Progowanie",
  CONTRAST: "Korekcja kontrastu",
  CONVOLUTION: "Konwolucja",
  EDGE_DETECTION: "Wykrywanie krawędzi",
  CONTOURS: "Kontury",
  BLUR: "Rozmycie",
  MORF_OPERATIONS: "Operacje morfologiczne",
  HISTOGRAMS: "Histogramy",
  BINARIZATION: "Binaryzacja(?)",
  FILTRATION: "Filtracja(?)",
};
export const IMG_PROC_METHODS = {
  LOAD_IMAGE: "load_image",
  ROTATE: "rotate",
  THRESHOLD: "threshold",
  ADAPTIVE_THRESHOLD: "adaptive_threshold",
};

export const THRESHOLD_TYPES = [
  { name: "Binarne", value: "THRESH_BINARY" },
  { name: "Binarne odwrócone", value: "THRESH_BINARY_INV" },
  { name: "Okrawające", value: "THRESH_TRUNC" },
  { name: "Do zera", value: "THRESH_TOZERO" },
  { name: "Do zera odwrotne", value: "THRESH_TOZERO_INV" },
  { name: "", value: "THRESH_OTSU" },
  { name: "", value: "THRESH_TRIANGLE" },
];

export const THRESHOLD_ADPT_METHODS_TYPES = [
  { name: "", value: "ADAPTIVE_THRESH_MEAN_C" },
  { name: "", value: "ADAPTIVE_THRESH_GAUSSIAN_C" },
];
