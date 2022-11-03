import { useState, useCallback } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ControlDrawer from "../ControlDrawer";
import ControlSubPanel from "../ControlSubPanel";
import { IMG_PROC_PANELS_DATA } from "../../utils/IMG_PROC_CONSTANTS";
import { StyledWrapper, StyledBackground } from "./styled";

const ControlMainPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [displayedPanelData, setDisplayedPanelData] = useState({
    TITLE: IMG_PROC_PANELS_DATA.THRESHOLDING.TITLE,
    PANEL: IMG_PROC_PANELS_DATA.THRESHOLDING.PANELS.BASIC_ADAPTIVE,
  });

  const toggleDrawer = useCallback(() => {
    setDrawerOpen(!drawerOpen);
  }, [setDrawerOpen, drawerOpen]);

  const handleDrawerItemClick = useCallback(
    (panelData: { TITLE: string; PANEL: string }) => () => {
      setDisplayedPanelData(panelData);
      toggleDrawer();
    },
    [setDisplayedPanelData, toggleDrawer]
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
              {`${displayedPanelData.TITLE} / ${displayedPanelData.PANEL}`}
            </Typography>
          </Toolbar>
        </AppBar>
        <ControlDrawer
          open={drawerOpen}
          onClose={toggleDrawer}
          onItemClick={handleDrawerItemClick}
          itemsData={IMG_PROC_PANELS_DATA}
        />
        <ControlSubPanel displayedSubPanel={displayedPanelData.PANEL} />
      </StyledBackground>
    </StyledWrapper>
  );
};

export default ControlMainPanel;
