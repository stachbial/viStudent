import React, { useContext, useCallback } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import {
  useIntegerInputState,
  useFloatInputState,
} from "../../hooks/inputHooks";
import { Typography, TextField, Button } from "@mui/material";
import { StyledSubMethodForm, StyledInputsWrapper } from "./styled";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";

// TODO : set step for integer numeric input

const HoughLines = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [threshold, onChangeThreshold] = useIntegerInputState(1, 1, 255);
  const [rho, onChangeRho] = useFloatInputState(1, 1, 255, 0.01);
  const [theta, onChangeTheta] = useFloatInputState(1, 1, 180, 0.01);
  const [maxLineGap, onChangeMaxLineGap] = useIntegerInputState(1, 1, 10000);
  const [minLineLength, onChangeMinLineLength] = useIntegerInputState(
    1,
    1,
    10000
  );

  const handleHoughLinesOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.HOUGH_LINES_P,
      payload: {
        threshold: threshold.toString(),
        rho: threshold.toString(),
        theta: threshold.toString(),
        maxLineGap: threshold.toString(),
        minLineLength: threshold.toString(),
      },
    });
  }, [threshold, rho, theta, maxLineGap, minLineLength]);

  return (
    <StyledSubMethodForm>
      <Typography component="h5" fontWeight="bold">
        Probabilystyczna transformata Hough'a
      </Typography>
      <StyledInputsWrapper>
        <TextField
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 255, step: 1, min: 1 } }}
          label="Próg (max: 255)"
          color="secondary"
          sx={{ flex: "1" }}
          value={threshold}
          onChange={onChangeThreshold}
        />
        <TextField
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 255, step: 0.01, min: 1 } }}
          label="rho"
          color="secondary"
          sx={{ flex: "1" }}
          value={rho}
          onChange={onChangeRho}
        />

        <TextField
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 180, step: 0.01, min: 0 } }}
          label="theta"
          color="secondary"
          sx={{ flex: "1" }}
          value={theta}
          onChange={onChangeTheta}
        />
      </StyledInputsWrapper>
      <TextField
        type="number"
        inputMode="decimal"
        InputProps={{ inputProps: { max: 10000, step: 1, min: 0 } }}
        label="Minimalna ilość pikseli stanowiąca linię"
        color="secondary"
        sx={{ flex: "1" }}
        value={minLineLength}
        onChange={onChangeMinLineLength}
      />
      <TextField
        type="number"
        inputMode="decimal"
        InputProps={{ inputProps: { max: 10000, step: 1, min: 0 } }}
        label="Minimalna odległość pomiędzy dwoma pikselami stanowiąca linię"
        color="secondary"
        sx={{ flex: "1" }}
        value={maxLineGap}
        onChange={onChangeMaxLineGap}
      />

      <Button
        variant="contained"
        onClick={handleHoughLinesOperation}
        disabled={isLoading}
      >
        Wykryj linie
      </Button>
    </StyledSubMethodForm>
  );
};

export default HoughLines;
