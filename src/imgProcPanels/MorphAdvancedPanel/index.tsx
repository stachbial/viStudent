import React, { useState, useCallback, useContext, useEffect } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import {
  IMG_PROC_METHODS,
  MORPH_SHAPES,
  MORPH_ADVANCED_OP_TYPES,
} from "../../utils/IMG_PROC_CONSTANTS";
import {
  MORPH_ADVANCED_TYPE,
  MORPH_SHAPE_TYPE,
  MORPH_ADVANCED_PARAMS,
} from "../../types/imgProcParamsTypes";
import { Typography, TextField, Button, MenuItem } from "@mui/material";
import OperationSwitch from "../../components/ToggleSwitch";
import { StyledSubMethodForm, StyledNumberInputsWrapper } from "./styled";

// TODO: checkout morphSize and secure it's input

const MorphAdvancedPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [isFormValid, setIsFormValid] = useState(false);
  const [morphAdvancedParams, setMorphAdvancedParams] =
    useState<MORPH_ADVANCED_PARAMS>({
      grayscale: false,
      morphShape: null,
      morphSize: null,
      iterations: "1",
      morphType: null,
    });

  const handleOnChangeMorphSize = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setMorphAdvancedParams((prev) => {
        return {
          ...prev,
          morphSize: parseInt(event.target.value).toString(),
        };
      });
    },
    [setMorphAdvancedParams, morphAdvancedParams]
  );

  const handleOnChangeIterations = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setMorphAdvancedParams((prev) => {
        return {
          ...prev,
          iterations: parseInt(event.target.value).toString(),
        };
      });
    },
    [setMorphAdvancedParams]
  );

  const handleOnChangeGrayScale = useCallback(() => {
    event.stopPropagation();

    setMorphAdvancedParams((prev) => {
      return { ...prev, grayscale: !prev.grayscale };
    });
  }, [setMorphAdvancedParams, morphAdvancedParams]);

  const handleOnChangeMorphShape = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setMorphAdvancedParams((prev) => {
        return {
          ...prev,
          morphShape: event.target.value as MORPH_SHAPE_TYPE,
        };
      });
    },
    [setMorphAdvancedParams, morphAdvancedParams]
  );

  const handleOnChangeMorphType = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      event.stopPropagation();

      setMorphAdvancedParams((prev) => {
        return {
          ...prev,
          morphType: event.target.value as MORPH_ADVANCED_TYPE,
        };
      });
    },
    [setMorphAdvancedParams, morphAdvancedParams]
  );

  const handleOperation = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.MORPH_ADVANCED,
      payload: {
        ...morphAdvancedParams,
        grayscale: morphAdvancedParams.grayscale.toString(),
      },
    });
  }, [morphAdvancedParams]);

  useEffect(() => {
    if (
      morphAdvancedParams.morphType &&
      morphAdvancedParams.morphShape &&
      morphAdvancedParams.morphSize &&
      morphAdvancedParams.iterations
    )
      setIsFormValid(true);
  }, [morphAdvancedParams]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Parametry zaawansowanej operacji morfologicznej"}
      </Typography>
      <TextField
        value={
          morphAdvancedParams.morphType ? morphAdvancedParams.morphType : ""
        }
        label="Typ operacji zaawansowanej"
        onChange={handleOnChangeMorphType}
        color="secondary"
        select
      >
        {MORPH_ADVANCED_OP_TYPES.map((morphType) => {
          return (
            <MenuItem
              value={morphType.value}
            >{`${morphType.name} (${morphType.value})`}</MenuItem>
          );
        })}
      </TextField>
      <TextField
        value={
          morphAdvancedParams.morphShape ? morphAdvancedParams.morphShape : ""
        }
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
          value={
            morphAdvancedParams.morphSize ? morphAdvancedParams.morphSize : ""
          }
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
          value={
            morphAdvancedParams.iterations ? morphAdvancedParams.iterations : ""
          }
          onChange={handleOnChangeIterations}
        />
      </StyledNumberInputsWrapper>
      <OperationSwitch
        checked={morphAdvancedParams.grayscale}
        onChange={handleOnChangeGrayScale}
        label="Konwertuj na obraz monochromatyczny"
      />
      <Button
        variant="contained"
        onClick={handleOperation}
        disabled={!isFormValid || isLoading}
      >
        Wykonaj zaawansowaną operację morfologiczną
      </Button>
    </StyledSubMethodForm>
  );
};

export default MorphAdvancedPanel;
