import React from "react";
import "./contentWrapper.scss";

function ContentWrapper({ children }) {
  return <div className="conponent-wrapper">{children}</div>;
}

export default ContentWrapper;
