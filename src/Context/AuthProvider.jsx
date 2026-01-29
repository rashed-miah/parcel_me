import React from "react";
import { AuthContext } from "./AuthContent";

const authInfo = {
  name: "rashed",
};

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
