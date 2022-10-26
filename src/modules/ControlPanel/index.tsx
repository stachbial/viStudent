import { useState, useCallback } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ControlDrawer from "../ControlDrawer";
import ThresholdingPanel from "../ThresholdingPanel";
import { IMG_PROC_PANELS } from "../../utils/imgProcConstants";
import { StyledWrapper, StyledBackground } from "./styled";

const ControlPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [displayedModule, setDisplayedModule] = useState(
    IMG_PROC_PANELS.THRESHOLDING
  );

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [setDrawerOpen, drawerOpen]);

  const handleDrawerItemClick = useCallback(
    (moduleName: string) => () => {
      setDisplayedModule(moduleName);
      toggleDrawer();
    },
    [setDisplayedModule, toggleDrawer]
  );

  return (
    <StyledWrapper item sm={5.8}>
      <StyledBackground>
        <AppBar position="static">
          <Toolbar component="div" onClick={toggleDrawer} sx={{ gap: "10px" }}>
            <IconButton size="large" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>
            <Typography variant="subtitle1" component="h6">
              {displayedModule}
            </Typography>
          </Toolbar>
        </AppBar>
        <ControlDrawer
          open={drawerOpen}
          onClose={toggleDrawer}
          onItemClick={handleDrawerItemClick}
          items={IMG_PROC_PANELS}
        />

        {displayedModule === IMG_PROC_PANELS.THRESHOLDING && (
          <ThresholdingPanel />
        )}
      </StyledBackground>
    </StyledWrapper>
  );
};

export default ControlPanel;
