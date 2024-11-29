import { useIdentityKit } from "@nfid/identitykit/react";
import { useNavigate } from "react-router-dom";
import notificationManager from "../utils/notificationManager";

export const useLogout = () => {
  const navigate = useNavigate();
  const { disconnect } = useIdentityKit();

  const logoutAndRedirect = () => {
    disconnect();
    navigate("/");
    notificationManager.success("Logout Successfully");
  };

  return logoutAndRedirect;
};
