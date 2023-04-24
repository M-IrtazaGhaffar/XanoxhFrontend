import * as React from "react";
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";

export default function MyApp() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/dashboard" element={<Dashboard />} >
            <Route exact path="/dashboard/" element={<Create />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
