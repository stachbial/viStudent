import { useContext, useCallback } from "react";
import { ImageProcessingContext } from "../../store/ImageProcessingContext";
import { useRouter } from "next/router";
import Image from "next/image";
import { Link, Tooltip, IconButton } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import UndoRoundedIcon from "@mui/icons-material/UndoRounded";
import CameraswitchIcon from "@mui/icons-material/Cameraswitch";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Loader from "../../components/Loader";
import { routes } from "../../routes";
import { IMG_PROC_METHODS } from "../../utils/imgProcConstants";
import {
  StyledModuleWrapper,
  StyledContent,
  StyledHomeButton,
  StyledImageWrapper,
  StyledActions,
} from "./styled";
import { theme } from "../../theme/theme";

const ProcessedImagePreview = () => {
  const router = useRouter();
  const {
    currentImageURL,
    isLoading,
    canUndo,
    processImage,
    undoProcessImage,
  } = useContext(ImageProcessingContext);

  const handleHomeButton = useCallback(() => {
    router.push(routes.home);
  }, []);

  const handleUndoButton = useCallback(() => {
    undoProcessImage();
  }, [undoProcessImage]);

  const handleRotateButton = useCallback(() => {
    processImage({ type: IMG_PROC_METHODS.ROTATE });
  }, [processImage]);

  return (
    <StyledModuleWrapper>
      <StyledContent>
        <Tooltip title="Powrót do ekranu głównego" arrow>
          <StyledHomeButton size="large" onClick={handleHomeButton}>
            <HomeRoundedIcon />
          </StyledHomeButton>
        </Tooltip>
        <StyledImageWrapper>
          {currentImageURL && (
            <Image src={currentImageURL} layout="fill" objectFit="contain" />
          )}
          {isLoading && <Loader />}
        </StyledImageWrapper>
        <StyledActions>
          <Tooltip
            title="Cofnij"
            arrow
            sx={{ background: theme.palette.primary.light }}
          >
            <IconButton
              color="error"
              disabled={!canUndo}
              onClick={handleUndoButton}
            >
              <UndoRoundedIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title="Obróć"
            arrow
            sx={{ background: theme.palette.primary.light }}
          >
            <IconButton
              color="secondary"
              disabled={isLoading}
              onClick={handleRotateButton}
            >
              <CameraswitchIcon />
            </IconButton>
          </Tooltip>
          <Link
            href={currentImageURL ? currentImageURL : ""}
            download="viStudentImage.png"
          >
            <Tooltip
              title="Pobierz zdjęcie"
              arrow
              sx={{ background: theme.palette.primary.light }}
            >
              <IconButton>
                <SaveAsIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </StyledActions>
      </StyledContent>
    </StyledModuleWrapper>
  );
};

export default ProcessedImagePreview;
