import React, { ReactNode } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = useAppSelector((state) => state.auth.token);
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default PrivateRoute;
