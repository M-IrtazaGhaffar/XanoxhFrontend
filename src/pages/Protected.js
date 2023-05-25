import React from "react";
import SignIn from "./Signin";
import { useSelector } from "react-redux";

function Protected({ Component }) {
  const { token } = useSelector((state) => state.checkToken);
  var login = false;
  if (token !== "") login = true;
  return <>{login ? <Component /> : <SignIn />}</>;
}

export default Protected;
