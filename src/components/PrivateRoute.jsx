import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuthStatus } from "../hooks/useAuthStatus";
import { Spinner } from "./Spinner";

export const PrivateRoute = () => {
  const { loggedIn, loading } = useAuthStatus();
  if (loading) return <Spinner></Spinner>;

  return loggedIn ? <Outlet></Outlet> : <Navigate to="/signin" />;
};
