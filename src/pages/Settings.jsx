import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useState } from "react";

function Settings() {
  const [Data, setData] = useState(0);
  const [Loading, setLoading] = useState(0);

  const handleSubmit = () => {
    alert("Sent");
    // setLoading(1)
  };

  return (
    <Box display="flex" justifyContent="center" flexDirection="column">
      <Box display="flex" flexDirection="column">
        <Typography variant="h4">Set yourself</Typography>
        <Typography pb={3} variant="caption">
          We assure you that your personal information is our resposibility. So,
          we've make a section to only change your easypaisa number. Remember,
          1st you have to appeal now to change your number and after the
          acceptance your number will be changed. You can also view it in Your
          Information. <br /> Thankyou!
        </Typography>
      </Box>
      <TextField
        name="newnumber"
        label="New Number"
        type="number"
        onChange={(e) => setData(e.target.value)}
        defaultValue={923001234567}
        sx={{ width: "200px" }}
      />
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
          width: "100px",
        }}
      >
        {Loading ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress sx={{ color: "black", p: "5px" }} />
          </Box>
        ) : (
          "Appeal"
        )}
      </Button>
    </Box>
  );
}

export default Settings;
