import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  IconButton,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import Splash from "../components/Splash";

function Email() {
  const [Loading, setLoading] = useState(1);
  const [Open, setOpen] = useState(0);
  const handleClick = () => {
    setOpen(!Open);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("name");
    const subject = data.get("subject");
    const message = data.get("message");
    console.log(name + " " + subject + " " + message);
    if (name === "" || subject === "" || message === "") {
      setOpen(1);
    }
  };

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
        <Box
          sx={{
            height: "100%",
            // overflowY: "scroll",
          }}
        >
          <Snackbar open={Open} onClose={handleClick}>
            <Alert onClose={() => {}} onClick={handleClick} severity="error">
              <AlertTitle>Error</AlertTitle>
              This is an error alert — <strong>check it out!</strong>
            </Alert>
          </Snackbar>
          <Typography variant="h4">Get in touch with Us</Typography>
          <Typography variant="caption">
            Don't try to go against our security guidelines and authentications.
            Please make sure that every sent message is read carefully because
            it is responded as well. Meanwhile if not responded then make sure
            sent it or your message wants some time to be solved in a best
            manner. So please don't hyper on any condition. We'll try to reach
            you on any condition. <br /> Thank you!
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              mt: 2,
            }}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
          >
            <Box
              sx={{
                mt: 2,
                width: {
                  md: "100%",
                  lg: "50%",
                },
              }}
            >
              <TextField
                name="name"
                margin="normal"
                required
                label="Name"
                autoComplete="off"
                autoFocus
                fullWidth
              />
              <TextField
                name="subject"
                margin="normal"
                required
                label="Subject"
                autoComplete="off"
                autoFocus
                fullWidth
              />
            </Box>
            <label style={{ fontSize: "13px" }}>
              Please explain yourself here and then submit.
            </label>
            <textarea
              name="message"
              placeholder="Explain here..."
              style={{
                width: "100%",
                padding: "13px",
                resize: "none",
                margin: "5px 0",
              }}
              rows={30}
            />
            <Button
              type="submit"
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                bgcolor: "gray",
                ":hover": {
                  bgcolor: "grey",
                },
                alignSelf: "flex-end",
              }}
            >
              Send
            </Button>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default Email;
