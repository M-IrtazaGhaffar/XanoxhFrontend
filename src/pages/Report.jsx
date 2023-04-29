import { Alert, AlertTitle, Box, Button, Snackbar, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Splash from "../components/Splash";

function Report() {
  const [Data, setData] = useState("")
  const [Loading, setLoading] = useState(1);
  const [Open, setOpen] = useState(0)
  const handleClick = () => {
    setOpen(!Open);
  };

  const handleInput = () => {
    if (Data === "") {
      setOpen(true)
    }
  }

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
          <Snackbar open={Open} onClose={handleClick}>
            <Alert onClose={() => {}} onClick={handleClick} severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
          <Typography variant="h4">Report Us</Typography>
          <Typography variant="caption">
            Caution: Just report those problems which are related to software
            crashing, hanging etc here. We'll try our best to respond you!
          </Typography>
          <textarea
            name="message"
            placeholder="Explain here..."
            style={{
              width: "100%",
              padding: "13px",
              resize: "none",
              margin: "5px 0",
            }}
            rows={20}
            onChange={(e) => setData(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              mb: 2,
              bgcolor: "gray",
              ":hover": {
                bgcolor: "grey",
              },
              alignSelf: "flex-end",
            }}
            onClick={handleInput}
          >
            Report
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default Report;
