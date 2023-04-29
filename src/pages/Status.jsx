import {
  Box,
  Chip,
  CircularProgress,
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

function Status() {
  const data = [
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
    {
      id: "6442a63dd8bfab42194152d5",
      client: "Muhammad Irtaza Ghaffar",
      price: "4000",
      Ordered: "2023-04-21",
      confirmed: "2023-04-21",
      easypaisa: "03320523524",
      delivered: "2023-04-21",
      quantity: 3,
    },
  ];
  const [Loading, setLoading] = useState(1);
  const [page, setpage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(10);
  const [Type, setType] = useState("All");
  const [Fetching, setFetching] = useState(1);

  const handleChangePage = (event, nextPage) => {
    setpage(nextPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setrowsPerPage(event.target.value);
  };

  const fetchAll = () => {
    setType("All");
  };
  const fetchDelivered = () => {
    setType("Delivered");
  };
  const fetchPending = () => {
    setType("Pending");
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(0);
      setFetching(0);
    }, 3000);
  }, []);

  return (
    <>
      {Loading ? (
        <Splash />
      ) : (
        <Box>
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
                {Fetching ? (
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
                  data
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((item) => {
                      return (
                        <TableRow>
                          <TableCell>{item.id}</TableCell>
                          <TableCell>{item.client}</TableCell>
                          <TableCell>{item.price}</TableCell>
                          <TableCell>{item.Ordered}</TableCell>
                          <TableCell>{item.confirmed}</TableCell>
                          <TableCell>{item.easypaisa}</TableCell>
                          <TableCell>{item.delivered}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                        </TableRow>
                      );
                    })
                )}
              </TableBody>
              <TableFooter>
                {Fetching ? (
                  ""
                ) : (
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 50]}
                    component="div"
                    count={data.length}
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
