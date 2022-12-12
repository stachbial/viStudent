import React, { useContext, useCallback } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import {
  useIntegerInputState,
  useFloatInputState,
  useSwitchInputState,
} from "../../hooks/inputHooks";
import { Typography, TextField, Button } from "@mui/material";
import ToggleSwitch from "../../components/ToggleSwitch";
import { StyledSubMethodForm, StyledInputsRowWrapper } from "./styled";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";

const GaussianBlurPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [grayscale, toggleGrayscale] = useSwitchInputState(false);
  const [kernelW, onChangeKernelW] = useIntegerInputState(1, 1, 9);
  const [kernelH, onChangeKernelH] = useIntegerInputState(1, 1, 9);
  const [stdDeviation, onChangeStdDeviation] = useFloatInputState(
    0,
    -255,
    255,
    0.01
  );

  const handleGaussBlurOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.GAUSSIAN_BLUR,
      payload: {
        grayscale: grayscale.toString(),
        kernelW: kernelW.toString(),
        kernelH: kernelH.toString(),
        stdDeviation: stdDeviation.toString(),
      },
    });
  }, [grayscale, kernelW, kernelH, stdDeviation, processImage]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Parametry maski filtru Gauss'a"}
      </Typography>
      <StyledInputsRowWrapper>
        <TextField
          id="kernelW"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 2,
              min: 1,
              max: 9,
            },
          }}
          label="Szerokość maski  (px)"
          color="secondary"
          sx={{ flex: "1" }}
          value={kernelW}
          onChange={onChangeKernelW}
        />
        <TextField
          id="kernelH"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 2,
              min: 1,
              max: 9,
            },
          }}
          label="Wysokość maski (px)"
          color="secondary"
          sx={{ flex: "1" }}
          value={kernelH}
          onChange={onChangeKernelH}
        />
      </StyledInputsRowWrapper>
      <Typography component="h5" fontWeight="bold">
        {"Odchylenie standardowe filtru Gauss'a"}
      </Typography>
      <TextField
        id="kernelH"
        type="number"
        inputMode="decimal"
        InputProps={{
          inputProps: {
            step: 0.01,
            min: -255,
            max: 255,
          },
        }}
        label="Wartość odchylenia"
        color="secondary"
        sx={{ flex: "1" }}
        value={stdDeviation}
        onChange={onChangeStdDeviation}
      />
      <ToggleSwitch
        label="Konwertuj na obraz monochromatyczny"
        checked={grayscale}
        onChange={toggleGrayscale}
      />
      <Button
        variant="contained"
        onClick={handleGaussBlurOperation}
        disabled={isLoading}
      >
        Wykonaj rozmycie Gauss'a
      </Button>
    </StyledSubMethodForm>
  );
};

export default GaussianBlurPanel;
