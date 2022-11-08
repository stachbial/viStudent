import React, { useState, useCallback, useContext } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { Button, TextField } from "@mui/material";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";
import { serializeImageData } from "../../utils/dataFormattingHelpers";
import { dispatchRustImageOperation } from "../../utils/dispatchRustImageOperation";
import OperationSwitch from "../../components/OperationSwitch";
import HistogramChart from "../../modules/HistogramChart";
import {
  StyledActionsContainer,
  StyledHistContainer,
  StyledMaskOptionsContainer,
} from "./styled";
import {
  useSwitchInputState,
  useNumericInputState,
} from "../../hooks/inputHooks";

// TODO: enhance mask inputs validation -> negative numbers or empty input
// TODO: implement grayscale img conversion in context for no-mask variant

const HistOperation = ({ maskEnabled }) => {
  const { currentImageData, processImage, isLoading } = useContext(
    ImageProcessingContext
  );
  const [histogramJsonData, setHistogramJsonData] = useState<any>(null);
  const [grayscale, setGrayscale] = useSwitchInputState(false);
  const [normalize, setNormalize] = useSwitchInputState(true);
  const { value: maskH, onChange: setMaskH } = useNumericInputState(
    0,
    parseInt
  );
  const { value: maskW, onChange: setMaskW } = useNumericInputState(
    0,
    parseInt
  );
  const { value: maskX, onChange: setMaskX } = useNumericInputState(
    0,
    parseInt
  );
  const { value: maskY, onChange: setMaskY } = useNumericInputState(
    0,
    parseInt
  );

  const handleHistOperation = useCallback(async () => {
    const res = await dispatchRustImageOperation({
      type: IMG_PROC_METHODS.GET_HIST,
      payload: {
        img: serializeImageData(currentImageData),
        grayscale: grayscale.toString(),
        normalize: normalize.toString(),
        maskH: maskH,
        maskW: maskW,
        maskX: maskX,
        maskY: maskY,
      },
    });

    if (maskEnabled) {
      processImage({
        type: IMG_PROC_METHODS.APPLY_RECT_MASK,
        payload: {
          grayscale: grayscale.toString(),
          maskH: maskH,
          maskW: maskW,
          maskX: maskX,
          maskY: maskY,
        },
      });
    }

    const json_res = JSON.parse(
      res.replace("Object ", "").replaceAll("String(", "").replaceAll(")", "")
    );
    setHistogramJsonData(json_res);
  }, [histogramJsonData, maskH, maskW, maskX, maskY, grayscale, normalize]);

  return (
    <>
      {maskEnabled && (
        <StyledMaskOptionsContainer>
          <TextField
            size="small"
            id="mh"
            type="number"
            inputMode="decimal"
            InputProps={{
              inputProps: {
                step: 1,
                min: 0,
              },
            }}
            label="Wysokość maski (px)"
            color="secondary"
            sx={{ flex: "1" }}
            value={maskH}
            onChange={setMaskH}
          />
          <TextField
            size="small"
            id="mw"
            type="number"
            inputMode="decimal"
            InputProps={{
              inputProps: {
                step: 1,
                min: 0,
              },
            }}
            label="Szerokość maski (px)"
            color="secondary"
            sx={{ flex: "1" }}
            value={maskW}
            onChange={setMaskW}
          />
          <TextField
            size="small"
            id="mx"
            type="number"
            inputMode="decimal"
            InputProps={{
              inputProps: {
                step: 1,
                min: 0,
              },
            }}
            label="Pzycja X maski (px)"
            color="secondary"
            sx={{ flex: "1" }}
            value={maskX}
            onChange={setMaskX}
          />
          <TextField
            size="small"
            id="my"
            type="number"
            inputMode="decimal"
            InputProps={{
              inputProps: {
                step: 1,
                min: 0,
              },
            }}
            label="Pozycja Y maski (px)"
            color="secondary"
            sx={{ flex: "1" }}
            value={maskY}
            onChange={setMaskY}
          />
        </StyledMaskOptionsContainer>
      )}
      <StyledActionsContainer>
        <OperationSwitch
          onChange={setGrayscale}
          checked={grayscale}
          label="Konwertuj na obraz monochromatyczny"
        />
        <OperationSwitch
          onChange={setNormalize}
          checked={normalize}
          label="Normalizuj wyniki w przedziale < 0, 100 >"
        />
        <Button
          variant="contained"
          onClick={handleHistOperation}
          disabled={isLoading}
        >
          Wyznacz histogram
        </Button>
      </StyledActionsContainer>
      <StyledHistContainer short={maskEnabled}>
        <HistogramChart jsonData={histogramJsonData} />
      </StyledHistContainer>
    </>
  );
};

export default HistOperation;
