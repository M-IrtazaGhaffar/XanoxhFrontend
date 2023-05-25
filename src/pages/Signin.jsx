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
import { Alert, AlertTitle, CircularProgress, Snackbar } from "@mui/material";
import SVG from "../components/SVG";
import axios from "axios";
import { URL1 } from "../Config";
import { useDispatch } from "react-redux";

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
  const [Open, setOpen] = useState(0);
  const [ErrMsg, setErrMsg] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    setOpen(!Open);
  };
  const handleSubmit = async (event) => {
    try {
      setLoading(1);
      event.preventDefault();
      setLoading(1);
      const data = new FormData(event.currentTarget);
      console.log({
        email: data.get("email"),
        password: data.get("password"),
      });

      if (data.get("email") === "" || data.get("password") === "") {
        setErrMsg("Please fill all inputs");
        setOpen(1);
      } else {
        const fetch = await axios.post(`${URL1}/login`, {
          email: data.get("email"),
          password: data.get("password"),
        });

        console.log(fetch);

        if (fetch.status === 200 && fetch.data.login === true) {
          dispatch({
            type: "addToken",
            payload: {
              token: fetch.data.token,
              marketerid: fetch.data.user._id,
            },
          });
          navigate("/dashboard/");
        } else if (fetch.status === 200 && fetch.data.login === false) {
          setErrMsg(fetch.data.msg);
          setOpen(1);
        } else {
          setErrMsg(fetch.data.msg);
          setOpen(1);
        }
        setLoading(0);
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.message);
      setOpen(1);
      setLoading(0);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 3000);
  }, []);

  return (
    <Box>
      {SplashScreen ? (
        <Splash />
      ) : (
        <Container component="main" maxWidth="xs" sx={{ px: 4 }}>
          <Snackbar open={Open} onClose={handleClick}>
            <Alert onClose={() => {}} onClick={handleClick} severity="error">
              <AlertTitle>Error</AlertTitle>
              {ErrMsg} — <strong>Be careful!</strong>
            </Alert>
          </Snackbar>
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
                name="email"
                margin="normal"
                type="email"
                required
                fullWidth
                label="Email"
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
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      )}
    </Box>
  );
}
