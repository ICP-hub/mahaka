import { Actor } from "@dfinity/agent";
import { useAgent, useIdentityKit } from "@nfid/identitykit/react";
import { createContext, useContext, useState, useEffect } from "react";
import { idlFactory as targetIdlFactory } from "../../../declarations/mahaka_backend";

const AuthContext = createContext();
const canisterID = process.env.CANISTER_ID_MAHAKA_BACKEND;

export const useAuthClient = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [wallet, setWallet] = useState("");
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

  useEffect(() => {
    if (user && identity !== "AnonymousIdentity") {
      setIsConnected(true);

      const expiryTime = Number(
        identity?._delegation?.delegations?.[0]?.delegation?.expiration
      );
      if (expiryTime) {
        localStorage.setItem("delegationExpiry", expiryTime / 1e6);
      }

      const signerId = localStorage.getItem("signerId");
      if (signerId === "Plug") setWallet("plug");
      else if (signerId === "NFIDW") setWallet("nfidw");
      else setWallet("unknown");

      const interval = setInterval(() => {
        const currentTime = Date.now();
        if (delegationExpiry && currentTime >= delegationExpiry) {
          disconnect();
          setTimeout(() => window.location.reload(), 2000);
        }
      }, 1000);

      return () => clearInterval(interval);
    } else {
      setIsConnected(false);
    }
  }, [user, identity, delegationExpiry]);

  const backend = authenticatedAgent
    ? Actor.createActor(targetIdlFactory, {
        agent: authenticatedAgent,
        canisterId: canisterID,
      })
    : null;
  console.log("backedn", backend, "agent", authenticatedAgent);

  return {
    isConnected,
    wallet,
    delegationExpiry,
    login: connect,
    logout: disconnect,
    balance: icpBalance,
    principal: user?.principal,
    backend,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useAuthClient();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
