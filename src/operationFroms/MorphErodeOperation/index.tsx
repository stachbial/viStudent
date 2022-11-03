import React, { useState, useCallback, useContext, useEffect } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { IMG_PROC_METHODS, MORPH_SHAPES } from "../../utils/IMG_PROC_CONSTANTS";
import {
  MORPH_SHAPE_TYPE,
  ERODE_DILATE_PARAMS,
} from "../../types/imgProcParamsTypes";
import { Typography, TextField, Button, MenuItem } from "@mui/material";
import OperationSwitch from "../../components/OperationSwitch";
import { StyledSubMethodForm, StyledNumberInputsWrapper } from "./styled";

// TODO: checkout morphSize and secure it's input

const MorphErodeOperation = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [erodeParams, setErodeParams] = useState<ERODE_DILATE_PARAMS>({
    grayscale: false,
    morphShape: null,
    morphSize: null,
    iterations: "1",
  });

  const handleOnChangeMorphSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setErodeParams((prev) => {
        return {
          ...prev,
          morphSize: parseInt(event.target.value).toString(),
        };
      });
    },
    [setErodeParams, erodeParams]
  );

  const handleOnChangeIterations = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setErodeParams((prev) => {
        return {
          ...prev,
          iterations: parseInt(event.target.value).toString(),
        };
      });
    },
    [setErodeParams]
  );

  const handleOnChangeGrayScale = useCallback(() => {
    event.stopPropagation();

    setErodeParams((prev) => {
      return { ...prev, grayscale: !prev.grayscale };
    });
  }, [setErodeParams, erodeParams]);

  const handleOnChangeMorphShape = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setErodeParams((prev) => {
        return {
          ...prev,
          morphShape: event.target.value as MORPH_SHAPE_TYPE,
        };
      });
    },
    [setErodeParams, erodeParams]
  );

  const handleErodeOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.EROSION,
      payload: {
        ...erodeParams,
        grayscale: erodeParams.grayscale.toString(),
      },
    });
  }, [erodeParams]);

  useEffect(() => {
    if (
      erodeParams.morphShape &&
      erodeParams.morphSize &&
      erodeParams.iterations
    )
      setIsFormValid(true);
  }, [erodeParams]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Erozja"}
      </Typography>
      <TextField
        value={erodeParams.morphShape ? erodeParams.morphShape : ""}
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
          value={erodeParams.morphSize ? erodeParams.morphSize : ""}
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
          value={erodeParams.iterations ? erodeParams.iterations : ""}
          onChange={handleOnChangeIterations}
        />
      </StyledNumberInputsWrapper>
      <OperationSwitch
        checked={erodeParams.grayscale}
        onChange={handleOnChangeGrayScale}
        label="Konwertuj na obraz monochromatyczny"
      />
      <Button
        variant="contained"
        onClick={handleErodeOperation}
        disabled={!isFormValid || isLoading}
      >
        Wykonaj operację erozji
      </Button>
    </StyledSubMethodForm>
  );
};

export default MorphErodeOperation;
