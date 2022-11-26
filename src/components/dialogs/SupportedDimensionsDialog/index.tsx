import { Typography } from "@mui/material";
import ErrorDialog from "../ErrorDialog";
import { SUPPORTED_IMG_DIMENSIONS } from "../../../utils/IMG_PROC_CONSTANTS";

const SupportedDimensionsDialog = ({ open, onClose }) => {
  return (
    <ErrorDialog
      open={open}
      onClose={onClose}
      title="Nieprawidłowy format pliku!"
    >
      <Typography>
        {`Maksymalna dopuszczalna rozdzielczość zdjęcia: ${SUPPORTED_IMG_DIMENSIONS.width} x ${SUPPORTED_IMG_DIMENSIONS.height} pikseli.`}
      </Typography>
    </ErrorDialog>
  );
};

export default SupportedDimensionsDialog;
