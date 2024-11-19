import React, { createContext, useContext, useState, useEffect } from "react";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { createActor } from "../../../declarations/mahaka_backend";
import { Navigate, useNavigate } from "react-router-dom";
import { DelegationIdentity } from "@dfinity/identity";

const AuthContext = createContext();

const canisterID = process.env.CANISTER_ID_MAHAKA_BACKEND;
export const useAuthClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const signerId = localStorage.getItem("signerId");
  const [wallet, setWallet] = useState("");
  // const [delegationExpiry, setDelegationExpiry] = useState(null)
  const delegationExpiry =
    Number(localStorage.getItem("delegationExpiry")) || 0;
  const {
    user,
    connect,
    disconnect: identityKitDisconnect,
    identity,
    icpBalance,
  } = useIdentityKit();
  const authenticatedAgent = useAgent();

  const disconnect = () => {
    identityKitDisconnect();
    setIsConnected(false);
    localStorage.removeItem("delegationExpiry");
  };
  console.log("deligation", delegationExpiry);
  console.log("agent", authenticatedAgent);

  const checkDelegationExpiry = () => {
    if (delegationExpiry) {
      const currentTime = Date.now();
      console.log(
        "Delegation Expiry Time:",
        new Date(delegationExpiry).toLocaleString()
      );

      if (currentTime >= delegationExpiry) {
        toast.success("Delegation expired, logging out...");
        disconnect();
        //window.location.href = "/login";
        setTimeout(() => {
          window.location.reload(true); // Force page reload
        }, 2000); // Optional delay to allow toast to show fully
      }
    }
  };

  useEffect(() => {
    if (user && identity !== "AnonymousIdentity") {
      setIsConnected(true);

      const expiryTime = Number(
        identity?._delegation?.delegations?.[0]?.delegation?.expiration
      );
      if (expiryTime) {
        localStorage.setItem("delegationExpiry", expiryTime / 1e6);
      }

      // const expiryTime = Date.now() + 30 * 1000;

      // if (expiryTime) {
      //   setDelegationExpiry(expiryTime);
      // }

      if (signerId === "Plug") {
        setWallet("plug");
      } else if (signerId === "NFIDW") {
        setWallet("nfidw");
      } else {
        setWallet("sometingwrong");
      }

      const interval = setInterval(checkDelegationExpiry, 1000);

      return () => clearInterval(interval);
    } else {
      setIsConnected(false);
    }
  }, [user, delegationExpiry, connect]);

  return {
    isConnected,
    delegationExpiry,
    wallet,
    login: connect,
    logout: disconnect,
    balance: icpBalance,
    principal: user?.principal,
    backend: createActor(canisterID, {
      agentOptions: { identity, verifyQuerySignatures: false },
    }),
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
