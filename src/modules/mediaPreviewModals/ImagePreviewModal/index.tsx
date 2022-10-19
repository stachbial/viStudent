import Image from "next/image";
import { Button, Typography } from "@mui/material";
import ImageInput from "../../../components/ImageInput";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import {
  StyledModal,
  StyledMediaWrapper,
  StyledActions,
  StyledTitle,
  StyledExitButtonWrapper,
} from "../styled";

const ImagePreviewModal = ({
  open,
  onBackdropClose,
  src,
  onConfirm,
  onSetNewImage,
}) => {
  return (
    <StyledModal open={open} onClose={onBackdropClose}>
      <>
        <StyledTitle>
          <Typography fontWeight="700">PODGLĄD WYBRANEGO ZDJĘCIA</Typography>
          <StyledExitButtonWrapper>
            <Button
              variant="outlined"
              color="error"
              startIcon={<CloseRoundedIcon />}
              onClick={onBackdropClose}
            >
              ANULUJ
            </Button>
          </StyledExitButtonWrapper>
        </StyledTitle>

        <StyledMediaWrapper>
          <Image src={src} layout="fill" objectFit="contain" />
        </StyledMediaWrapper>

        <StyledActions>
          <ImageInput
            asButton
            text="WYBIERZ INNE ZDJĘCIE"
            setImageData={onSetNewImage}
          />

          <Button
            variant="contained"
            color="success"
            startIcon={<CheckRoundedIcon />}
            onClick={onConfirm}
          >
            KONTYNUUJ
          </Button>
        </StyledActions>
      </>
    </StyledModal>
  );
};

export default ImagePreviewModal;

// <StyledModuleWrapper item sm>
//   <StyledContentWrapper>
//     {currentImageURL && (
//       <Image
//         width={300}
//         height={300}
//         objectFit="cover"
//         src={currentImageURL}
//       />
//     )}
//     <AttachFileOutlinedIcon sx={{ fontSize: 80 }} />
//     <StyledInputControlsWrapper>
//       <ImageInputButton text="Dodaj zdjęcie" />
//       <Button variant="contained" startIcon={<CameraAltOutlinedIcon />}>
//         Zrób zdjęcie
//       </Button>
//     </StyledInputControlsWrapper>
//   </StyledContentWrapper>
// </StyledModuleWrapper>
