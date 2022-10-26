import { useEffect, useState, useCallback } from "react";
import ErrorDialog from "../ErrorDialog";
import { theme } from "../../../theme/theme";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";

const ChooseCameraDialog = ({ open, onClose, onConfirmDevice }) => {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[] | null>(
    null
  );
  const [chosenDeviceID, setChosenDeviceID] = useState<string | null>(null);

  const handleSelect = useCallback(
    (event: SelectChangeEvent) => {
      event.preventDefault();
      event.stopPropagation();

      setChosenDeviceID(event.target.value);
    },
    [setChosenDeviceID]
  );

  const handleConfirmButton = useCallback(() => {
    onConfirmDevice(chosenDeviceID);
    setChosenDeviceID(null);
    setVideoDevices(null);
  }, [onConfirmDevice, setChosenDeviceID, chosenDeviceID]);

  const handleVideoDevices = useCallback(async () => {
    await navigator.mediaDevices.getUserMedia({ audio: false, video: true });
    const mediaDevices = await navigator.mediaDevices.enumerateDevices();

    setVideoDevices(mediaDevices.filter(({ kind }) => kind === "videoinput"));
  }, [setVideoDevices]);

  useEffect(() => {
    // TODO: flashing error msg after setting media devices tu null and opening again
    // TODO: secure case when video access denied
    if (open) handleVideoDevices();
  }, [open]);

  return !videoDevices ? (
    <ErrorDialog open={open} onClose={onClose} title="BŁĄD: brak urządzeń">
      Na Twoim komputerze nie wykryto żadnych urządzeń video.
    </ErrorDialog>
  ) : (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle
        width={500}
        color="white"
        bgcolor={theme.palette.success.main}
      >
        Wybierz źródło video:
      </DialogTitle>
      <DialogContent dividers>
        <FormControl fullWidth>
          <InputLabel id="vide-input-select-label">Nazwa kamery</InputLabel>
          <Select
            labelId="vide-input-select-label"
            id="vide-input-select"
            value={chosenDeviceID ? chosenDeviceID : ""}
            label="Nazwa kamery"
            onChange={handleSelect}
          >
            {videoDevices.length &&
              videoDevices.map((device, key) => {
                return (
                  <MenuItem value={device.deviceId}>
                    {device.label || `Device ${key + 1}`}
                  </MenuItem>
                );
              })}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions
        style={{
          justifyContent: "space-between",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
        }}
      >
        <Button variant="outlined" color="error" onClick={onClose}>
          ANULUJ
        </Button>
        <Button
          disabled={chosenDeviceID === null}
          variant="outlined"
          color="success"
          onClick={handleConfirmButton}
        >
          Kontynuuj
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChooseCameraDialog;
