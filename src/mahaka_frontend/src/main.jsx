import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./globals.css";

import { AuthProvider } from "./redux/reducers/auth/authReducer";
import {
  IdentityKitProvider,
  IdentityKitTheme,
  useIdentityKit,
} from "@nfid/identitykit/react";
import store from "./redux/store";
import { Provider } from "react-redux";
import {
  IdentityKitAuthType,
  MockedSigner,
  NFIDW,
  Plug,
  InternetIdentity,
  Stoic,
} from "@nfid/identitykit";
import "@nfid/identitykit/react/styles.css";

const signers = [NFIDW, Plug];
const canisterID = process.env.CANISTER_ID_MAHAKA_BACKEND;
ReactDOM.createRoot(document.getElementById("root")).render(
  <IdentityKitProvider
    signers={signers}
    theme={IdentityKitTheme.SYSTEM}
    authType={IdentityKitAuthType.DELEGATION}
    signerClientOptions={{
      targets: [canisterID],
    }}
  >
    <React.StrictMode>
      <AuthProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </AuthProvider>
    </React.StrictMode>
  </IdentityKitProvider>
);
