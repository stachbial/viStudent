import React, { useState, useCallback, useContext, useEffect } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { IMG_PROC_METHODS, MORPH_SHAPES } from "../../utils/IMG_PROC_CONSTANTS";
import {
  MORPH_SHAPE_TYPE,
  ERODE_DILATE_PARAMS,
} from "../../types/imgProcParamsTypes";
import { Typography, TextField, Button, MenuItem } from "@mui/material";
import OperationSwitch from "../../components/ToggleSwitch";
import { StyledSubMethodForm, StyledNumberInputsWrapper } from "./styled";

// TODO: checkout morphSize and secure it's input

const MorphDilatePanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [dilateParams, setDilateParams] = useState<ERODE_DILATE_PARAMS>({
    grayscale: false,
    morphShape: null,
    morphSize: null,
    iterations: "1",
  });

  const handleOnChangeMorphSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setDilateParams((prev) => {
        return {
          ...prev,
          morphSize: parseInt(event.target.value).toString(),
        };
      });
    },
    [setDilateParams, dilateParams]
  );

  const handleOnChangeIterations = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setDilateParams((prev) => {
        return {
          ...prev,
          iterations: parseInt(event.target.value).toString(),
        };
      });
    },
    [setDilateParams]
  );

  const handleOnChangeGrayScale = useCallback(() => {
    event.stopPropagation();

    setDilateParams((prev) => {
      return { ...prev, grayscale: !prev.grayscale };
    });
  }, [setDilateParams, dilateParams]);

  const handleOnChangeMorphShape = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setDilateParams((prev) => {
        return {
          ...prev,
          morphShape: event.target.value as MORPH_SHAPE_TYPE,
        };
      });
    },
    [setDilateParams, dilateParams]
  );

  const handleDilateOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.DILATATION,
      payload: {
        ...dilateParams,
        grayscale: dilateParams.grayscale.toString(),
      },
    });
  }, [dilateParams]);

  useEffect(() => {
    if (
      dilateParams.morphShape &&
      dilateParams.morphSize &&
      dilateParams.iterations
    )
      setIsFormValid(true);
  }, [dilateParams]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Dylatacja"}
      </Typography>
      <TextField
        value={dilateParams.morphShape ? dilateParams.morphShape : ""}
        label="Element strukturalny"
        onChange={handleOnChangeMorphShape}
        color="secondary"
        select
      >
        {MORPH_SHAPES.map((morphShape) => {
          return (
            <MenuItem
              value={morphShape.value}
            >{`${morphShape.name} (${morphShape.value})`}</MenuItem>
          );
        })}
      </TextField>
      <StyledNumberInputsWrapper>
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{ inputProps: { step: 2, min: 1 } }}
          label="Wielkość el. strukturalnego"
          color="secondary"
          sx={{ flex: "1" }}
          value={dilateParams.morphSize ? dilateParams.morphSize : ""}
          onChange={handleOnChangeMorphSize}
        />
        <TextField
          id="Thresh"
          type="number"
          inputMode="decimal"
          InputProps={{
            inputProps: {
              step: 1,
              min: 1,
            },
          }}
          label="Liczba iteracji"
          color="secondary"
          sx={{ flex: "1" }}
          value={dilateParams.iterations ? dilateParams.iterations : ""}
          onChange={handleOnChangeIterations}
        />
      </StyledNumberInputsWrapper>
      <OperationSwitch
        checked={dilateParams.grayscale}
        onChange={handleOnChangeGrayScale}
        label="Konwertuj na obraz monochromatyczny"
      />
      <Button
        variant="contained"
        onClick={handleDilateOperation}
        disabled={!isFormValid || isLoading}
      >
        Wykonaj operację Dylatacji
      </Button>
    </StyledSubMethodForm>
  );
};

export default MorphDilatePanel;
