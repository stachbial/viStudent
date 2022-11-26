export const SUPPORTED_IMG_EXTENSIONS = [
  "jpeg",
  "gif",
  "png",
  "svg",
  "bmp",
  "ico",
  "webp",
];

export const SUPPORTED_IMG_DIMENSIONS = {
  width: 1500,
  height: 1500,
};

export const IMG_PROC_PANELS_DATA = {
  HISTOGRAMS: {
    TITLE: "Histogramy",
    PANELS: {
      GLOBAL_HIST: "Globalny histogram obrazu",
      LOCAL_HIST: "Lokalny histogram obrazu",
    },
  },
  FILTER_BASIC: {
    TITLE: "Filtracja prosta",
    PANELS: {
      CONVOLUTION: "Konwolucja",
      GAUSSIAN_BLUR: "Rozmycie Gauss'a",
      MEDIAN_BLUR: "Rozmycie medianowe",
    },
  },
  FILTER_ADVANCED: {
    TITLE: "Filtracja złożona",
    PANELS: {
      BILATERAL_BLUR: "Rozmycie biLateralne",
      SOBEL_EDGES: "Filtr Sobel'a",
      LAPLACE_EDGES: "Filtr Laplace'a",
      CANNY_EDGES: "Filtr Cann'ego",
    },
  },
  MORPH_OPERATIONS: {
    TITLE: "Operacje morfologiczne",
    PANELS: {
      ERODE: "Erozja",
      DILATE: "Dylatacja",
      ADVANCED: "Warianty zaawansowane",
    },
  },
  SEGMENTATION: {
    TITLE: "Segmentacja",
    PANELS: {
      THRESHOLD_BASIC: "Progowanie proste",
      THRESHOLD_ADAPTIVE: "Progowanie adaptacyjne",
      DISTANCE_TRANSFORM: "Transformata dystansowa",
    },
  },
  CONTOURS: {
    TITLE: "Wykrywanie konturów - Transformata Hough'a",
    PANELS: {
      HOUGH_LINES: "Wykrywanie linii prostych",
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
  GET_HIST: "get_hist",
  APPLY_RECT_MASK: "apply_rect_mask",
  CONVOLVE: "convolve",
  GAUSSIAN_BLUR: "gaussian_blur",
  MEDIAN_BLUR: "median_blur",
  BILATERAL_BLUR: "bilateral_blur",
  CANNY_EDGES: "canny_edges",
  SOBEL_EDGES: "sobel_edges",
  LAPLACIAN_EDGES: "laplacian_edges",
  HOUGH_LINES_P: "hough_lines_p",
  DISTANCE_TRANSFORM: "dist_transf",
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

export const DISTANCE_TYPES = [
  { name: "L1: |x1-x2| + |y1-y2|", value: "DIST_L1" },
  { name: "L2: dystans euklidesowy", value: "DIST_L2" },
  { name: "C: max(|x1-x2|,|y1-y2|", value: "DIST_C" },
  { name: "L12: 2(sqrt(1+x*x/2) - 1))", value: "DIST_L12" },
  { name: "FAIR:  c^2(|x|/c-log(1+|x|/c)), c = 1.3998", value: "DIST_FAIR" },
  {
    name: "Metoda Welsch'a: c^2/2(1-exp(-(x/c)^2)), c = 2.9846",
    value: "DIST_WELSCH",
  },
  {
    name: "Metoda Hubera'a: |x|<c ? x^2/2 : c(|x|-c/2), c=1.345",
    value: "DIST_HUBER",
  },
];

export const DIST_MASK_TYPES = [
  { name: "3 x 3", value: "DIST_MASK_3" },
  { name: "5 x 5", value: "DIST_MASK_5" },
  { name: "Dynamiczna maska precyzyjna", value: "DIST_MASK_PRECISE" },
];
