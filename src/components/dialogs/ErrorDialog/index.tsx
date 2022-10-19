import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { theme } from "../../../theme/theme";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const ErrorDialog = ({ open, onClose, title, children }: Props) => {
  return (
    <Dialog
      PaperProps={{
        style: {
          backgroundColor: theme.palette.primary.dark,
        },
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle color="white" bgcolor={theme.palette.error.main}>
        {title}
      </DialogTitle>
      <DialogContent color="white" dividers>
        {children}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="success" onClick={onClose}>
          ROZUMIEM
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ErrorDialog;
