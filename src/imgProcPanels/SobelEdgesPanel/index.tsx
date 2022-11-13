import React, { useContext, useCallback, useEffect } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { useIntegerInputState } from "../../hooks/inputHooks";
import { Typography, TextField, Button } from "@mui/material";
import { StyledSubMethodForm, StyledInputsRowWrapper } from "./styled";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";

// TODO : set step for integer numeric input

const SobelEdgesPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [dx, onChangeDx, setDx] = useIntegerInputState(1, 0, 15, 1);
  const [dy, onChangeDy, setDy] = useIntegerInputState(1, 0, 15, 1);
  const [ksize, onChangeKsize] = useIntegerInputState(3, 1, 7);

  const handleBilateralBlurOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.SOBEL_EDGES,
      payload: {
        dx: dx.toString(),
        dy: dy.toString(),
        ksize: ksize.toString(),
      },
    });
  }, [ksize, dy, dx]);

  // if ksize >1 and order >= ksize

  useEffect(() => {
    //validation -> order must be less than ksize when ksize > 1
    if (ksize > 1) {
      const corr = ksize - 1;
      if (dx >= ksize) setDx(corr.toString());
      if (dy >= ksize) setDy(corr.toString());
    }
  }, [dx, onChangeDx, dy, onChangeDy, ksize]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Rzędy pochodnych kierunkowej zmiany intensywności pikseli"}
      </Typography>
      <StyledInputsRowWrapper>
        <TextField
          id="d"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 1,
              min: 0,
              max: 7,
            },
          }}
          label="Rząd pochodnej w osi X (dx)"
          color="secondary"
          sx={{ flex: "1" }}
          value={dx}
          onChange={onChangeDx}
        />
        <TextField
          id="dy"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 1,
              min: 0,
              max: 7,
            },
          }}
          label="Rząd pochodnej w osi Y (dy)"
          color="secondary"
          sx={{ flex: "1" }}
          value={dy}
          onChange={onChangeDy}
        />
      </StyledInputsRowWrapper>
      <Typography component="h5" fontWeight="bold">
        {"Wielkość maski Sobel'a"}
      </Typography>
      <TextField
        id="dy"
        type="number"
        inputMode="decimal"
        InputProps={{
          inputProps: {
            step: 2,
            min: 1,
            max: 7,
          },
        }}
        label="Wartość przekątnej (px)"
        color="secondary"
        sx={{ flex: "1" }}
        value={ksize}
        onChange={onChangeKsize}
      />
      <Button
        variant="contained"
        onClick={handleBilateralBlurOperation}
        disabled={isLoading}
      >
        Wykonaj filtrację Sobel'a
      </Button>
    </StyledSubMethodForm>
  );
};

export default SobelEdgesPanel;
