import { Box, CircularProgress } from "@mui/material";
import React from "react";
import SVG from "./SVG";

function Splash() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      gap={2}
      sx={{ height: "90vh" }}
    >
      <SVG />
      <CircularProgress sx={{ color: "black" }} />
    </Box>
  );
}

export default Splash;
