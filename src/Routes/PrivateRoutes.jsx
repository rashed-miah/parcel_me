import React from "react";
import useAuth from "../Hook/useAuth";
import { Navigate, useLocation } from "react-router";
import Loader from "../SharedPages/Loader";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
};

export default PrivateRoutes;
