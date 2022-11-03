import React from "react";
import { FormControlLabel, Switch } from "@mui/material";

const OperationSwitch = ({ checked, onChange, label }) => {
  return (
    <FormControlLabel
      sx={{ margin: 0, justifyContent: "space-between" }}
      label={label}
      labelPlacement="start"
      control={
        <Switch checked={checked} onChange={onChange} color="secondary" />
      }
    />
  );
};

export default OperationSwitch;
