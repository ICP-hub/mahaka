import React from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

export default function Master() {
  return (
    <div className="light flex flex-col">
      <Header />
      <div className="overflow-y-auto h-screen">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
}
