import React, { useCallback, useContext } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { useSelectInputState } from "../../hooks/inputHooks";
import {
  DISTANCE_TYPES,
  DIST_MASK_TYPES,
  IMG_PROC_METHODS,
} from "../../utils/IMG_PROC_CONSTANTS";
import { Typography, TextField, Button, MenuItem } from "@mui/material";
import { StyledSubMethodForm } from "./styled";

const DistanceTransfPanel = () => {
  const { processImage, isLoading } = useContext(ImageProcessingContext);
  const [distanceType, onChangeDistanceType] = useSelectInputState(
    DISTANCE_TYPES[0].value
  );
  const [maskSize, onChangeMaskSize] = useSelectInputState(
    DIST_MASK_TYPES[0].value
  );

  const handleDistanceTransform = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.DISTANCE_TRANSFORM,
      payload: {
        distanceType: distanceType,
        maskSize: maskSize.toString(),
      },
    });
  }, [distanceType, maskSize]);

  return (
    <StyledSubMethodForm fullWidth>
      <Typography component="h5" fontWeight="bold">
        {"Parametry transformaty odległościowej"}
      </Typography>
      <TextField
        label="Sposób wyznaczenia dystansu między pikselami"
        color="secondary"
        select
        value={distanceType}
        onChange={onChangeDistanceType}
      >
        {DISTANCE_TYPES.map((distanceType) => {
          return (
            <MenuItem value={distanceType.value}>{distanceType.name}</MenuItem>
          );
        })}
      </TextField>
      <TextField
        label="Wielkość maski otoczenia piksela"
        color="secondary"
        select
        value={maskSize}
        onChange={onChangeMaskSize}
      >
        {DIST_MASK_TYPES.map((maskType) => {
          return <MenuItem value={maskType.value}>{maskType.name}</MenuItem>;
        })}
      </TextField>
      <Button
        variant="contained"
        onClick={handleDistanceTransform}
        disabled={isLoading}
      >
        Wykonaj tranformate odległościową
      </Button>
    </StyledSubMethodForm>
  );
};

export default DistanceTransfPanel;
