import { Grid } from "@mui/material";

const ImageCardsWrapper = ({ children }) => {
  return (
    <Grid
      item
      container
      alignItems="center"
      justifyContent="center"
      spacing={2}
    >
      {children}
    </Grid>
  );
};

export default ImageCardsWrapper;
