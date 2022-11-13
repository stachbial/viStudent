import React, { useContext, useCallback } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { useIntegerInputState } from "../../hooks/inputHooks";
import { Typography, TextField, Button } from "@mui/material";
import { StyledSubMethodForm } from "./styled";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";

// TODO : set step for integer numeric input

const LaplacianPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [ksize, onChangeKsize] = useIntegerInputState(1, 1, 9);

  const handleBilateralBlurOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.LAPLACIAN_EDGES,
      payload: {
        ksize: ksize.toString(),
      },
    });
  }, [ksize]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Wielkość przekątnej otoczenia pixela (maski)"}
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
        Wykonaj filtrację Laplace'a
      </Button>
    </StyledSubMethodForm>
  );
};

export default LaplacianPanel;
