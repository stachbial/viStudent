export type TRESHOLD_TYP =
  | "THRESH_BINARY"
  | "THRESH_BINARY_INV"
  | "THRESH_TRUNC"
  | "THRESH_TOZERO"
  | "THRESH_TOZERO_INV"
  | "THRESH_OTSU"
  | "THRESH_TRIANGLE";

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
