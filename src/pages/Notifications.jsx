import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useState } from "react";
import Splash from "../components/Splash";
import { useEffect } from "react";

function Notifications() {
  const [Loading, setLoading] = useState(1)
  const [Data, setData] = useState([
    {
      title: "lorem23",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorem nam cumque! Cupiditate aliquam ipsum aperiam eveniet obcaecati ratione minus repudiandae ducimus eum!",
      date: "23-04-2023",
    },
    {
      title: "lorem23",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorem nam cumque! Cupiditate aliquam ipsum aperiam eveniet obcaecati ratione minus repudiandae ducimus eum!",
      date: "23-04-2023",
    },
    {
      title: "lorem23",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorem nam cumque! Cupiditate aliquam ipsum aperiam eveniet obcaecati ratione minus repudiandae ducimus eum!",
      date: "23-04-2023",
    },
    {
      title: "lorem23",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorem nam cumque! Cupiditate aliquam ipsum aperiam eveniet obcaecati ratione minus repudiandae ducimus eum!",
      date: "23-04-2023",
    },
    {
      title: "lorem23",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolorem nam cumque! Cupiditate aliquam ipsum aperiam eveniet obcaecati ratione minus repudiandae ducimus eum!",
      date: "23-04-2023",
    },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(0)
    }, 3000);
  }, [])
  
  
  return (
    <Box>
      {
        Loading ? <Splash /> : <Box>
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
                  <Typography variant="body1"><strong>{item.title}</strong></Typography>
                  <Typography variant="body2">{item.desc}</Typography>
                  <Typography variant="caption">{item.date}</Typography>
                </TimelineContent>
              </TimelineItem>
            );
          })}
        </Timeline>
      </Box>
      }
    </Box>
  );
}

export default Notifications;
