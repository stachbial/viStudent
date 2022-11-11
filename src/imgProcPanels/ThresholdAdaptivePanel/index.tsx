import React, { useState, useCallback, useContext, useEffect } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";
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

const ThresholdAdaptivePanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [threshParams, setThreshParams] = useState<TRESHOLD_ADPT_PARAMS>({
    grayscale: true,
    threshTyp: null,
    adaptiveMethod: null,
    maxval: null,
    blockSize: null,
    c: null,
  });

  const handleOnChangeMaxval = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setThreshParams((prev) => {
        return {
          ...prev,
          maxval: parseFloat(event.target.value).toString(),
        };
      });
    },
    [setThreshParams, threshParams]
  );

  const handleOnChangeBlockSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setThreshParams((prev) => {
        return {
          ...prev,
          blockSize: parseInt(event.target.value).toString(),
        };
      });
    },
    [setThreshParams, threshParams]
  );

  const handleOnChangeC = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setThreshParams((prev) => {
        return {
          ...prev,
          c: parseFloat(event.target.value).toString(),
        };
      });
    },
    [setThreshParams, threshParams]
  );

  const handleOnChangeGrayScale = useCallback(() => {
    setThreshParams((prev) => {
      return { ...prev, grayscale: !prev.grayscale };
    });
  }, [setThreshParams, threshParams]);

  const handleOnChangeThreshType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setThreshParams((prev) => {
        return {
          ...prev,
          threshTyp: event.target.value as TRESHOLD_TYP,
        };
      });
    },
    [setThreshParams, threshParams]
  );

  const handleOnChangeMethodType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setThreshParams((prev) => {
        return {
          ...prev,
          adaptiveMethod: event.target.value as THRESHOLD_ADPT_METHOD_TYP,
        };
      });
    },
    [setThreshParams, threshParams]
  );

  const handleThresholdOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.ADAPTIVE_THRESHOLD,
      payload: {
        ...threshParams,
        grayscale: threshParams.grayscale.toString(),
      },
    });
  }, [processImage, threshParams]);

  useEffect(() => {
    if (
      threshParams.maxval &&
      threshParams.adaptiveMethod &&
      threshParams.threshTyp &&
      threshParams.blockSize &&
      threshParams.c
    )
      setIsFormValid(true);
  }, [threshParams]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Progowanie Adaptacyjne (lokalne)"}
      </Typography>
      <StyledInputsWrapper>
        <TextField
          value={threshParams.threshTyp ? threshParams.threshTyp : ""}
          label="Typ progowania"
          onChange={handleOnChangeThreshType}
          color="secondary"
          sx={{ flex: "1" }}
          select
        >
          {THRESHOLD_TYPES.filter((type) => type.value.includes("BINARY")).map(
            (threshType) => {
              return (
                <MenuItem
                  value={threshType.value}
                >{`${threshType.name} (${threshType.value})`}</MenuItem>
              );
            }
          )}
        </TextField>
        <TextField
          value={threshParams.adaptiveMethod ? threshParams.adaptiveMethod : ""}
          label="Metoda adaptacyjna"
          onChange={handleOnChangeMethodType}
          color="secondary"
          sx={{ flex: "1" }}
          select
        >
          {THRESHOLD_ADPT_METHODS_TYPES.map((threshType) => {
            return (
              <MenuItem
                value={threshType.value}
              >{`${threshType.name} (${threshType.value})`}</MenuItem>
            );
          })}
        </TextField>
      </StyledInputsWrapper>
      <StyledInputsWrapper>
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 255, step: 0.01, min: 0 } }}
          label="Próg (max: 255)"
          color="secondary"
          sx={{ flex: "1" }}
          value={threshParams.maxval ? threshParams.maxval : ""}
          onChange={handleOnChangeMaxval}
        />
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 255, step: 2, min: 3 } }}
          label="Otoczenie pixeli"
          color="secondary"
          sx={{ flex: "1" }}
          value={threshParams.blockSize ? threshParams.blockSize : ""}
          onChange={handleOnChangeBlockSize}
        />
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              max: 255,
              step: 0.01,
              min: 0,
            },
          }}
          label="Próg globalny C"
          color="secondary"
          sx={{ flex: "1" }}
          value={threshParams.c ? threshParams.c : ""}
          onChange={handleOnChangeC}
        />
      </StyledInputsWrapper>
      <FormControlLabel
        sx={{ margin: 0, justifyContent: "space-between" }}
        label="Konwertuj na obraz monochromatyczny (zalecane)"
        labelPlacement="start"
        defaultChecked
        control={
          <Switch
            checked={threshParams.grayscale}
            onChange={handleOnChangeGrayScale}
            color="secondary"
          />
        }
      />
      <Button
        variant="contained"
        onClick={handleThresholdOperation}
        disabled={!isFormValid || isLoading}
      >
        Wykonaj progowanie adaptacyjne
      </Button>
    </StyledSubMethodForm>
  );
};

export default ThresholdAdaptivePanel;
