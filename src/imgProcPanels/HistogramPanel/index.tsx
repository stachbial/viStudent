import React, { useState, useCallback, useContext } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { Button, TextField, Typography } from "@mui/material";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";
import { serializeImageData } from "../../utils/dataFormattingHelpers";
import { dispatchRustImageOperation } from "../../utils/dispatchRustImageOperation";
import OperationSwitch from "../../components/ToggleSwitch";
import HistogramChart from "../../modules/HistogramChart";
import {
  StyledActionsContainer,
  StyledHistContainer,
  StyledMaskOptionsContainer,
  StyledEmptyMsgWrapper,
  StyledEmptyDataMsg,
} from "./styled";
import {
  useSwitchInputState,
  useIntegerInputState,
} from "../../hooks/inputHooks";
import { toast } from "react-toastify";

const HistogramPanel = ({ maskEnabled }: { maskEnabled?: boolean }) => {
  const { currentImageData, processImage, isLoading } = useContext(
    ImageProcessingContext
  );
  const [histogramJsonData, setHistogramJsonData] = useState<any>(null);
  const [grayscale, toggleGrayscale] = useSwitchInputState(false);
  const [normalize, toggleNormalize] = useSwitchInputState(true);
  const [maskH, onChangeMaskH] = useIntegerInputState(0, 0, 10000, 1);
  const [maskW, onChangeMaskW] = useIntegerInputState(0, 0, 10000, 1);
  const [maskX, onChangeMaskX] = useIntegerInputState(0, 0, 10000, 1);
  const [maskY, onChangeMaskY] = useIntegerInputState(0, 0, 10000, 1);

  const handleHistOperation = useCallback(async () => {
    try {
      const res = await dispatchRustImageOperation({
        type: IMG_PROC_METHODS.GET_HIST,
        payload: {
          img: serializeImageData(currentImageData),
          grayscale: grayscale.toString(),
          normalize: normalize.toString(),
          maskH: maskH.toString(),
          maskW: maskW.toString(),
          maskX: maskX.toString(),
          maskY: maskY.toString(),
        },
      });

      if (maskEnabled) {
        processImage({
          type: IMG_PROC_METHODS.APPLY_RECT_MASK,
          payload: {
            grayscale: grayscale.toString(),
            maskH: maskH.toString(),
            maskW: maskW.toString(),
            maskX: maskX.toString(),
            maskY: maskY.toString(),
          },
        });
      } else {
        if (grayscale)
          processImage({
            type: IMG_PROC_METHODS.LOAD_IMAGE,
            payload: {
              img: serializeImageData(currentImageData),
              grayscale: grayscale.toString(),
            },
          });
      }

      const json_res = JSON.parse(
        res.replace("Object ", "").replaceAll("String(", "").replaceAll(")", "")
      );
      setHistogramJsonData(json_res);
    } catch (e) {
      console.error(`error while getting histogram data: ${e}`);
      toast.error(e, {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [
    histogramJsonData,
    maskH,
    maskW,
    maskX,
    maskY,
    grayscale,
    normalize,
    currentImageData,
  ]);

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
            onChange={onChangeMaskH}
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
            onChange={onChangeMaskW}
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
            onChange={onChangeMaskX}
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
            onChange={onChangeMaskY}
          />
        </StyledMaskOptionsContainer>
      )}
      <StyledActionsContainer>
        <OperationSwitch
          onChange={toggleGrayscale}
          checked={grayscale}
          label="Konwertuj na obraz monochromatyczny"
        />
        <OperationSwitch
          onChange={toggleNormalize}
          checked={normalize}
          label="Normalizuj wyniki w przedziale < 0, 100 >"
        />
        <Button
          variant="contained"
          onClick={handleHistOperation}
          disabled={isLoading || currentImageData === null}
        >
          Wyznacz histogram
        </Button>
      </StyledActionsContainer>
      <StyledHistContainer short={maskEnabled}>
        {!histogramJsonData && (
          <StyledEmptyMsgWrapper>
            <StyledEmptyDataMsg>
              <Typography>BRAK DANYCH HISTOGRAMU !</Typography>
              <Typography>
                Wyznacz histogram w celu uzyskania wykresu.
              </Typography>
            </StyledEmptyDataMsg>
          </StyledEmptyMsgWrapper>
        )}
        <HistogramChart jsonData={histogramJsonData} />
      </StyledHistContainer>
    </>
  );
};

export default HistogramPanel;
