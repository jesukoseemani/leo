import React, { useState } from "react";
import Hamburger from "../icons/Hamburger";
import useClickOutside from "../../hooks/useClickOutside";
import "./hamburgerMenu.scss";
import { Link } from "react-router-dom";

function HamburgerMenu() {
  const [active, setActive] = useState(false);
  let domNode = useClickOutside(() => {
    setActive(false);
  });
  return (
    <div
      ref={domNode}
      onClick={() => setActive((active) => !active)}
      className="wrapper"
    >
      <Hamburger />

      <div className={active ? "content-box active" : "content-box"}>
        <Link to="/favorites" className="content-link">
          FAVOURITES
        </Link>
        <div className="line"></div>
        <Link to="/watch-later" className="content-link">
          WATCH LATER
        </Link>
      </div>
    </div>
  );
}

export default HamburgerMenu;
