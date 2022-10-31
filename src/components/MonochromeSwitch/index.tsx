import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

const MonochromeSwitch = ({ checked, onChange }) => {
  return (
    <FormControlLabel
      sx={{ margin: 0, justifyContent: "space-between" }}
      label="Konwertuj na obraz monochromatyczny"
      labelPlacement="start"
      control={
        <Switch checked={checked} onChange={onChange} color="secondary" />
      }
    />
  );
};

export default MonochromeSwitch;
