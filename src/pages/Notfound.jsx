import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SVG from "../components/SVG";
import { useNavigate } from "react-router-dom";

function Notfound() {
  const navigate = useNavigate();
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      sx={{ height: "80vh" }}
    >
      <SVG />
      <Typography variant="h2" p={1}>
        Page Not Found
      </Typography>
      <Typography variant="caption" pb={3}>
        We're sorry for this moment but we guess you've enntered wrong place.
        Please click on the given buton below.
      </Typography>
      <Button
        onClick={() => navigate(-1)}
        sx={{ bgcolor: "gray", color: "white", ":hover": { color: "gray" } }}
      >
        Go Back
      </Button>
    </Box>
  );
}

export default Notfound;
