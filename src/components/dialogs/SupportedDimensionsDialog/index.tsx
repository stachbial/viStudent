import { Typography } from "@mui/material";
import { theme } from "../../../theme/theme";
import ErrorDialog from "../ErrorDialog";

const SupportedDimensionsDialog = ({ open, onClose }) => {
  return (
    <ErrorDialog
      open={open}
      onClose={onClose}
      title="Nieprawidłowy format pliku!"
    >
      <Typography>
        Maksymalna dopuszczalna rozdzielczość zdjęcia: 1000 x 1000 pikseli.
      </Typography>
    </ErrorDialog>
  );
};

export default SupportedDimensionsDialog;
