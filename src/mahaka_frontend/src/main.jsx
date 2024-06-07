import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import * as backend from "../../../.dfx/local/canisters/mahaka_backend";
import { defaultProviders } from "@connect2ic/core/providers";
import { Connect2ICProvider } from "@connect2ic/react";
import { createClient } from "@connect2ic/core";
import { Provider } from "react-redux";
import store from "@/redux/store";

const client = createClient({
  canisters: { backend },
  providers: defaultProviders,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  // doesn't require react strict for prod build
  <React.StrictMode>
    <Provider store={store}>
      <Connect2ICProvider client={client}>
        <App />
      </Connect2ICProvider>
    </Provider>
  </React.StrictMode>
);
