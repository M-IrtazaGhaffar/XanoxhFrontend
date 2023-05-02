import { Box, Chip } from "@mui/material";
import React, { useState } from "react";

function Payments() {
  const [Type, setType] = useState("");

  const handleType = (type) => {
    setType(type);
  };
  return (
    <Box>
      <Chip
        label="All"
        variant={Type === "all" ? "filled" : "outlined"}
        onClick={() => handleType("all")}
      />
      <Chip
        label="Pending"
        variant={Type === "pending" ? "filled" : "outlined"}
        onClick={() => handleType("pending")}
      />
      <Chip
        label="Delivered"
        variant={Type === "delivered" ? "filled" : "outlined"}
        onClick={() => handleType("delivered")}
      />
    </Box>
  );
}

export default Payments;
