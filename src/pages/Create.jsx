import React, { useEffect, useState } from "react";
import Splash from "../components/Splash";
import {
  Box,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

function Create() {
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

  useEffect(() => {
    setTimeout(() => {
      setLoading(0);
    }, 3000);
  }, []);

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
            <Typography variant="body2" textAlign='center' p={2}>
                  Note: All sizes are in inches (In)
                </Typography>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
}

export default Create;
