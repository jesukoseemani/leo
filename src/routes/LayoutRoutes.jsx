import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar/Navbar";

function LayoutRoutes() {
  const STYLEWRAPPER = {
    position: "relative",
  };
  const STYLENAV = {
    position: "sticky",
    top: 0,
    left: 0,
    zIndex: 100,
    width: "100%",
    margin: "0 auto",
  };
  return (
    <div style={STYLEWRAPPER}>
      <div style={STYLENAV}>
        <Navbar />
      </div>

      <Outlet />
    </div>
  );
}

export default LayoutRoutes;
