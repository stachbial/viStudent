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

export const SUPPORTED_IMG_EXTENSIONS = [
  "jpeg",
  "gif",
  "png",
  "svg",
  "bmp",
  "ico",
  "webp",
];

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
      DIVISION: "Segmentacja wododziałowa",
    },
  },
  CONTOURS: {
    TITLE: "Wykrywanie konturów",
    PANELS: {
      HOUGH_LINES: "Transformata Hough'a",
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
