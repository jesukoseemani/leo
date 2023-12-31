import React from "react";
import "./scrollToTop.scss";
import ArrowUp from "../icons/ArrowUp";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

function ScrollToTop({ scroll }) {
  const { pathname } = useLocation();
  const [click, setClick] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
    setClick(false);
  }, [pathname, click]);

  const clickToTop = () => {
    setClick(true);
  };

  return (
    <div
      className={`back-to-top ${scroll > 120 ? "active" : undefined}`}
      onClick={clickToTop}
    >
      <ArrowUp />
    </div>
  );
}

export default ScrollToTop;
