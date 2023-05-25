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
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Returns() {
  const dispatch = useDispatch();
  const [Data, setData] = useState({
    id: "",
    clientName: "",
    clientNumber: "",
    address: "",
    dateOrdered: "",
  });
  const navigate = useNavigate();
  const { token, marketerid } = useSelector((state) => state.checkToken);
  const handleClick = () => {
    setError(!Error);
  };
  const handleClick1 = () => {
    setOpen(!Open);
  };
  const [ErrData, setErrData] = useState("");
  const [Error, setError] = useState("");
  const [Open, setOpen] = useState("");
  const [CP, setCP] = useState(0);
  const [CP1, setCP1] = useState(0);
  const [ClothID, setClothID] = useState("");
  const [Desc, setDesc] = useState("");

  const fetchOrder = async () => {
    try {
      setCP(1);
      if (ClothID === "") {
        setErrData("Please provide Order ID");
        setError(1);
        setCP(0);
        return;
      }
      const fetch = await axios.post("", {
        ClothID: "",
        id: marketerid,
        token: token,
      });
      if (fetch.status === 200) {
        setCP(0);
        setData(fetch.data);
      } else if (fetch.status === 203) {
        setErrData(fetch.data);
        setError(1);
        setCP(0);
        setTimeout(() => {
          dispatch({
            type: "removeToken",
          });
          navigate("/signin");
        }, 2000);
      } else {
        setErrData(fetch.data);
        setError(1);
        setCP(0);
      }
    } catch (error) {
      setErrData(error.response.data);
      setError(1);
      setCP(0);
    }
  };

  const createReturn = async () => {
    try {
      setCP1(1);
      if (ClothID === "") {
        setErrData("Please provide Order ID");
        setError(1);
        setCP1(0);
        return;
      }
      const fetch = await axios.post("", {
        ClothID: "",
        desc: Desc,
        id: marketerid,
        token: token,
      });
      if (fetch.status === 200) {
        setCP1(0);
        setOpen(1);
      } else if (fetch.status === 203) {
        setErrData(fetch.data);
        setError(1);
        setCP1(0);
        setTimeout(() => {
          dispatch({
            type: "removeToken",
          });
          navigate("/signin");
        }, 2000);
      } else {
        setErrData(fetch.data);
        setError(1);
        setCP1(0);
      }
    } catch (error) {
      setErrData(error.response.data);
      setError(1);
      setCP1(0);
    }
  };
  return (
    <div>
      <Box>
        <Snackbar open={Error} onClose={handleClick}>
          <Alert onClose={() => {}} onClick={handleClick} severity="error">
            <AlertTitle>Error</AlertTitle>
            {ErrData} — <strong>Be careful!</strong>
          </Alert>
        </Snackbar>
        <Snackbar open={Open} onClose={handleClick1}>
          <Alert onClose={() => {}} onClick={handleClick1} severity="error">
            <AlertTitle>Success</AlertTitle>
            Return Submitted — <strong>Be careful!</strong>
          </Alert>
        </Snackbar>
        <Box mb={2}>
            <Typography>
                Note: Make sure that if the return is made before then you cannot proceed further. So, please first check that whether the Return is made or not before continuing. Thankyou.
            </Typography>
        </Box>
        <TextField
          name="clothid"
          label="Enter Cloth ID"
          onChange={(e) => setClothID(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{
            ml: 2,
            bgcolor: "gray",
            ":hover": {
              bgcolor: "grey",
            },
            height: "60px",
            width: '150px'
          }}
          onClick={fetchOrder}
        >
          {CP ? (
            <CircularProgress sx={{ color: "black", p: "5px" }} />
          ) : (
            "Check Order"
          )}
        </Button>

        {Data.id === "" ? (
          ""
        ) : (
          <Box>
            <Box pt={2}>
              <strong>Order ID</strong> - {Data.id}
              <br />
              <strong>Client</strong> - {Data.clientName}
              <br />
              <strong>Number</strong> - {Data.clientNumber}
              <br />
              <strong>Date Ordered</strong> - {Data.dateOrdered}
            </Box>
            <TextField
              id="outlined-multiline-static"
              name="desc"
              placeholder="Description and Details about Package"
              multiline
              rows={4}
              style={{
                width: "100%",
                margin: "20px 0 0 0",
                resize: "none",
              }}
              onChange={(e) => setDesc(e.target.value)}
            />
            <Button
              variant="contained"
              sx={{
                mt: 2,
                bgcolor: "gray",
                ":hover": {
                  bgcolor: "grey",
                },
                height: "60px",
                width: '150px'
              }}
              onClick={fetchOrder}
            >
              {CP1 ? (
                <CircularProgress sx={{ color: "black", p: "5px" }} />
              ) : (
                "Make Return"
              )}
            </Button>
          </Box>
        )}
      </Box>
    </div>
  );
}

export default Returns;
