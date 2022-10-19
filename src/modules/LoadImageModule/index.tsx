import { useState, useContext } from "react";
import { useRouter } from "next/router";
import { routes } from "../../routes";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import pickFileImage from "../../assets/images/pick-file.jpg";
import takePhotoImage from "../../assets/images/take-photo.jpg";
import Page from "../../components/Page";
import { Grid } from "@mui/material";
import ImageCardsWrapper from "../../components/ImageCardsWrapper";
import ImageCard from "../../components/ImageCard";
import ImageInput from "../../components/ImageInput";
import ImageChoiceLightbox from "../lightbox/ImageChoiceLightbox";
import WebcamLightbox from "../lightbox/WebcamLightbox";

// TODO: rozkminic czy nie sciagnac stany z webview modal i uzywac contextu tylko tu

const LoadImageModule = () => {
  const router = useRouter();
  const { processImage } = useContext(ImageProcessingContext);

  const [showWebcamPreview, setShowWebcamPreview] = useState(false);
  const [chosenImage, setChosenImage] = useState<{
    imageUrl: string;
    imageData: Uint8Array;
  } | null>(null);

  const handleCloseImagePreview = () => {
    setChosenImage(null);
  };
  const handleCloseWebcamPreview = () => {
    setShowWebcamPreview(false);
  };

  const handleOpenWebcamPreview = () => {
    setShowWebcamPreview(true);
  };

  const handleConfirmImage = () => {
    processImage({
      type: "load_image",
      payload: {
        img: chosenImage.imageData,
      },
    });

    router.push(routes.imageProcessingPage);
  };

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
            src={takePhotoImage.src}
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
        onConfirm={() => {}}
      />
    </Page>
  );
};

export default LoadImageModule;
