import React from "react";

import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Menu,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import { FormatBold, KeyboardArrowDown } from "@mui/icons-material";

function Email() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get("id"),
      password: data.get("password"),
    });
  };

  return (
    <Box>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <TextField
          name="Name"
          margin="normal"
          required
          fullWidth
          label="ID"
          autoComplete="off"
          autoFocus
        />
        <TextField
          name="Subject"
          margin="normal"
          required
          fullWidth
          label="ID"
          autoComplete="off"
          autoFocus
        />
        <Typography>Your ID: {1234567890}</Typography>
        <FormControl>
          <FormLabel>Message</FormLabel>
          <Textarea />
          <FormHelperText>0/300</FormHelperText>
        </FormControl>
      </Box>
    </Box>
  );
}

export default Email;
