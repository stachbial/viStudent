import React, { useState, useCallback } from "react";
import {
  Drawer,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionActions,
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Logo from "../../components/Logo";
import {
  StyledAccordionWrapper,
  StyledCreditsWrapper,
  StyledLogoWrapper,
} from "./styled";
import { theme } from "../../theme/theme";
import { IMG_PROC_PANELS_DATA } from "../../utils/IMG_PROC_CONSTANTS";

const ControlDrawer = ({
  open,
  onClose,
  onItemClick,
  itemsData: panelsData,
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | false>(
    IMG_PROC_PANELS_DATA.HISTOGRAMS.TITLE
  );

  const handleAccordionExpansion = useCallback(
    (panelName: string) =>
      (event: React.SyntheticEvent, isExpanded: boolean) => {
        setExpandedCategory(isExpanded ? panelName : false);
      },
    [expandedCategory, setExpandedCategory]
  );

  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <Toolbar
        component="div"
        onClick={onClose}
        sx={{
          justifyContent: "space-between",
          background: theme.palette.background.paper,
          opacity: 0.9,
          gap: "120px",
        }}
      >
        <Typography variant="subtitle1" component="h6" fontWeight="bold">
          METODY PRZETWARZANIA OBRAZU
        </Typography>
        <IconButton onClick={onClose} sx={{ marginRight: "4px" }}>
          <CloseRoundedIcon />
        </IconButton>
      </Toolbar>
      <StyledAccordionWrapper>
        {Object.values(panelsData).map((panelData: any) => {
          return (
            <Accordion
              key={panelData.TITLE}
              expanded={expandedCategory === panelData.TITLE}
              onChange={handleAccordionExpansion(panelData.TITLE)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{panelData.TITLE}</Typography>
              </AccordionSummary>
              <AccordionActions
                sx={{
                  flexDirection: "column",
                  gap: "10px",
                  alignItems: "end",
                  marginLeft: "40%",
                }}
              >
                {Object.values(panelData.PANELS).map((panel: any) => {
                  return (
                    <Button
                      size="small"
                      key={panel}
                      variant="contained"
                      onClick={onItemClick({
                        TITLE: panelData.TITLE,
                        PANEL: panel,
                      })}
                      sx={{ color: "#fafafa", width: "100%" }}
                    >
                      {panel}
                    </Button>
                  );
                })}
              </AccordionActions>
            </Accordion>
          );
        })}
      </StyledAccordionWrapper>
      <StyledCreditsWrapper>
        <StyledLogoWrapper>
          <Logo />
        </StyledLogoWrapper>
        <Typography
          sx={{
            color: theme.palette.grey["700"],
            fontSize: "12px",
            paddingLeft: "6px",
          }}
        >
          Autor: S. Białecki, Politechnika Gdańska, Projekt Inżynierski ARiSS
          2022
        </Typography>
      </StyledCreditsWrapper>
    </Drawer>
  );
};

export default ControlDrawer;
