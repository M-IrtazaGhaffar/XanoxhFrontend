import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Logo from "../assets/Xonaxh.png";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <b>Xonaxh Pakistan</b> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  var navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get("id"),
      password: data.get("password"),
    });

    if (true) {
      navigate("/dashboard");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ px: 4 }}>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ mb: 3 }}>
          <img src={Logo} alt="Logo" width={200} />
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            name="id"
            margin="normal"
            required
            fullWidth
            label="ID"
            autoComplete="off"
            autoFocus
          />
          <TextField
            name="password"
            margin="normal"
            required
            fullWidth
            label="Password"
            type="password"
            autoComplete="off"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              bgcolor: "gray",
              ":hover": {
                bgcolor: "grey",
              },
            }}
          >
            Sign In
          </Button>
          <Link href="#" variant="body2" sx={{ color: "grey", textDecorationColor: 'gray' }}>
            Forgot password?
          </Link>
        </Box>
      </Box>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
