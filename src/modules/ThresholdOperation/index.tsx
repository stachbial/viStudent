import React, { useState, useCallback, useContext, useEffect } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { IMG_PROC_METHODS } from "../../utils/imgProcConstants";
import { TRESHOLD_TYP, TRESHOLD_PARAMS } from "../../types/imgProcParamsTypes";
import { THRESHOLD_TYPES } from "../../utils/imgProcConstants";
import {
  Typography,
  TextField,
  Button,
  MenuItem,
  FormControlLabel,
  Switch,
} from "@mui/material";
import { StyledSubMethodForm, StyledNumberInputsWrapper } from "./styled";

const ThresholdOperation = () => {
  const { processImage } = useContext(ImageProcessingContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [threshParams, setThreshParams] = useState<TRESHOLD_PARAMS>({
    grayscale: true,
    maxval: null,
    thresh: null,
    typ: null,
  });

  const handleOnChangeNumberThresh = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setThreshParams((prev) => {
        return {
          ...prev,
          thresh: event.target.value,
        };
      });
    },
    [setThreshParams, threshParams]
  );

  const handleOnChangeNumberMaxVal = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setThreshParams((prev) => {
        return {
          ...prev,
          maxval: event.target.value,
        };
      });
    },
    [setThreshParams]
  );

  const handleOnChangeGrayScale = useCallback(() => {
    setThreshParams((prev) => {
      return { ...prev, grayscale: !prev.grayscale };
    });
  }, [setThreshParams, threshParams]);

  const handleOnChangeSelectType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.preventDefault();
      event.stopPropagation();

      setThreshParams((prev) => {
        return {
          ...prev,
          typ: event.target.value as TRESHOLD_TYP,
        };
      });
    },
    [setThreshParams, threshParams]
  );

  const handleThresholdOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.THRESHOLD,
      payload: {
        ...threshParams,
        grayscale: threshParams.grayscale.toString(),
      },
    });
  }, [threshParams]);

  useEffect(() => {
    if (threshParams.maxval && threshParams.thresh && threshParams.typ)
      setIsFormValid(true);
  }, [threshParams]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        Progowanie Proste
      </Typography>
      <TextField
        value={threshParams.typ ? threshParams.typ : ""}
        label="Typ progowania prostego"
        onChange={handleOnChangeSelectType}
        color="secondary"
        select
      >
        {THRESHOLD_TYPES.map((threshType) => {
          return (
            <MenuItem
              value={threshType.value}
            >{`${threshType.name} (${threshType.value})`}</MenuItem>
          );
        })}
      </TextField>
      <StyledNumberInputsWrapper>
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { max: 255, step: 0.01, min: 0 } }}
          label="Dolny próg"
          color="secondary"
          sx={{ flex: "1" }}
          onChange={handleOnChangeNumberThresh}
        />
        <TextField
          disabled={!threshParams.thresh}
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              max: 255,
              step: 0.01,
              min: threshParams.thresh,
            },
          }}
          label="Górny próg"
          color="secondary"
          sx={{ flex: "1" }}
          onChange={handleOnChangeNumberMaxVal}
        />
      </StyledNumberInputsWrapper>
      <FormControlLabel
        sx={{ margin: 0 }}
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
        disabled={!isFormValid}
      >
        Wykonaj progowanie proste
      </Button>
    </StyledSubMethodForm>
  );
};

export default ThresholdOperation;
