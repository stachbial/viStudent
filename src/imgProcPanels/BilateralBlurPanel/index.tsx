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

const BilateralBlurPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [grayscale, toggleGrayscale] = useSwitchInputState(false);
  const [sigmaSpace, onChangeSigmaSpace] = useFloatInputState(90, 0, 255, 0.01);
  const [sigmaColor, onChangeSigmaColor] = useFloatInputState(90, 0, 255, 0.01);
  const [d, onChangeD] = useIntegerInputState(5, 1, 15);

  const handleBilateralBlurOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.BILATERAL_BLUR,
      payload: {
        grayscale: grayscale.toString(),
        sigmaSpace: sigmaSpace.toString(),
        sigmaColor: sigmaColor.toString(),
        d: d.toString(),
      },
    });
  }, [grayscale, d, sigmaColor, sigmaSpace, processImage]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Wagi parametrów składowych filtru bilateralnego"}
      </Typography>
      <StyledInputsRowWrapper>
        <TextField
          id="d"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 0.01,
              min: 0,
              max: 255,
            },
          }}
          label="Waga przestrzenna (space)"
          color="secondary"
          sx={{ flex: "1" }}
          value={sigmaSpace}
          onChange={onChangeSigmaSpace}
        />
        <TextField
          id="sigmaColor"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 0.01,
              min: 0,
              max: 255,
            },
          }}
          label="Waga jasności (range)"
          color="secondary"
          sx={{ flex: "1" }}
          value={sigmaColor}
          onChange={onChangeSigmaColor}
        />
      </StyledInputsRowWrapper>
      <Typography component="h5" fontWeight="bold">
        {"Przekątna otoczenia pojedyńczego piksela (maski)"}
      </Typography>
      <TextField
        id="sigmaColor"
        type="number"
        inputMode="decimal"
        InputProps={{
          inputProps: {
            step: 2,
            min: 1,
            max: 15,
          },
        }}
        label="Wartość przekątnej (px)"
        color="secondary"
        sx={{ flex: "1" }}
        value={d}
        onChange={onChangeD}
      />
      <ToggleSwitch
        label="Konwertuj na obraz monochromatyczny"
        checked={grayscale}
        onChange={toggleGrayscale}
      />
      <Button
        variant="contained"
        onClick={handleBilateralBlurOperation}
        disabled={isLoading}
      >
        Wykonaj rozmycie bilateralne
      </Button>
    </StyledSubMethodForm>
  );
};

export default BilateralBlurPanel;
