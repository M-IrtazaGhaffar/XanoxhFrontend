import {
  Alert,
  AlertTitle,
  Box,
  Button,
  CircularProgress,
  Divider,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { URL1 } from "../Config";

function Returns() {
  const dispatch = useDispatch();
  const [Data, setData] = useState({
    _id: "",
    clientName: "",
    clientNumber: "",
    address: "",
    dateOrdered: "",
    returnStatus: false,
    returnDate: null,
    returnDeliveredDate: null,
    returnDeliveredStatus: false,
    returnSentBackStatus: false,
    returnSentBackDate: null,
    returnDesc: "",
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
      const fetch = await axios.post(
        `${URL1}/checkReturn`,
        {
          id: ClothID,
          token: token,
        }
      );
      if (fetch.status === 200) {
        setCP(0);
        setData(...fetch.data);
        console.log(Data);
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
      setErrData("Network Error");
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
      const fetch = await axios.post(
        `${URL1}/makeReturn`,
        {
          id: ClothID,
          desc: Desc,
          token: token,
        }
      );
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
        setErrData("Network Error");
        setError(1);
        setCP1(0);
      }
    } catch (error) {
      setErrData("Neywork Error");
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
          <Alert onClose={() => {}} onClick={handleClick1} severity="success">
            <AlertTitle>Success</AlertTitle>
            Return Submitted — <strong>Wait for Confirmation!</strong>
          </Alert>
        </Snackbar>
        <Box mb={2}>
          <Typography>
            Note: Make sure that if the return is made before then you cannot
            proceed further. So, please first check that whether the Return is
            made or not before continuing. Thankyou.
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
            width: "150px",
          }}
          onClick={fetchOrder}
        >
          {CP ? (
            <CircularProgress sx={{ color: "black", p: "5px" }} />
          ) : (
            "Check Order"
          )}
        </Button>

        {Data._id === "" ? (
          ""
        ) : (
          <Box>
            <Box
              sx={{
                pt: 5,
                px: {
                  md: 3,
                  lg: 5,
                },
              }}
              display="flex"
              gap={2}
              flexDirection="column"
            >
              <Typography display="flex" justifyContent="space-between">
                <Typography>Order ID</Typography> {Data._id}
              </Typography>
              <Divider />
              <Typography display="flex" justifyContent="space-between">
                <Typography>Client</Typography> {Data.clientName}
              </Typography>
              <Divider />
              <Typography display="flex" justifyContent="space-between">
                <Typography>Number</Typography> {Data.clientNumber}
              </Typography>
              <Divider />
              <Typography display="flex" justifyContent="space-between">
                <Typography>Date Ordered</Typography>{" "}
                {Data.dateOrdered.split("T")[0]}
              </Typography>
              <Divider />
              <Typography display="flex" justifyContent="space-between">
                <Typography>Address</Typography> {Data.address}
              </Typography>
              <Divider />
              <Typography display="flex" justifyContent="space-between">
                <Typography>Return Status</Typography>{" "}
                {Data.returnStatus ? "Applied for Return" : "Not Returned"}
              </Typography>

              {Data.returnStatus ? (
                <>
                  <Divider />
                  <Typography display="flex" justifyContent="space-between">
                    <Typography>Return Date</Typography>{" "}
                    {Data.returnDate.split("T")[0]}
                  </Typography>
                  <Divider />
                  <Typography display="flex" justifyContent="space-between">
                    <Typography>Return Description</Typography>{" "}
                    {Data.returnDesc}
                  </Typography>
                  <Divider />
                  <Typography display="flex" justifyContent="space-between">
                    <Typography>Return Delivered Status</Typography>{" "}
                    {Data.returnDeliveredStatus ? "Delivered" : "Not Delivered"}
                  </Typography>
                  {Data.returnDeliveredStatus ? (
                    <>
                      <Divider />
                      <Typography display="flex" justifyContent="space-between">
                        <Typography>Return Delivered Date</Typography>{" "}
                        {Data.returnDeliveredDate.split("T")[0]}
                      </Typography>
                    </>
                  ) : (
                    ""
                  )}
                  <Divider />
                  <Typography display="flex" justifyContent="space-between">
                    <Typography>Return Sent Status</Typography>{" "}
                    {Data.returnSentBackStatus ? "Sent Back" : "Not Sent Back"}
                  </Typography>

                  {Data.returnSentBackStatus ? (
                    <>
                      <Divider />
                      <Typography display="flex" justifyContent="space-between">
                        <Typography>Return Sent Date</Typography>{" "}
                        {Data.returnSentBackDate.split("T")[0]}
                      </Typography>
                    </>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}
            </Box>
            {Data.returnStatus ? (
                    ""
                  ) : (
                    <Box>
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
                          width: "150px",
                        }}
                        onClick={createReturn}
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
        )}
      </Box>
    </div>
  );
}

export default Returns;
