import * as React from "react";
import "./App.css"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SignIn from "./pages/Signin";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "styled-components";
import Create from "./pages/Create";
import Dashboard from "./pages/Dashboard";
import Status from "./pages/Status";
import Report from "./pages/Report";
import Email from "./pages/Email";
import Notifications from "./pages/Notifications";
import Payments from "./pages/Payments";
import Settings from "./pages/Settings";
import Info from "./pages/Info";
import Forgot from "./pages/Forgot";
import Protected from "./pages/Protected";
import Notfound from "./pages/Notfound";

export default function MyApp() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path="/signin" element={<SignIn />} />
          <Route exact path="/forgot" element={<Forgot />} />
          <Route exact path="/dashboard" element={<Protected Component={Dashboard} />} >
            <Route index path="/dashboard/" element={<Create />} />
            <Route exact path="/dashboard/status" element={<Status />} />
            <Route exact path="/dashboard/report" element={<Report />} />
            <Route exact path="/dashboard/email" element={<Email />} />
            <Route exact path="/dashboard/status" element={<Status />} />
            <Route exact path="/dashboard/notifications" element={<Notifications />} />
            <Route exact path="/dashboard/info" element={<Info />} />
            <Route exact path="/dashboard/settings" element={<Settings />} />
            <Route exact path="/dashboard/payments" element={<Payments />} />
            <Route path="/dashboard/*" element={<Notfound />} />
          </Route>
            <Route path="*" element={<Notfound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
