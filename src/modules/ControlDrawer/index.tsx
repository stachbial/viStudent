import { useCallback } from "react";
import { Drawer, Toolbar, IconButton, Typography, Button } from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Divider from "../../components/Divider";
import { StyledModulesList, StyledListItem } from "./styled";
import { theme } from "../../theme/theme";

const ControlDrawer = ({ open, onClose, onItemClick, items: modules }) => {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Toolbar
        component="div"
        onClick={onClose}
        sx={{
          justifyContent: "flex-end",
          background: theme.palette.background.paper,
          opacity: 0.9,
          gap: "120px",
        }}
      >
        <Typography variant="subtitle1" component="h6">
          Metody przetwarzania obrazu
        </Typography>
        <IconButton onClick={onClose}>
          <CloseRoundedIcon />
        </IconButton>
      </Toolbar>
      <StyledModulesList>
        {Object.values(modules).map((module: string) => {
          return (
            <StyledListItem>
              <Button
                key={module}
                color="secondary"
                onClick={onItemClick(module)}
              >
                {module}
              </Button>
              <Divider />
            </StyledListItem>
          );
        })}
      </StyledModulesList>
    </Drawer>
  );
};

export default ControlDrawer;
