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

function Status() {
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
                  <TableCell>Client</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Date Ordered</TableCell>
                  <TableCell>Date Confirmed</TableCell>
                  <TableCell>Easypaisa</TableCell>
                  <TableCell>Date Delivered</TableCell>
                  <TableCell>Quantity</TableCell>
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
                        <TableCell>{item.clientName}</TableCell>
                        <TableCell>{item.price}</TableCell>
                        <TableCell>{item.dateOrdered.split("T")[0]}</TableCell>
                        <TableCell>
                          {item.orderConfirmation ? (
                            item.dateConfirmationOrder.split("T")[0]
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-hourglass-split"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                            </svg>
                          )}
                        </TableCell>
                        <TableCell>{item.clientNumber}</TableCell>
                        <TableCell>
                          {item.deliveryStatus ? (
                            item.dateDelivered.split("T")[0]
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-hourglass-split"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 15a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1 0-1h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11zm2-13v1c0 .537.12 1.045.337 1.5h6.326c.216-.455.337-.963.337-1.5V2h-7zm3 6.35c0 .701-.478 1.236-1.011 1.492A3.5 3.5 0 0 0 4.5 13s.866-1.299 3-1.48V8.35zm1 0v3.17c2.134.181 3 1.48 3 1.48a3.5 3.5 0 0 0-1.989-3.158C8.978 9.586 8.5 9.052 8.5 8.351z" />
                            </svg>
                          )}
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
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

export default Status;
