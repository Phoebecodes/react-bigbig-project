import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
// will remove later
// import { useUserContext } from "../context/user_context";

const PrivateRoute = ({ children }) => {
  // const { myUser } = useUserContext();
  const { user, isLoading } = useAuth0();
  if (!isLoading) {
    if (user) {
      return children;
    } else return <Navigate to="/" />;
  }
  return <></>;
};
export default PrivateRoute;
