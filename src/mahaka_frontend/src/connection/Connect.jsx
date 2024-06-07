import {
  useDialog,
  ConnectDialog,
  useConnect,
  ConnectButton,
} from "@connect2ic/react";
import "@connect2ic/core/style.css";
import { useDispatch } from "react-redux";
import { login, logout } from "@/redux/reducers/auth/authReducer";
import { useEffect } from "react";

const ConnectionSetup = ({ btnStyle }) => {
  const { open } = useDialog();
  const dispatch = useDispatch();

  const { isConnected, principal, activeProvider } = useConnect({
    onDisconnect: () => {
      // Signed out
      dispatch(logout());
    },
  });

  useEffect(() => {
    if (principal) {
      dispatch(login({ plugPrincipal: principal, plugBalance: 0 }));
    }
  }, [principal]);

  return (
    <>
      <span onClick={() => open()} className={`px-4 py-2 bg-error ${btnStyle}`}>
        <ConnectButton />
      </span>
      <ConnectDialog />
    </>
  );
};

export default ConnectionSetup;
