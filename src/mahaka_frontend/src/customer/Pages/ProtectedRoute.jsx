import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../connect/useClient";
import notificationManager from "../../common/utils/notificationManager";
import { ConnectWallet } from "@nfid/identitykit/react";

const ProtectedRoute = ({ children, checkInterval = 60000 }) => {
  const { principal, logout, login } = useAuth();
  const location = useLocation();
  const [isAuthorized, setIsAuthorized] = useState(!!principal);

  useEffect(() => {
    const checkPrincipal = () => {
      if (!principal) {
        setIsAuthorized(false);
        notificationManager.error("Please connect your wallet");
        logout();
      } else {
        setIsAuthorized(true);
      }
    };

    checkPrincipal();

    const intervalId = setInterval(() => {
      checkPrincipal();
    }, checkInterval);

    return () => clearInterval(intervalId);
  }, [principal, logout, checkInterval]);

  if (!isAuthorized) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return children;
};

export default ProtectedRoute;
