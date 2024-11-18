import { useState } from "react";
import { IdentityKitProvider, IdentityKitTheme } from "@nfid/identitykit/react";
import { IdentityKitAuthType, NFIDW, Plug } from "@nfid/identitykit";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
// import { HttpAgent } from "@dfinity/agent";

export default function IdentityWrapper() {
  const [mount, setMount] = useState(false);
  //https://dev.nfid.one/rpc
  const signers = [NFIDW, Plug];
  useState(() => {
    setMount(true);
  }, []);

  const targetCanister = process.env.CANISTER_ID_MAHAKA_BACKEND;
  if (mount)
    return (
      <IdentityKitProvider
        signers={signers}
        theme={IdentityKitTheme.SYSTEM}
        authType={IdentityKitAuthType.DELEGATION}
        signerClientOptions={{
          targets: [targetCanister],
        }}
      >
        <Provider store={store}>
          <App />
        </Provider>
      </IdentityKitProvider>
    );
}
