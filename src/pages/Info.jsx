import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Splash from "../components/Splash";
import { useEffect } from "react";

function Info() {
  const [Loading, setLoading] = useState(1);
  const [Data, setData] = useState({
    name: "Muhammad Irtaza Ghaffar",
    father: "Abdul Ghaffar",
    age: "20",
    number: "923320523524",
    reg: "6896796hbjkivfdb674687",
    state: "Punjab",
    city: "Jhelum",
    remarks: "Excellent",
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(0);
    }, 3000);
  }, []);

  const HandleDate = () => {
    const d = new Date();
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    return (
      <Box>
        <Typography variant="h6">
          {d.getDate()}/{d.getMonth() + 1} - {d.getFullYear()}{" "}
          {`(${[weekday[d.getDay()]]})`}
        </Typography>
      </Box>
    );
  };

  return (
    <Box>
      {Loading ? (
        <Splash />
      ) : (
        <Box>
          <HandleDate />
          <Box p={5} display="flex" gap={2} flexDirection="column">
            <Typography display="flex" justifyContent="space-between">
              <Typography>Name</Typography> {Data.name}
            </Typography>
            <Divider />
            <Typography display="flex" justifyContent="space-between">
              <Typography>Father</Typography> {Data.father}
            </Typography>
            <Divider />
            <Typography display="flex" justifyContent="space-between">
              <Typography>Age</Typography> {Data.age}
            </Typography>
            <Divider />
            <Typography display="flex" justifyContent="space-between">
              <Typography>Easypaisa</Typography> {Data.number}
            </Typography>
            <Divider />
            <Typography display="flex" justifyContent="space-between">
              <Typography>Registration</Typography> {Data.reg}
            </Typography>
            <Divider />
            <Typography display="flex" justifyContent="space-between">
              <Typography>State</Typography> {Data.state}
            </Typography>
            <Divider />
            <Typography display="flex" justifyContent="space-between">
              <Typography>City</Typography> {Data.city}
            </Typography>
            <Divider />
            <Typography display="flex" justifyContent="space-between">
              <Typography>Remarks</Typography> {Data.remarks}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Info;
