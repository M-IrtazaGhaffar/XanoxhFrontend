import React from "react";
import SignIn from "./Signin";

function Protected({ Component }) {
  const login = 1;
  return <>{login ? <Component /> : <SignIn />}</>;
}

export default Protected;
