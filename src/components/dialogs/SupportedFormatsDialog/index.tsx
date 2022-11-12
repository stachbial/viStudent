import { Grid } from "@mui/material";
import ErrorDialog from "../ErrorDialog";
import { StyledExtensionCard, StyledSubtitle } from "../styled";
import { SUPPORTED_IMG_EXTENSIONS } from "../../../utils/IMG_PROC_CONSTANTS";

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
        {SUPPORTED_IMG_EXTENSIONS.map((item) => {
          return (
            <Grid item key={item}>
              <StyledExtensionCard>{`.${item}`}</StyledExtensionCard>
            </Grid>
          );
        })}
      </Grid>
    </ErrorDialog>
  );
};

export default SupportedFormatsDialog;
