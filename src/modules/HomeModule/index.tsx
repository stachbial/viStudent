import cameraImage from "../../assets/images/use-camera.jpg";
import photoChoiceImage from "../../assets/images/use-photo.jpg";
import Page from "../../components/Page";
import { Grid } from "@mui/material";
import Link from "next/link";
import ImageCard from "../../components/ImageCard";
import ImageCardsWrapper from "../../components/ImageCardsWrapper";
import { routes } from "../../routes";

const HomeModule = () => {
  return (
    <Page
      container
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <ImageCardsWrapper>
        <Link href={routes.loadImagePage} passHref>
          <Grid item>
            <ImageCard
              src={photoChoiceImage.src}
              text="OPERACJE NA PLIKU ZDJĘCIOWYM"
            />
          </Grid>
        </Link>
        <Link href={routes.videoOperationsPage} passHref>
          <Grid item>
            <ImageCard
              src={cameraImage.src}
              text="OPERACJE NA VIDEO Z KAMERY"
            />
          </Grid>
        </Link>
      </ImageCardsWrapper>
    </Page>
  );
};

export default HomeModule;
