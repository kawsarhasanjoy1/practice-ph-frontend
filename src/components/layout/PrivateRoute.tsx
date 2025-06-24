import React, { ReactNode } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate } from "react-router-dom";
import { logOut } from "../../redux/features/authSlice";
import { verifyToken } from "../../utils/verifyToken";

const PrivateRoute = ({
  children,
  role,
}: {
  children: ReactNode;
  role: string | undefined;
}) => {
  const token = useAppSelector((state) => state.auth.token);
  let user;
  if (token) {
    user = verifyToken(token) as {
      userId: string;
      role: string;
      iat: number;
      exp: number;
    };
  }
  const dispatch = useAppDispatch();
  if (role !== undefined && role !== user?.role) {
    dispatch(logOut());
    return <Navigate to={"/login"} replace={true} />;
  }
  if (!token) {
    return <Navigate to={"/login"} replace={true} />;
  }
  return children;
};

export default PrivateRoute;
