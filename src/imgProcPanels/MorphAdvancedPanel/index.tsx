import React, { useCallback, useContext } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import {
  IMG_PROC_METHODS,
  MORPH_SHAPES,
  MORPH_ADVANCED_OP_TYPES,
} from "../../utils/IMG_PROC_CONSTANTS";
import { Typography, TextField, Button, MenuItem } from "@mui/material";
import OperationSwitch from "../../components/ToggleSwitch";
import { StyledSubMethodForm, StyledNumberInputsWrapper } from "./styled";
import {
  useIntegerInputState,
  useSelectInputState,
  useSwitchInputState,
} from "../../hooks/inputHooks";

const MorphAdvancedPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [grayscale, onChangeGrayscale] = useSwitchInputState(true);
  const [iterations, onChangeIterations] = useIntegerInputState(1, 1, 7);
  const [morphSize, onChangeMorphSize] = useIntegerInputState(3, 1, 11);
  const [morphShape, onChangeMorphShape] = useSelectInputState(
    MORPH_SHAPES[0].value
  );
  const [morphType, onChangeMorphType] = useSelectInputState(
    MORPH_ADVANCED_OP_TYPES[0].value
  );

  const handleAdvancedMorphOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.MORPH_ADVANCED,
      payload: {
        grayscale: grayscale.toString(),
        iterations: iterations.toString(),
        morphSize: morphSize.toString(),
        morphShape: morphShape.toString(),
        morphType: morphType.toString(),
      },
    });
  }, [grayscale, iterations, morphSize, morphShape, morphType]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Parametry zaawansowanej operacji morfologicznej"}
      </Typography>
      <TextField
        value={morphType}
        label="Typ operacji zaawansowanej"
        onChange={onChangeMorphType}
        color="secondary"
        select
      >
        {MORPH_ADVANCED_OP_TYPES.map((morphType) => {
          return <MenuItem value={morphType.value}>{morphType.name}</MenuItem>;
        })}
      </TextField>
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
        onClick={handleAdvancedMorphOperation}
        disabled={isLoading}
      >
        Wykonaj zaawansowaną operację morfologiczną
      </Button>
    </StyledSubMethodForm>
  );
};

export default MorphAdvancedPanel;
