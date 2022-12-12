import React, { useContext, useCallback } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import {
  useIntegerInputState,
  useFloatInputState,
  useSelectInputState,
} from "../../hooks/inputHooks";
import { Typography, TextField, MenuItem, Button } from "@mui/material";
import { StyledSubMethodForm, StyledInputsWrapper } from "./styled";
import { IMG_PROC_METHODS, LINE_COLORS } from "../../utils/IMG_PROC_CONSTANTS";

const HoughLines = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [threshold, onChangeThreshold] = useIntegerInputState(1, 1, 255);
  const [rho, onChangeRho] = useFloatInputState(1, 1, 255, 0.01);
  const [theta, onChangeTheta] = useFloatInputState(15, 1, 180, 0.01);
  const [maxLineGap, onChangeMaxLineGap] = useIntegerInputState(1, 1, 10000);
  const [minLineLength, onChangeMinLineLength] = useIntegerInputState(
    3,
    1,
    10000
  );
  const [lineColor, onChangeLineColor] = useSelectInputState(
    LINE_COLORS[0].value
  );

  console.log(lineColor);

  const handleHoughLinesOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.HOUGH_LINES_P,
      payload: {
        threshold: threshold.toString(),
        rho: rho.toString(),
        theta: theta.toString(),
        maxLineGap: maxLineGap.toString(),
        minLineLength: minLineLength.toString(),
        lineColor: lineColor,
      },
    });
  }, [
    threshold,
    rho,
    theta,
    maxLineGap,
    minLineLength,
    lineColor,
    processImage,
  ]);

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
          label="Próg akumulatora"
          color="secondary"
          sx={{ flex: "1" }}
          value={threshold}
          onChange={onChangeThreshold}
        />
        <TextField
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 255, step: 0.01, min: 1 } }}
          label="Rozdzielczość r"
          color="secondary"
          sx={{ flex: "1" }}
          value={rho}
          onChange={onChangeRho}
        />
        <TextField
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 180, step: 0.01, min: 0 } }}
          label="Rozdzielczość theta"
          color="secondary"
          sx={{ flex: "1" }}
          value={theta}
          onChange={onChangeTheta}
        />
      </StyledInputsWrapper>
      <StyledInputsWrapper>
        <TextField
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 10000, step: 1, min: 0 } }}
          label="Minimalna ilość pikseli stanowiąca linię"
          color="secondary"
          sx={{ flex: "2" }}
          value={minLineLength}
          onChange={onChangeMinLineLength}
        />
        <TextField
          value={lineColor}
          label="Kolor wykrytej linii"
          onChange={onChangeLineColor}
          color="secondary"
          sx={{ flex: "1" }}
          select
        >
          {LINE_COLORS.map((lineColor) => {
            return (
              <MenuItem value={lineColor.value}>{lineColor.name}</MenuItem>
            );
          })}
        </TextField>
      </StyledInputsWrapper>
      <TextField
        type="number"
        inputMode="decimal"
        InputProps={{ inputProps: { max: 10000, step: 1, min: 0 } }}
        label="Maksymalna odległość pomiędzy dwoma pikselami stanowiącymi linię"
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
