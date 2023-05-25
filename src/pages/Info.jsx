import { Alert, AlertTitle, Box, Divider, Snackbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Splash from "../components/Splash";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL, URL1 } from "../Config";
import { useDispatch, useSelector } from "react-redux";

function Info() {
  const { token, marketerid } = useSelector(state => state.checkToken)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [Loading, setLoading] = useState(1);
  const [Err, setErr] = useState(0)
  const [ErrMsg, setErrMsg] = useState("")
  const [Data, setData] = useState({
    fname: "",
    father: "",
    age: "",
    mobile: "",
    email: "",
    _id: "",
    state: "",
    city: "",
  });

  const handleClick1 = () => {
    setErr(!Err);
  };

  const fetchData = async () => {
    try {
      const fetch = await axios.post(`${URL1}/userInfo`, {
        token: token,
        id: marketerid
      })
      if (fetch.status === 200)
      {
        setData(fetch.data[0] )
      }
      setLoading(0)
    } catch (error) {
      setLoading(0)
      setErrMsg(error.message)
      setErr(1)
    }
  }

  useEffect(() => {
    fetchData()
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
        <Typography py={1} variant="body1">
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
          <Snackbar open={Err} onClose={handleClick1}>
            <Alert onClose={() => {}} onClick={handleClick1} severity="error">
              <AlertTitle>Error</AlertTitle>
              {ErrMsg} — <strong>Wait for a while!</strong>
            </Alert>
          </Snackbar>
          <HandleDate />
          <Typography variant="h4">General</Typography>
          <Typography variant="body2">
            Be patient! All of your data is secure and is only available for you
            to view. Change your Information by going into{" "}
            <Link to="/dashboard/settings" style={{ color: "gray" }}>
              Settings
            </Link>
            .
          </Typography>
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
              <Typography>Name</Typography> {Data.fname + " " + Data.lname}
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
              <Typography>Easypaisa</Typography> {Data.mobile}
            </Typography>
            <Divider />
            <Typography display="flex" justifyContent="space-between">
              <Typography>Registration</Typography> {Data._id}
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
              <Typography>Email</Typography> {Data.email}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Info;
