export type TRESHOLD_TYP =
  | "THRESH_BINARY"
  | "THRESH_BINARY_INV"
  | "THRESH_TRUNC"
  | "THRESH_TOZERO"
  | "THRESH_TOZERO_INV"
  | "THRESH_OTSU"
  | "THRESH_TRIANGLE";

export type THRESHOLD_ADPT_METHOD_TYP =
  | "ADAPTIVE_THRESH_MEAN_C"
  | "ADAPTIVE_THRESH_GAUSSIAN_C";

export type TRESHOLD_PARAMS = {
  grayscale: boolean;
  thresh: string | null;
  maxval: string | null;
  typ:
    | "THRESH_BINARY"
    | "THRESH_BINARY_INV"
    | "THRESH_TRUNC"
    | "THRESH_TOZERO"
    | "THRESH_TOZERO_INV"
    | "THRESH_OTSU"
    | "THRESH_TRIANGLE"
    | null;
};

export type TRESHOLD_ADPT_PARAMS = {
  grayscale: boolean;
  maxval: string | null;
  blockSize: string | null;
  c: string | null;
  threshTyp:
    | "THRESH_BINARY"
    | "THRESH_BINARY_INV"
    | "THRESH_TRUNC"
    | "THRESH_TOZERO"
    | "THRESH_TOZERO_INV"
    | "THRESH_OTSU"
    | "THRESH_TRIANGLE"
    | null;
  adaptiveMethod:
    | "ADAPTIVE_THRESH_MEAN_C"
    | "ADAPTIVE_THRESH_GAUSSIAN_C"
    | null;
};
