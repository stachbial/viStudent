import { useState, useContext, useCallback } from "react";
import { useRouter } from "next/router";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { Grid } from "@mui/material";
import pickFileImage from "../../assets/images/pick-file.jpg";
import cameraImage from "../../assets/images/use-camera.jpg";
import Page from "../../components/Page";
import ImageCardsWrapper from "../../components/ImageCardsWrapper";
import ImageCard from "../../components/ImageCard";
import ImageInput from "../../components/ImageInput";
import ImageChoiceLightbox from "../lightbox/ImageChoiceLightbox";
import WebcamLightbox from "../lightbox/WebcamLightbox";
import { routes } from "../../routes";
import { serializeImageData } from "../../utils/dataFormattingHelpers";
import { IMG_PROC_METHODS } from "../../utils/IMG_PROC_CONSTANTS";

// TODO: rozkminic czy nie sciagnac stany z webview modal i uzywac contextu tylko tu

const HomePageModule = () => {
  const router = useRouter();
  const { processImage } = useContext(ImageProcessingContext);

  const [showWebcamPreview, setShowWebcamPreview] = useState(false);
  const [chosenImage, setChosenImage] = useState<{
    imageUrl: string;
    imageData: Uint8Array;
  } | null>(null);

  const handleCloseImagePreview = useCallback(() => {
    setChosenImage(null);
  }, [setChosenImage]);

  const handleCloseWebcamPreview = useCallback(() => {
    setShowWebcamPreview(false);
  }, [setShowWebcamPreview]);

  const handleOpenWebcamPreview = useCallback(() => {
    setShowWebcamPreview(true);
  }, [setShowWebcamPreview]);

  const handleConfirmImage = useCallback(() => {
    processImage({
      type: IMG_PROC_METHODS.LOAD_IMAGE,
      payload: {
        img: serializeImageData(chosenImage.imageData),
        grayscale: "false",
      },
    });

    router.push(routes.imageProcessingPage);
  }, [chosenImage, router]);

  return (
    <Page
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <ImageCardsWrapper>
        <Grid item>
          <ImageInput setImageData={setChosenImage}>
            <ImageCard src={pickFileImage.src} text="WYBIERZ ZDJĘCIE" />
          </ImageInput>
        </Grid>
        <Grid item>
          <ImageCard
            src={cameraImage.src}
            text="ZRÓB ZDJĘCIE"
            onClick={handleOpenWebcamPreview}
          />
        </Grid>
      </ImageCardsWrapper>
      <ImageChoiceLightbox
        open={chosenImage !== null}
        onBackdropClose={handleCloseImagePreview}
        src={chosenImage?.imageUrl ? chosenImage.imageUrl : ""}
        onConfirm={handleConfirmImage}
        onSetNewImage={setChosenImage}
      />
      <WebcamLightbox
        open={showWebcamPreview}
        onBackdropClose={handleCloseWebcamPreview}
      />
    </Page>
  );
};

export default HomePageModule;