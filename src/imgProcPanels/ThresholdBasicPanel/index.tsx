import React, { useCallback, useContext } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";
import { THRESHOLD_TYPES } from "../../utils/IMG_PROC_CONSTANTS";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { StyledSubMethodForm, StyledNumberInputsWrapper } from "./styled";
import {
  useIntegerInputState,
  useSwitchInputState,
  useSelectInputState,
} from "../../hooks/inputHooks";

const ThresholdBasicPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [grayscale, onChangeGrayscale] = useSwitchInputState(true);
  const [thresh, onChangeThresh] = useIntegerInputState(115, 0, 255);
  const [maxval, onChangeMaxval] = useIntegerInputState(255, 0, 255);
  const [typ, onChangeTyp] = useSelectInputState(THRESHOLD_TYPES[0].value);

  const handleThresholdOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.THRESHOLD,
      payload: {
        grayscale: grayscale.toString(),
        thresh: thresh.toString(),
        maxval: maxval.toString(),
        typ: typ.toString(),
      },
    });
  }, [grayscale, thresh, maxval, typ]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Progowanie Proste (globalne)"}
      </Typography>
      <TextField
        value={typ}
        label="Typ progowania prostego"
        onChange={onChangeTyp}
        color="secondary"
        select
      >
        {THRESHOLD_TYPES.map((threshType) => {
          return (
            <MenuItem value={threshType.value}>{threshType.name}</MenuItem>
          );
        })}
      </TextField>
      <StyledNumberInputsWrapper>
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 255, step: 1, min: 0 } }}
          label="Próg <0, 255>"
          color="secondary"
          sx={{ flex: "1" }}
          value={thresh}
          onChange={onChangeThresh}
        />
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              max: 255,
              step: 1,
              min: 0,
            },
          }}
          label="Wartość maksymalna <0, 255>"
          color="secondary"
          sx={{ flex: "1" }}
          value={maxval}
          onChange={onChangeMaxval}
        />
      </StyledNumberInputsWrapper>
      <FormControlLabel
        sx={{ margin: 0, justifyContent: "space-between" }}
        label="Konwertuj na obraz monochromatyczny (zalecane)"
        labelPlacement="start"
        defaultChecked
        control={
          <Switch
            checked={grayscale}
            onChange={onChangeGrayscale}
            color="secondary"
          />
        }
      />
      <Button
        variant="contained"
        onClick={handleThresholdOperation}
        disabled={isLoading}
      >
        Wykonaj progowanie proste
      </Button>
    </StyledSubMethodForm>
  );
};

export default ThresholdBasicPanel;
