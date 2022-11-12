import React, { useContext, useCallback } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import {
  useIntegerInputState,
  useSwitchInputState,
} from "../../hooks/inputHooks";
import { Typography, TextField, Button } from "@mui/material";
import ToggleSwitch from "../../components/ToggleSwitch";
import { StyledSubMethodForm } from "./styled";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";

// TODO : set step for integer numeric input

const MedianBlurPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [grayscale, toggleGrayscale] = useSwitchInputState(false);
  const [aperture, onChangeAperture] = useIntegerInputState(3, 3, 11);

  const handleMedianBlurOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.MEDIAN_BLUR,
      payload: {
        grayscale: grayscale.toString(),
        aperture: aperture.toString(),
      },
    });
  }, [grayscale, aperture]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Wielkość zakresu pikseli będących dziedziną mediany "}
      </Typography>
      <TextField
        id="kernelW"
        type="number"
        inputMode="decimal"
        InputProps={{
          inputProps: {
            step: 2,
            min: 3,
            max: 11,
          },
        }}
        label="Wartość zakresu (px)"
        color="secondary"
        sx={{ flex: "1" }}
        value={aperture}
        onChange={onChangeAperture}
      />
      <ToggleSwitch
        label="Konwertuj na obraz monochromatyczny"
        checked={grayscale}
        onChange={toggleGrayscale}
      />
      <Button
        variant="contained"
        onClick={handleMedianBlurOperation}
        disabled={isLoading}
      >
        Wykonaj rozmycie medianowe
      </Button>
    </StyledSubMethodForm>
  );
};

export default MedianBlurPanel;
