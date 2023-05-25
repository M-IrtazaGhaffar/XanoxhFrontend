import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Alert, AlertTitle, Box, Snackbar, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Splash from "../components/Splash";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { URL1 } from "../Config";

function Notifications() {
  const [Loading, setLoading] = useState(1);
  const [Data, setData] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { marketerid, token } = useSelector((state) => state.checkToken);
  const [Err, setErr] = useState(0);
  const [ErrMsg, setErrMsg] = useState("");

  const handledata = async () => {
    try {
      setLoading(1);
      const fetch = await axios.post(`${URL1}/notifications`, {
        id: marketerid,
        token: token,
      });
      console.log(fetch);
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
    handledata()
  }, []);

  return (
    <Box>
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
          <Typography variant="h4">Be Notified</Typography>
          <Typography variant="caption">
            Please be notified about everything. We'll not be responsible for
            further warnings.
          </Typography>

          <Timeline
            sx={{
              [`& .${timelineItemClasses.root}:before`]: {
                flex: 0,
                padding: 0,
              },
            }}
          >
            {Data.map((item) => {
              return (
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="body1">
                      <strong>{item.title}</strong>
                    </Typography>
                    <Typography variant="body2">{item.desc}</Typography>
                    <Typography variant="caption">{item.date.split("T")[0]}</Typography>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Box>
      )}
    </Box>
  );
}

export default Notifications;
