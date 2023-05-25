import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { URL1 } from "../Config";
import { useSelector } from "react-redux";
import axios from "axios";

function Settings() {
  const [Data, setData] = useState(0);
  const [Loading, setLoading] = useState(0);
  const { marketerid, token } = useSelector((state) => state.checkToken);
  const [Open, setOpen] = useState(0);
  const [Err, setErr] = useState(0);
  const [ErrMsg, setErrMsg] = useState("");

  const handleSubmit = async () => {
   if (Data !== 0) {
    try {
      const fetch = await axios.post(`${URL1}/changeNumber`, {
        id: marketerid,
        token: token,
        newNumber: Data,
      });
      if (fetch.status === 200) {
        setOpen(1);
      } else {
        setErrMsg(fetch.data);
        setErr(1);
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.response.data);
      setErr(1);
    }
   }
   else{
    setErrMsg("Please fill in all feilds!");
      setErr(1);
   }
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Snackbar open={Err} onClose={() => setErr(!Err)}>
        <Alert onClose={() => {}} onClick={() => setErr(!Err)} severity="error">
          <AlertTitle>Error</AlertTitle>
          {ErrMsg} — <strong>Wait for a while!</strong>
        </Alert>
      </Snackbar>
      <Snackbar open={Open} onClose={() => setOpen(!Open)}>
        <Alert
          onClose={() => {}}
          onClick={() => setOpen(!Open)}
          severity="success"
        >
          <AlertTitle>Error</AlertTitle>
          Data Submitted — <strong>Be patient!</strong>
        </Alert>
      </Snackbar>
      <Box display="flex" flexDirection="column">
        <Typography variant="h4">Set yourself</Typography>
        <Typography pb={3} variant="caption">
          We assure you that your personal information is our resposibility. So,
          we've make a section to only change your easypaisa number. Remember,
          1st you have to appeal now to change your number and after the
          acceptance your number will be changed. You can also view it in Your
          Information. <br /> Thankyou!
        </Typography>
      </Box>
      <TextField
        name="newnumber"
        label="New Number i.e., 923001234567"
        type="number"
        onChange={(e) => setData(e.target.value)}
        sx={{ width: "270px" }}
      />
      <Button
        onClick={handleSubmit}
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          bgcolor: "gray",
          ":hover": {
            bgcolor: "grey",
          },
          height: "60px",
          width: "100px",
        }}
      >
        {Loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress sx={{ color: "black", p: "5px" }} />
          </Box>
        ) : (
          "Appeal"
        )}
      </Button>
    </Box>
  );
}

export default Settings;
