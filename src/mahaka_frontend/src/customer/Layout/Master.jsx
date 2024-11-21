import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Master() {
  return (
    <div className="flex flex-col overflow-y-auto h-screen light">
      <Header />
      <div className="h-full">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
