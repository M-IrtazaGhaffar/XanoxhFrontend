import React from "react";
import SignIn from "./Signin";

function Protected({ Component }) {
  const login = false;
  return <>{login ? <Component /> : <SignIn />}</>;
}

export default Protected;
