import React from "react";
import useUserRole from "../Hook/useUserRole";
import useAuth from "../Hook/useAuth";
import { useLocation } from "react-router";

const RiderRoute = ({ children }) => {
  const { role, isRoleLoading } = useUserRole();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (isRoleLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );
  }
  if (!user || role !== "rider") {
    return (
      <Navigate state={{ from: location.pathname }} to="/forbidden"></Navigate>
    );
  }
  return children;
};

export default RiderRoute;
