import { useState, useCallback, useRef, useContext } from "react";
import { useRouter } from "next/router";
import { ImageProcessingContext } from "../../../store/ImageProcessingContext";
import { Button, Typography } from "@mui/material";
import Webcam from "react-webcam";
import Image from "next/image";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import LoopIcon from "@mui/icons-material/Loop";
import ChooseCameraDialog from "../../../components/dialogs/ChooseCameraDialog";
import Loader from "../../../components/Loader";
import { routes } from "../../../routes";
import { IMG_PROC_METHODS } from "../../../utils/IMG_PROC_CONSTANTS";
import {
  getImageDataFromBuffer,
  serializeImageData,
} from "../../../utils/dataFormattingHelpers";
import {
  currentImageData,
  currentImageURL,
} from "../../../types/ImageProcessingContextTypes";
import {
  StyledModal,
  StyledMediaWrapper,
  StyledActions,
  StyledTitle,
  StyledExitButtonWrapper,
} from "../styled";

const WebcamLightbox = ({ open, onBackdropClose, onConfirm }) => {
  const router = useRouter();
  const { processImage } = useContext(ImageProcessingContext);
  const [deviceId, setDeviceId] = useState<string | null>(null);
  const [screenShotImageData, setScreenshotImageData] = useState<{
    screenshotURL: currentImageURL;
    screenshotData: currentImageData;
  } | null>(null);
  const webcamRef = useRef(null);

  const handleConfirmDevice = useCallback(
    (deviceId: string) => {
      setDeviceId(deviceId);
    },
    [setDeviceId]
  );

  const handleCloseModal = useCallback(() => {
    setDeviceId(null);
    setScreenshotImageData(null);
    onBackdropClose();
  }, [setDeviceId, onBackdropClose]);

  const handleTakeScreenshot = useCallback(async () => {
    const canvas = webcamRef.current.getCanvas() as HTMLCanvasElement;

    if (canvas) {
      const res = await fetch(canvas.toDataURL("image/png"));
      const blob = await res.blob();

      const reader = new FileReader();
      reader.readAsArrayBuffer(blob);

      reader.onload = (e) => {
        const { imageUrl, uint8imageData } = getImageDataFromBuffer(
          e.target.result as ArrayBuffer
        );
        setScreenshotImageData({
          screenshotURL: imageUrl,
          screenshotData: uint8imageData,
        });
      };
    }
  }, [setScreenshotImageData, webcamRef]);

  const handleRetakeScreenshot = useCallback(() => {
    setScreenshotImageData(null);
  }, [setScreenshotImageData]);

  const handleConfirmImage = () => {
    processImage({
      type: IMG_PROC_METHODS.LOAD_IMAGE,
      payload: {
        img: serializeImageData(screenShotImageData.screenshotData),
        grayscale: "false",
      },
    });

    router.push(routes.imageProcessingPage);
  };

  return !deviceId ? (
    <ChooseCameraDialog
      open={open && !deviceId}
      onClose={handleCloseModal}
      onConfirmDevice={handleConfirmDevice}
    />
  ) : (
    <StyledModal open={open} onClose={handleCloseModal}>
      <>
        <StyledTitle>
          <Typography fontWeight="700">PODGLĄD Z KAMERY</Typography>
          <StyledExitButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CloseRoundedIcon />}
              onClick={handleCloseModal}
            >
              ANULUJ
            </Button>
          </StyledExitButtonWrapper>
        </StyledTitle>

        <StyledMediaWrapper>
          <Loader />
          {!screenShotImageData ? (
            <Webcam
              ref={webcamRef}
              audio={false}
              imageSmoothing
              mirrored
              videoConstraints={{ deviceId: deviceId, facingMode: "user" }}
            />
          ) : (
            <Image
              src={
                screenShotImageData.screenshotURL
                  ? screenShotImageData.screenshotURL
                  : ""
              }
              layout="fill"
              objectFit="contain"
            />
          )}
        </StyledMediaWrapper>

        <StyledActions>
          {!screenShotImageData ? (
            <Button
              variant="contained"
              startIcon={<CameraAltRoundedIcon />}
              onClick={handleTakeScreenshot}
            >
              ZRÓB ZDJĘCIE
            </Button>
          ) : (
            <>
              <Button
                variant="contained"
                startIcon={<LoopIcon />}
                onClick={handleRetakeScreenshot}
              >
                POWTÓRZ
              </Button>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckRoundedIcon />}
                onClick={handleConfirmImage}
              >
                KONTYNUUJ
              </Button>
            </>
          )}
        </StyledActions>
      </>
    </StyledModal>
  );
};

export default WebcamLightbox;
