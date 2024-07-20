import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./globals.css";
import { AuthProvider } from "./auth/useAuthClient";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(

    <AuthProvider>
      <App />
    </AuthProvider>

);
