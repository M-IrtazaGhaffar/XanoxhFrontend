import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Splash from "../components/Splash";
import { CircularProgress } from "@mui/material";
import SVG from "../components/SVG";

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
  const [Loading, setLoading] = useState(0);
  const [SplashScreen, setSplash] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 7000);
  }, []);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(1);
    const data = new FormData(event.currentTarget);
    console.log({
      id: data.get("id"),
      password: data.get("password"),
    });

    if (true) {
      setTimeout(() => {
        navigate("/dashboard/");
      }, 1000);
    }
  };

  return (
    <Box>
      {SplashScreen ? (
        <Splash />
      ) : (
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
              <SVG />
            </Box>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
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
                  height: "60px",
                }}
              >
                {Loading ? (
                  <Box display="flex" justifyContent="center">
                    <CircularProgress sx={{ color: "black", p: "5px" }} />
                  </Box>
                ) : (
                  "Sign In"
                )}
              </Button>
              <Link
                variant="body2"
                onClick={() => navigate("/forgot")}
                sx={{
                  color: "grey",
                  textDecorationColor: "gray",
                  cursor: "pointer",
                }}
              >
                Forgot password?
              </Link>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      )}
    </Box>
  );
}
