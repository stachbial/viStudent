import React, { useState, useCallback, useContext, useEffect } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";
import {
  useIntegerInputState,
  useSelectInputState,
} from "../../hooks/inputHooks";
import {
  TRESHOLD_TYP,
  TRESHOLD_ADPT_PARAMS,
  THRESHOLD_ADPT_METHOD_TYP,
} from "../../types/imgProcParamsTypes";
import {
  THRESHOLD_TYPES,
  THRESHOLD_ADPT_METHODS_TYPES,
} from "../../utils/IMG_PROC_CONSTANTS";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { StyledSubMethodForm, StyledInputsWrapper } from "./styled";

// TODO: find out value ranges for blockSize and c
// TODO: implement input debouncing
// TODO: secure input

const ThresholdAdaptivePanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [maxval, onChangeMaxval] = useIntegerInputState(255, 0, 255);
  const [blockSize, onChangeBlockSize] = useIntegerInputState(3, 1, 11);
  const [c, onChangeC] = useIntegerInputState(11, 0, 255);
  const [threshTyp, onChangeThreshTyp] = useSelectInputState(
    THRESHOLD_TYPES[0].value
  );
  const [adaptiveMethod, onChangeAdaptiveMethod] = useSelectInputState(
    THRESHOLD_ADPT_METHODS_TYPES[0].value
  );

  const handleThresholdOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.ADAPTIVE_THRESHOLD,
      payload: {
        maxval: maxval.toString(),
        blockSize: blockSize.toString(),
        c: c.toString(),
        threshTyp: threshTyp.toString(),
        adaptiveMethod: adaptiveMethod.toString(),
      },
    });
  }, [maxval, blockSize, c, threshTyp, adaptiveMethod]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Progowanie Adaptacyjne (lokalne)"}
      </Typography>
      <StyledInputsWrapper>
        <TextField
          value={threshTyp}
          label="Typ progowania"
          onChange={onChangeThreshTyp}
          color="secondary"
          sx={{ flex: "1" }}
          select
        >
          {THRESHOLD_TYPES.filter((type) => type.value.includes("BINARY")).map(
            (threshType) => {
              return (
                <MenuItem value={threshType.value}>{threshType.name}</MenuItem>
              );
            }
          )}
        </TextField>
        <TextField
          value={adaptiveMethod}
          label="Metoda adaptacyjna"
          onChange={onChangeAdaptiveMethod}
          color="secondary"
          sx={{ flex: "1" }}
          select
        >
          {THRESHOLD_ADPT_METHODS_TYPES.map((adaptiveMethodType) => {
            return (
              <MenuItem value={adaptiveMethodType.value}>
                {adaptiveMethodType.name}
              </MenuItem>
            );
          })}
        </TextField>
      </StyledInputsWrapper>
      <TextField
        id="Thresh"
        type="number"
        inputMode="decimal"
        InputProps={{ inputProps: { max: 11, step: 2, min: 1 } }}
        label="Szerokość przekątnej otoczenia (px)"
        color="secondary"
        sx={{ flex: "1" }}
        value={blockSize}
        onChange={onChangeBlockSize}
      />
      <StyledInputsWrapper>
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 255, step: 1, min: 0 } }}
          label="Wartość maksymalna"
          color="secondary"
          sx={{ flex: "1" }}
          value={maxval}
          onChange={onChangeMaxval}
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
          label="Próg globalny C"
          color="secondary"
          sx={{ flex: "1" }}
          value={c}
          onChange={onChangeC}
        />
      </StyledInputsWrapper>

      <Button
        variant="contained"
        onClick={handleThresholdOperation}
        disabled={isLoading}
      >
        Wykonaj progowanie adaptacyjne
      </Button>
    </StyledSubMethodForm>
  );
};

export default ThresholdAdaptivePanel;
