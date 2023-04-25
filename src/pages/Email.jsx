import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  IconButton,
  Menu,
  TextField,
  TextareaAutosize,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Splash from "../components/Splash";

function Email() {
  const [Loading, setLoading] = useState(1);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      name: data.get("name"),
      subject: data.get("subject"),
      message: data.get("message"),
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(0)
    }, 3000);
  }, [])
  

  return (
    <Box>
      {Loading ? (
        <Splash />
      ) : (
        <Box>
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
              width: {
                md: '100%',
                lg: '50%'
              }
            }}
            display="flex"
            alignItems="flex-start"
            justifyContent="center"
            flexDirection="column"
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
            <FormControl>
              <FormLabel sx={{ fontSize: "13px" }}>Message</FormLabel>
              <TextareaAutosize minRows={10} cols={ 42} name="message" />
              <FormHelperText>
                We'll contact you as soon as possible!
              </FormHelperText>
            </FormControl>
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
