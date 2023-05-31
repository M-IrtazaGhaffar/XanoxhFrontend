import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Splash from "../components/Splash";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL, URL1 } from "../Config";
import { useNavigate } from "react-router-dom";

function Report() {
  const { token, marketerid } = useSelector((state) => state.checkToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [Submitted, setSubmitted] = useState(0);
  const [Data, setData] = useState("");
  const [Loading, setLoading] = useState(1);
  const [CP, setCP] = useState(0);
  const [Open, setOpen] = useState(0);
  const [Err, setErr] = useState(0);
  const [ErrMsg, setErrMsg] = useState("");
  const handleClick = () => {
    setOpen(!Open);
  };
  const handleClick1 = () => {
    setErr(!Err);
  };

  const handleInput = async () => {
    try {
      if (Submitted) {
        setErrMsg("Already Submitted! Reload or Try again.");
        setErr(1);
        return;
      }
      if (Data === "") {
        setErrMsg("Please fill all inputs!");
        setErr(1);
      } else {
        setCP(1);
        const fetch = await axios.post(`${URL}/reportForm`, {
          id: marketerid,
          token: token,
          report: Data,
        });
        if (fetch.status === 200) {
          setOpen(1);
          setSubmitted(1);
        } else if (fetch.status === 203) {
          setErrMsg(fetch.data);
          setErr(1);
          setTimeout(() => {
            dispatch({
              type: "removeToken",
            });
            navigate("/signin");
          }, 2000);
        }
        setCP(0);
      }
    } catch (error) {}
  };

  useEffect(() => {
    setLoading(0);
  }, []);

  return (
    <Box>
      {Loading ? (
        <Splash />
      ) : (
        <Box>
          <Snackbar open={Err} onClose={handleClick1}>
            <Alert onClose={() => {}} onClick={handleClick1} severity="error">
              <AlertTitle>Error</AlertTitle>
              {ErrMsg} — <strong>Wait for a while!</strong>
            </Alert>
          </Snackbar>
          <Snackbar open={Open} onClose={handleClick}>
            <Alert onClose={() => {}} onClick={handleClick} severity="success">
              <AlertTitle>Success</AlertTitle>
              Data Submitted — <strong>Be patient!</strong>
            </Alert>
          </Snackbar>
          <Typography variant="h4">Report Us</Typography>
          <Typography variant="caption">
            Caution: Just report those problems which are related to software
            crashing, hanging etc here. We'll try our best to respond you!
          </Typography>
          <textarea
            name="message"
            placeholder="Explain here..."
            style={{
              width: "100%",
              padding: "13px",
              resize: "none",
              margin: "5px 0",
            }}
            rows={20}
            onChange={(e) => setData(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              mb: 2,
              bgcolor: "gray",
              ":hover": {
                bgcolor: "grey",
              },
              alignSelf: "flex-end",
              height: "50px",
              width: "150px",
            }}
            onClick={handleInput}
          >
            {CP ? <CircularProgress sx={{ color: "black" }} /> : "Report"}
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Report;
