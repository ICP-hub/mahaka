import React, { useState, useEffect } from "react";
import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react";
import { IdentityKitAuthType, NFIDW, Plug } from "@nfid/identitykit";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import { AuthProvider } from "./connect/useClient";
import { Canister } from "@dfinity/utils";

export default function IdentityWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  const canisterID = process.env.CANISTER_ID_MAHAKA_BACKEND;
  const canisterIDFiat = process.env.CANISTER_ID_FIATPAYMENT;
  const signers = [NFIDW, Plug];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <IdentityKitProvider
      signers={signers}
      theme={IdentityKitTheme.SYSTEM}
      authType={IdentityKitAuthType.DELEGATION}
      signerClientOptions={{
        targets: [canisterID, canisterIDFiat],
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000), // 1 week in nanoseconds
        idleOptions: {
          idleTimeout: 4 * 60 * 60 * 1000, // 4 hours in milliseconds
          disableIdle: false, // Enable logout on idle timeout
        },
        keyType: "Ed25519", // Use Ed25519 key type for compatibility
        allowInternetIdentityPinAuthentication: true, // Enable PIN authentication
      }}
    >
      <Provider store={store}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Provider>
    </IdentityKitProvider>
  );
}
