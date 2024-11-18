import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./globals.css";
import "@nfid/identitykit/react/styles.css";
import IdentityWrapper from "./IdentityWrapper";

ReactDOM.createRoot(document.getElementById("root")).render(
  <IdentityWrapper />
);
