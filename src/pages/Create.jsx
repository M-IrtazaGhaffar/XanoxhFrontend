import React, { useEffect, useState } from "react";
import Splash from "../components/Splash";
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  Chip,
  CircularProgress,
  List,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { URL } from "../Config";

function Create() {
  const [Type, setType] = useState("");
  const [Data, setData] = useState({
    clothid: "",
    marketerid: "1",
    client: "",
    paymentnumber: "",
    address: "",
    quantity: "",
    price: "",
    marketerpayment: 0,
    desc: "",
    length: "",
    chest: "",
    waist: "",
    daman: "",
    sleeves: "",
    shoulders: "",
    colloar: "",
    armhole: "",
    type: Type,
    account: "",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiaXJ0YXphZ2hhZmZhckBnbWFpbC5jb20iLCJpYXQiOjE2ODMwNTQwMTQsImV4cCI6MTY4MzE0MDQxNH0.ZNAknglcKMaaRFJWJb545_LW6HHxB6s47RaVDU4Xt4k",
  });

  const [Open, setOpen] = useState(0);
  const [Open1, setOpen1] = useState(0);
  const handleClick = () => {
    setOpen(!Open);
  };
  const handleClick1 = () => {
    setOpen1(!Open1);
  };
  const handleClick2 = () => {
    setError(!Error);
  };
  const [Loading, setLoading] = useState(0);
  const [Error, setError] = useState(0);
  const [ErrData, setErrData] = useState("");
  const [CP, setCP] = useState(0);
  const [Submit, setSubmit] = useState(0);
  const [Selected, setSelected] = useState([{}]);
  const [Note, setNote] = useState([
    "Make sure your client is real and authentic to purchase",
    "Verify the payment method type",
    "50% payment will be done to contiue the purchasing",
    "Write the real name of client in given form",
    "Take 100% real and Okay details of product",
    "You can also proceed with custom details even",
    "Check again before ordering",
  ]);
  const [ClothID, setClothID] = useState([{}]);
  const handleData = (e) => {
    if (e.target.name === "price" || "quantity")
      setData({ ...Data, [e.target.name]: parseInt(e.target.value) });
    else setData({ ...Data, [e.target.name]: e.target.value });
  };

  const [Sizes, setSizes] = useState([
    {
      name: "Small",
      size: {
        length: "39",
        chest: "21.5",
        waist: "22",
        daman: "22.5",
        sleeves: "23.5",
        shoulders: "17.5",
        colloar: "14.5",
        armhole: "9.5",
      },
    },
    {
      name: "Medium",
      size: {
        length: "41",
        chest: "22.5",
        waist: "23",
        daman: "23.5",
        sleeves: "24.5",
        shoulders: "18.5",
        colloar: "15.5",
        armhole: "10.5",
      },
    },
    {
      name: "Large",
      size: {
        length: "43",
        chest: "23.5",
        waist: "24",
        daman: "24.5",
        sleeves: "25.5",
        shoulders: "19.5",
        colloar: "16.5",
        armhole: "11.5",
      },
    },
    {
      name: "xLarge",
      size: {
        length: "45",
        chest: "24.5",
        waist: "25",
        daman: "25.5",
        sleeves: "26.5",
        shoulders: "20.5",
        colloar: "17.5",
        armhole: "12.5",
      },
    },
  ]);

  const handleType = (size) => {
    var n = -1;
    setType(size);
    Data.type = size;
    if (size === "small") n = 0;
    if (size === "medium") n = 1;
    if (size === "large") n = 2;
    if (size === "xlarge") n = 3;

    if (size === "custom") n = 0;
    Data.length = Sizes[n].size.length;
    Data.chest = Sizes[n].size.chest;
    Data.waist = Sizes[n].size.waist;
    Data.daman = Sizes[n].size.daman;
    Data.sleeves = Sizes[n].size.sleeves;
    Data.shoulders = Sizes[n].size.shoulders;
    Data.colloar = Sizes[n].size.colloar;
    Data.armhole = Sizes[n].size.armhole;
  };

  const fetchData = async () => {
    // Fetch Stock
    const fetch = await axios.post(`${URL}/stock`, {
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiaXJ0YXphZ2hhZmZhckBnbWFpbC5jb20iLCJpYXQiOjE2ODMwNTQwMTQsImV4cCI6MTY4MzE0MDQxNH0.ZNAknglcKMaaRFJWJb545_LW6HHxB6s47RaVDU4Xt4k",
    });
    setClothID([...fetch.data]);
    setLoading(0);
  };

  useEffect(() => {
    setLoading(1);
    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      Data.account === "" ||
      Data.address === "" ||
      Data.armhole === "" ||
      Data.chest === "" ||
      Data.chest === "" ||
      Data.client === "" ||
      Data.clothid === "" ||
      Data.colloar === "" ||
      Data.daman === "" ||
      Data.desc === "" ||
      Data.length === "" ||
      Data.marketerid === "" ||
      Data.paymentnumber === "" ||
      Data.price === 0 ||
      Data.quantity === 0 ||
      Data.shoulders === "" ||
      Data.sleeves === "" ||
      Data.type === "" ||
      Data.waist === ""
    ) {
      setOpen(true);
      console.log(Data);
    } else {
      try {
        console.log(Data);
        setCP(1);
        const fetch = await axios.post(`${URL}/createOrder`, Data);
        if (fetch.status === 200) {
          console.log("Ok");
        }
        console.log(fetch);
        setCP(0);
        if (fetch.status === 200) {
          setSubmit(1);
          setOpen1(1);
        } else {
          setErrData(fetch.data)
          setError(1);
        }
      } catch (error) {
        console.log(error);
        setErrData(error.message)
        setError(1);
      }
    }
  };

  return (
    <Box>
      {Loading ? (
        <Splash />
      ) : (
        <Box>
          <Snackbar open={Open} onClose={handleClick}>
            <Alert onClose={() => {}} onClick={handleClick} severity="error">
              <AlertTitle>Error</AlertTitle>
              Fill all of the given inputs — <strong>Be careful!</strong>
            </Alert>
          </Snackbar>
          <Snackbar open={Error} onClose={handleClick2}>
            <Alert onClose={() => {}} onClick={handleClick2} severity="error">
              <AlertTitle>Error</AlertTitle>
              {ErrData} — <strong>Wait for a while!</strong>
            </Alert>
          </Snackbar>
          <Snackbar open={Open1} onClose={handleClick1}>
            <Alert onClose={() => {}} onClick={handleClick1} severity="success">
              <AlertTitle>Submitted</AlertTitle>
              Wait for Order Confirmation — <strong>Be patient!</strong>
            </Alert>
          </Snackbar>
          <Typography variant="h4">Create an Order</Typography>
          <Typography variant="body2" py={3}>
            Please first verify the given steps below
            <List>
              {Note.map((item, index) => {
                return (
                  <Typography variant="body2">
                    {index + 1}. {item}
                  </Typography>
                );
              })}
            </List>
          </Typography>
          <TableContainer
            component={Paper}
            sx={{
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
              my: 3,
            }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Type</TableCell>
                  <TableCell>Length</TableCell>
                  <TableCell>Chest</TableCell>
                  <TableCell>Waist</TableCell>
                  <TableCell>Daman</TableCell>
                  <TableCell>Sleeves</TableCell>
                  <TableCell>Shoulders</TableCell>
                  <TableCell>Colloar</TableCell>
                  <TableCell>Arm Hole</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {Sizes.map((item) => {
                  return (
                    <TableRow>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.size.length}</TableCell>
                      <TableCell>{item.size.chest}</TableCell>
                      <TableCell>{item.size.waist}</TableCell>
                      <TableCell>{item.size.daman}</TableCell>
                      <TableCell>{item.size.sleeves}</TableCell>
                      <TableCell>{item.size.shoulders}</TableCell>
                      <TableCell>{item.size.colloar}</TableCell>
                      <TableCell>{item.size.armhole}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Typography variant="body2" textAlign="center" p={2}>
              Note: All sizes are in inches (In)
            </Typography>
          </TableContainer>
          <Box>
            <Typography variant="body2">
              Remember to enter the 100% amount while filling the form!
            </Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
              display="flex"
              flexWrap="wrap"
              gap={2}
            >
              <TextField
                name="client"
                label="Client Name"
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
              <TextField
                name="paymentnumber"
                label="(Payment / Account) No."
                onChange={handleData}
              />
              <TextField
                name="address"
                label="Address"
                onChange={(e) =>
                  setData({ ...Data, [e.target.name]: e.target.value })
                }
              />
              <TextField
                name="quantity"
                label="Quantity"
                type="number"
                onChange={handleData}
                defaultValue={0}
              />
              <TextField
                name="price"
                label="Price (100%)"
                onChange={handleData}
              />
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                name="account"
                value={Data.account}
                onChange={(e, newValue) =>
                  setData({ ...Data, account: newValue })
                }
                sx={{ minWidth: "150px" }}
                options={[
                  "Easypaisa",
                  "Jazzcash",
                  "Nayapay",
                  "Sadapay",
                  "Bank",
                ].map((option) => option)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Account type"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
            </Box>
            <Box pt={3} display="flex" gap={3} alignItems="center">
              <Typography variant="body2" p={1}>
                Please check anyone
              </Typography>
              <Chip
                label="Small"
                variant={Type === "small" ? "filled" : "outlined"}
                onClick={() => handleType("small")}
              />
              <Chip
                label="Medium"
                variant={Type === "medium" ? "filled" : "outlined"}
                onClick={() => handleType("medium")}
              />
              <Chip
                label="Large"
                variant={Type === "large" ? "filled" : "outlined"}
                onClick={() => handleType("large")}
              />
              <Chip
                label="xLarge"
                variant={Type === "xlarge" ? "filled" : "outlined"}
                onClick={() => handleType("xlarge")}
              />
              <Chip
                label="Custom"
                variant={Type === "custom" ? "filled" : "outlined"}
                onClick={() => handleType("custom")}
              />
            </Box>
            {Type === "custom" ? (
              <Box display="flex" flexWrap="wrap" gap={2} py={3}>
                <TextField
                  name="length"
                  label="Length"
                  type="number"
                  onChange={handleData}
                  defaultValue={0}
                />
                <TextField
                  name="chest"
                  label="Chest"
                  type="number"
                  onChange={handleData}
                  defaultValue={0}
                />
                <TextField
                  name="shoulders"
                  label="Shoulders"
                  type="number"
                  onChange={handleData}
                  defaultValue={0}
                />
                <TextField
                  name="daman"
                  label="Daman"
                  type="number"
                  onChange={handleData}
                  defaultValue={0}
                />
                <TextField
                  name="waist"
                  label="Waist"
                  type="number"
                  onChange={handleData}
                  defaultValue={0}
                />
                <TextField
                  name="sleeves"
                  label="Sleeves"
                  type="number"
                  onChange={handleData}
                  defaultValue={0}
                />
                <TextField
                  name="armhole"
                  label="Arm Hole"
                  type="number"
                  onChange={handleData}
                  defaultValue={0}
                />
                <TextField
                  name="colloar"
                  label="Colloar"
                  type="number"
                  onChange={handleData}
                  defaultValue={0}
                />
              </Box>
            ) : (
              ""
            )}
            <textarea
              name="desc"
              placeholder="Description and Details about Package"
              style={{
                width: "100%",
                padding: "13px",
                resize: "none",
                margin: "20px 0 0 0 ",
              }}
              rows={10}
              onChange={(e) =>
                setData({ ...Data, [e.target.name]: e.target.value })
              }
            />
            <Box py={1}>
              <Typography variant="body2" m={1}>
                Cloth ID
              </Typography>
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                name="clothid"
                value={Data.account}
                onChange={(e, newValue) => {
                  const realValue = newValue.split(" ");
                  console.log(realValue);
                  // setData({ ...Data, clothid: realValue[0] });
                  Data.clothid = realValue[0];
                  let temp = ClothID.filter((item) => {
                    return item._id === realValue[0];
                  });
                  setSelected(temp);
                  setData({
                    ...Data,
                    marketerpayment: Selected[0].marketerpayment,
                  });
                  console.log(Selected);
                }}
                sx={{ minWidth: "150px" }}
                options={ClothID.map((option) => {
                  return option._id + " " + option.name;
                })}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Select cloth here"
                    InputProps={{
                      ...params.InputProps,
                      type: "search",
                    }}
                  />
                )}
              />
              <Box my={1}>
                <Typography variant="body2" mt={1} mx={1}>
                  Original Price
                </Typography>
                <Typography variant="caption" m={1}>
                  Please verify that the entered payment and given payment is
                  equal to the original one!
                </Typography>
              </Box>
              <Typography color="red" variant="caption">
                {Selected[0].price !== Data.price
                  ? "Original and Entered Values don't match!"
                  : ""}
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={2}>
                <TextField
                  disabled
                  value={Selected[0].price}
                  placeholder="Item Original Price"
                />
                <TextField
                  disabled
                  value={
                    Selected[0].quantity === 0
                      ? "Out of Stock"
                      : Selected[0].quantity
                  }
                  placeholder="Item Quantity Left"
                />
              </Box>
            </Box>
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
                width: "150px",
              }}
            >
              {Submit ? (
                "Submitted"
              ) : CP ? (
                <Box display="flex" justifyContent="center">
                  <CircularProgress sx={{ color: "black", p: "5px" }} />
                </Box>
              ) : (
                "Order"
              )}
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Create;
