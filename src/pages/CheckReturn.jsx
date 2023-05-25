import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CheckReturn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, marketerid } = useSelector((state) => state.checkToken);
  const handleClick = () => {
    setError(!Error);
  };
  const [ErrData, setErrData] = useState("");
  const [Error, setError] = useState("");
  const [CP, setCP] = useState(0);
  const [ClothID, setClothID] = useState("");
  const [Data, setData] = useState({
    id: "",
    returnDate: "",
    returnDeliveredDate: "",
    returnSentBackDate: "",
    desc: "",
  });

  const fetchData = async () => {
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

  return (
    <div>
      <Box>
        <Snackbar open={Error} onClose={handleClick}>
          <Alert onClose={() => {}} onClick={handleClick} severity="error">
            <AlertTitle>Error</AlertTitle>
            {ErrData} — <strong>Be careful!</strong>
          </Alert>
        </Snackbar>
        <TextField
          name="id"
          label="Order ID"
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
          onClick={fetchData}
        >
          {CP ? (
            <CircularProgress sx={{ color: "black", p: "5px" }} />
          ) : (
            "Check Return"
          )}
        </Button>
      </Box>

      {Data.id === "" ? (
        ""
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell align="right">Return Date</TableCell>
                <TableCell align="right">Return Delivered Date</TableCell>
                <TableCell align="right">Return Sent Back Date</TableCell>
                <TableCell align="right">Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="right">{Data.id}</TableCell>
                <TableCell align="right">{Data.returnDate}</TableCell>
                <TableCell align="right">{Data.returnDeliveredDate}</TableCell>
                <TableCell align="right">{Data.returnSentBackDate}</TableCell>
                <TableCell align="right">{Data.desc}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default CheckReturn;
