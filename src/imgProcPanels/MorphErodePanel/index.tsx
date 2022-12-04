import React, { useCallback, useContext } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { IMG_PROC_METHODS, MORPH_SHAPES } from "../../utils/IMG_PROC_CONSTANTS";
import { Typography, TextField, Button, MenuItem } from "@mui/material";
import OperationSwitch from "../../components/ToggleSwitch";
import { StyledSubMethodForm, StyledNumberInputsWrapper } from "./styled";
import {
  useIntegerInputState,
  useSelectInputState,
  useSwitchInputState,
} from "../../hooks/inputHooks";

const MorphErodePanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [grayscale, onChangeGrayscale] = useSwitchInputState(true);
  const [iterations, onChangeIterations] = useIntegerInputState(1, 1, 7);
  const [morphSize, onChangeMorphSize] = useIntegerInputState(3, 1, 11);
  const [morphShape, onChangeMorphShape] = useSelectInputState(
    MORPH_SHAPES[0].value
  );

  const handleErodeOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.EROSION,
      payload: {
        grayscale: grayscale.toString(),
        iterations: iterations.toString(),
        morphSize: morphSize.toString(),
        morphShape: morphShape.toString(),
      },
    });
  }, [grayscale, iterations, morphSize, morphShape]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Erozja"}
      </Typography>
      <TextField
        value={morphShape}
        label="Element strukturalny"
        onChange={onChangeMorphShape}
        color="secondary"
        select
      >
        {MORPH_SHAPES.map((morphShape) => {
          return (
            <MenuItem value={morphShape.value}>{morphShape.name}</MenuItem>
          );
        })}
      </TextField>
      <StyledNumberInputsWrapper>
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { step: 2, min: 1, max: 11 } }}
          label="Wielkość el. strukturalnego"
          color="secondary"
          sx={{ flex: "1" }}
          value={morphSize}
          onChange={onChangeMorphSize}
        />
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 1,
              min: 1,
              max: 7,
            },
          }}
          label="Liczba iteracji"
          color="secondary"
          sx={{ flex: "1" }}
          value={iterations}
          onChange={onChangeIterations}
        />
      </StyledNumberInputsWrapper>
      <OperationSwitch
        checked={grayscale}
        onChange={onChangeGrayscale}
        label="Konwertuj na obraz monochromatyczny"
      />
      <Button
        variant="contained"
        onClick={handleErodeOperation}
        disabled={isLoading}
      >
        Wykonaj operację erozji
      </Button>
    </StyledSubMethodForm>
  );
};

export default MorphErodePanel;
