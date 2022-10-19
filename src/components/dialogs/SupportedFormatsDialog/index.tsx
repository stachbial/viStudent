import { Grid } from "@mui/material";
import ErrorDialog from "../ErrorDialog";
import { StyledExtensionCard, StyledSubtitle } from "../styled";
import { supportedImageExtensions } from "../../../utils/imageInputValidation";

const SupportedFormatsDialog = ({ open, onClose }) => {
  return (
    <ErrorDialog
      open={open}
      onClose={onClose}
      title="Nieprawidłowy format pliku!"
    >
      <StyledSubtitle>
        Obsługiwane rozszerzenia plików zdjęciowych:
      </StyledSubtitle>
      <Grid container spacing={2}>
        {supportedImageExtensions.map((item) => {
          return (
            <Grid item>
              <StyledExtensionCard>{`.${item}`}</StyledExtensionCard>
            </Grid>
          );
        })}
      </Grid>
    </ErrorDialog>
  );
};

export default SupportedFormatsDialog;
