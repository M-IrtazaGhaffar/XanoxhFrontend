import React, { useEffect, useState } from "react";
import Splash from "../components/Splash";
import {
  Box,
  Button,
  Chip,
  CircularProgress,
  List,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";

function Create() {
  const [Type, setType] = useState("");
  const [Data, setData] = useState({
    clothid: "",
    marketerid: "",
    client: "",
    paymentnumber: "",
    address: "",
    quantity: "",
    price: "",
    desc: "",
    length: 0,
    chest: 0,
    waist: 0,
    daman: 0,
    sleeves: 0,
    shoulders: 0,
    colloar: 0,
    armhole: 0,
    type: Type,
  });

  const [Loading, setLoading] = useState(1);
  const [Note, setNote] = useState([
    "Make sure your client is real and authentic to purchase",
    "Verify the payment method type",
    "50% payment will be done to contiue the purchasing",
    "Write the real name of client in given form",
    "Take 100% real and Okay details of product",
    "You can also proceed with custom details even",
    "Check again before ordering",
  ]);
  const [ClothID, setClothID] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  const handleData = (e) => {
    setData({ ...Data, [e.target.name]: e.target.value });
  };

  const [Sizes, setSizes] = useState([
    {
      name: "Small",
      size: {
        length: 39,
        chest: 21.5,
        waist: 22,
        daman: 22.5,
        sleeves: 23.5,
        shoulders: 17.5,
        colloar: 14.5,
        armhole: 9.5,
      },
    },
    {
      name: "Medium",
      size: {
        length: 41,
        chest: 22.5,
        waist: 23,
        daman: 23.5,
        sleeves: 24.5,
        shoulders: 14.5,
        colloar: 15.5,
        armhole: 10.5,
      },
    },
    {
      name: "Large",
      size: {
        length: 43,
        chest: 23.5,
        waist: 24,
        daman: 25.5,
        sleeves: 25.5,
        shoulders: 19.5,
        colloar: 16.5,
        armhole: 11.5,
      },
    },
    {
      name: "xLarge",
      size: {
        length: 45,
        chest: 24.5,
        waist: 25,
        daman: 26.5,
        sleeves: 26.5,
        shoulders: 20.5,
        colloar: 17.5,
        armhole: 12.5,
      },
    },
  ]);

  const handleType = (size) => {
    var n = 0;
    if (size === "small") setType("small");
    if (size === "medium") {
      setType("medium");
      n = 1;
    }
    if (size === "large") {
      setType("large");
      n = 2;
    }
    if (size === "xlarge") {
      setType("xlarge");
      n = 3;
    }
    if (size === "custom") {
      setType("custom");
    }
    Data.length = Sizes[n].size.length;
    Data.chest = Sizes[n].size.chest;
    Data.waist = Sizes[n].size.waist;
    Data.daman = Sizes[n].size.daman;
    Data.sleeves = Sizes[n].size.sleeves;
    Data.shoulders = Sizes[n].size.shoulders;
    Data.colloar = Sizes[n].size.colloar;
    Data.armhole = Sizes[n].size.armhole;
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(0);
    }, 3000);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(Data);
  };

  return (
    <Box>
      {Loading ? (
        <Splash />
      ) : (
        <Box>
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
                onChange={handleData}
              />
              <TextField
                name="paymentnumber"
                label="Payment Number"
                onChange={handleData}
              />
              <TextField name="address" label="Address" onChange={handleData} />
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
                  name="Shoulders"
                  label="shoulders"
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
              onChange={handleData}
            />
            <Box py={1}>
              <Typography variant="body2">Cloth ID</Typography>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Cloth ID"
                name="clothid"
                value={Data.clothid}
                sx={{ minWidth: "300px" }}
                onChange={handleData}
              >
                {ClothID.map((item) => {
                  return <MenuItem value={item}>{item}</MenuItem>;
                })}
              </Select>
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
              }}
            >
              {Loading ? (
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
