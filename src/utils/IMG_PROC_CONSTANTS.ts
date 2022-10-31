// export const IMG_PROC_PANELS = {
//   THRESHOLDING: "Progowanie",
//   MORPH_OPERATIONS: "Operacje morfologiczne",
//   CONTRAST: "Korekcja kontrastu",
//   CONVOLUTION: "Konwolucja",
//   EDGE_DETECTION: "Wykrywanie krawędzi",
//   CONTOURS: "Kontury",
//   BLUR: "Rozmycie",
//   HISTOGRAMS: "Histogramy",
//   BINARIZATION: "Binaryzacja(?)",
//   FILTRATION: "Filtracja(?)",
// };

export const IMG_PROC_PANELS_DATA = {
  THRESHOLDING: {
    TITLE: "Progowanie",
    PANELS: { BASIC_ADAPTIVE: "Proste i adaptacyjne" },
  },
  MORPH_OPERATIONS: {
    TITLE: "Operacje morfologiczne",
    PANELS: {
      ERODE_DILATE: "Erozja i Dylatacja",
      ADVANCED: "Warianty zaawansowane",
    },
  },
  HISTOGRAMS: {
    TITLE: "Histogramy",
    PANELS: {
      GLOBAL_HIST: "Globalny histogram obrazu",
      LOCAL_HIST: "Lokalny histogram obrazu",
    },
  },
  CONTRAST: {
    TITLE: "Korekcja kontrastu",
    PANELS: {
      EMPTY: "EMPTY",
    },
  },
  CONVOLUTION: {
    TITLE: "Konwolucja",
    PANELS: {
      EMPTY: "EMPTY",
    },
  },
  EDGE_DETECTION: {
    TITLE: "Wykrywanie krawędzi",
    PANELS: {
      EMPTY: "EMPTY",
    },
  },
  CONTOURS: {
    TITLE: "Kontury",
    PANELS: {
      EMPTY: "EMPTY",
    },
  },
  BLUR: {
    TITLE: "Rozmycie",
    PANELS: {
      EMPTY: "EMPTY",
    },
  },
  FILTRATION: {
    TITLE: "Filtracja(?)",
    PANELS: {
      EMPTY: "EMPTY",
    },
  },
};

export const IMG_PROC_METHODS = {
  LOAD_IMAGE: "load_image",
  ROTATE: "rotate",
  THRESHOLD: "threshold",
  ADAPTIVE_THRESHOLD: "adaptive_threshold",
  DILATATION: "dilatation",
  EROSION: "erosion",
  MORPH_ADVANCED: "morph_advanced",
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
  { name: "Wartość średnia - C", value: "ADAPTIVE_THRESH_MEAN_C" },
  { name: "Suma Gaussa - C", value: "ADAPTIVE_THRESH_GAUSSIAN_C" },
];

export const MORPH_SHAPES = [
  { name: "Prostokąt", value: "MORPH_RECT" },
  { name: "Krzyż", value: "MORPH_CROSS" },
  { name: "Elipsa", value: "MORPH_ELLIPSE" },
];

export const MORPH_ADVANCED_OP_TYPES = [
  { name: "Otwarcie", value: "MORPH_OPEN" },
  { name: "Zamknięcie", value: "MORPH_CLOSE" },
  { name: "Gradient morfologiczny", value: "MORPH_GRADIENT" },
  { name: "Top Hat", value: "MORPH_TOPHAT" },
  { name: "Black Hat", value: "MORPH_BLACKHAT" },
];
