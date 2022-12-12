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

const CannyEdgesPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [threshold1, onChangeThreshold1] = useIntegerInputState(100, 0, 255, 1);
  const [threshold2, onChangeThreshold2] = useIntegerInputState(200, 0, 255, 1);
  const [L2gradient, toggleL2gradient] = useSwitchInputState(false);

  const handleBilateralBlurOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.CANNY_EDGES,
      payload: {
        threshold1: threshold1.toString(),
        threshold2: threshold2.toString(),
        L2gradient: L2gradient.toString(),
      },
    });
  }, [L2gradient, threshold1, threshold2, processImage]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Wartości progów histerezy dla filtru Cann'ego"}
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
              max: 255,
            },
          }}
          label="Górny próg histerezy"
          color="secondary"
          sx={{ flex: "1" }}
          value={threshold1}
          onChange={onChangeThreshold1}
        />
        <TextField
          id="sigmaColor"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 1,
              min: 0,
              max: 255,
            },
          }}
          label="Dolny próg histerezy"
          color="secondary"
          sx={{ flex: "1" }}
          value={threshold2}
          onChange={onChangeThreshold2}
        />
      </StyledInputsRowWrapper>
      <ToggleSwitch
        label="Kwadratowa normalizacja gradientu obrazu (L2)"
        checked={L2gradient}
        onChange={toggleL2gradient}
      />
      <Button
        variant="contained"
        onClick={handleBilateralBlurOperation}
        disabled={isLoading}
      >
        Wykonaj filtrację Cann'ego
      </Button>
    </StyledSubMethodForm>
  );
};

export default CannyEdgesPanel;
