import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  CircularProgress,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Splash from "../components/Splash";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { URL1 } from "../Config";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Payments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { marketerid, token } = useSelector((state) => state.checkToken);
  const [Data, setData] = useState([]);
  const [Loading, setLoading] = useState(1);
  const [page, setpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [Type, setType] = useState("All");

  const [Err, setErr] = useState(0);
  const [ErrMsg, setErrMsg] = useState("");

  const handleChangePage = (event, nextPage) => {
    setpage(nextPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setrowsPerPage(event.target.value);
  };

  const fetchAll = async () => {
    setType("All");
    try {
      setLoading(1);
      const fetch = await axios.post(`${URL1}/allOrders`, {
        id: marketerid,
        token: token,
      });
      if (fetch.status === 200) {
        setData(fetch.data);
        setLoading(0);
      } else if (fetch.status === 203) {
        setErrMsg(fetch.data);
        setErr(1);
        setLoading(0);
        setTimeout(() => {
          dispatch({
            type: "removeToken",
          });
          navigate("/signin");
        }, 2000);
      } else {
        setErrMsg(fetch.data);
        setErr(1);
        setLoading(0);
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.message);
      setErr(1);
      setLoading(0);
    }
  };

  const fetchDelivered = async () => {
    setType("Delivered");
    try {
      setLoading(1);
      const fetch = await axios.post(`${URL1}/deliveredOrders`, {
        id: marketerid,
        token: token,
      });
      if (fetch.status === 200) {
        setData(fetch.data);
        setLoading(0);
      } else if (fetch.status === 203) {
        setErrMsg(fetch.data);
        setErr(1);
        setLoading(0);
        setTimeout(() => {
          dispatch({
            type: "removeToken",
          });
          navigate("/signin");
        }, 2000);
      } else {
        setErrMsg(fetch.data);
        setErr(1);
        setLoading(0);
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.message);
      setErr(1);
      setLoading(0);
    }
  };
  const fetchPending = async () => {
    setType("Pending");
    try {
      setLoading(1);
      const fetch = await axios.post(`${URL1}/pendingOrders`, {
        id: marketerid,
        token: token,
      });
      if (fetch.status === 200) {
        setData(fetch.data);
        setLoading(0);
      } else if (fetch.status === 203) {
        setErrMsg(fetch.data);
        setErr(1);
        setLoading(0);
        setTimeout(() => {
          dispatch({
            type: "removeToken",
          });
          navigate("/signin");
        }, 2000);
      } else {
        setErrMsg(fetch.data);
        setErr(1);
        setLoading(0);
      }
    } catch (error) {
      console.log(error);
      setErrMsg(error.message);
      setErr(1);
      setLoading(0);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <>
      {Loading ? (
        <Splash />
      ) : (
        <Box>
          <Snackbar open={Err} onClose={() => setErr(0)}>
            <Alert
              onClose={() => {}}
              onClick={() => setErr(0)}
              severity="error"
            >
              <AlertTitle>Error</AlertTitle>
              {ErrMsg} — <strong>Be careful!</strong>
            </Alert>
          </Snackbar>
          <Box sx={{ display: "flex", gap: "10px" }}>
            <Chip
              variant={Type === "All" ? "filled" : "outlined"}
              label="All"
              onClick={fetchAll}
            />
            <Chip
              variant={Type === "Delivered" ? "filled" : "outlined"}
              label="Delivered"
              onClick={fetchDelivered}
            />
            <Chip
              variant={Type === "Pending" ? "filled" : "outlined"}
              label="Pending"
              onClick={fetchPending}
            />
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Marketer Payment</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Date Ordered</TableCell>
                  <TableCell>Date Confirmed</TableCell>
                  <TableCell>Date Delivered</TableCell>
                  <TableCell>Quantity</TableCell>
                  <TableCell>Payment Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Loading ? (
                  <Box
                    sx={{
                      paddingTop: "20px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <CircularProgress sx={{ color: "black" }} />
                    <Typography>Please wait</Typography>
                  </Box>
                ) : (
                  Data.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  ).map((item) => {
                    return (
                      <TableRow>
                        <TableCell>{item._id}</TableCell>
                        <TableCell>{item.marketerPayment}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.dateOrdered.split("T")[0]}</TableCell>
                        <TableCell>
                          {item.dateConfirmationOrder.split("T")[0]}
                        </TableCell>
                        <TableCell>
                          {item.dateDelivered.split("T")[0]}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>
                          {item.marketerPaymentStatus ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="20"
                              fill="currentColor"
                              class="bi bi-check2"
                              viewBox="0 0 16 16"
                            >
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-x-lg"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                            </svg>
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
              <TableFooter>
                {Loading ? (
                  ""
                ) : (
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={Data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              </TableFooter>
            </Table>
          </TableContainer>
        </Box>
      )}
    </>
  );
}

export default Payments;
