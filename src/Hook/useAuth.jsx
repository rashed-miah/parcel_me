import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContent";

const useAuth = () => {
  return useContext(AuthContext);
};

export default useAuth;
