import React from "react";
import "./skeleton.scss";

function Skeleton({ styleObj }) {
  return <div style={styleObj} role="progressbar" className="skeleton"></div>;
}

export default Skeleton;
