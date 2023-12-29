import React from "react";

function Button({
  iconState = false,
  iconPosition,
  icon,
  title,
  style,
  onClick,
}) {
  const STYLESWRAPPER = {
    width: style?.width ? style.width : "272px",
    height: style?.height ? style.height : "64px",
    borderRadius: style?.radius ? style.radius : "10px",
    background: style?.background ? style.background : "#D40D1F",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    outline: "none",
    border: "none",
    cursor: "pointer",
  };

  const STYLESPARAGRAPH = {
    color: style?.color ? style.color : "#FFF",
    fontFamily: "DM Sans",
    fontSize: style?.fontSize ? style.fontSize : "22px",
    fontWeight: 500,
    marginTop: 0,
    marginBottom: 0,
    padding: 0,
    marginRight: style?.iconPosition === "right" ? "0px" : "10px",
    marginLeft: style?.iconPosition === "left" ? "0px" : "10px",
  };
  return (
    <button onClick={onClick} style={STYLESWRAPPER}>
      {iconState && iconPosition === "left" && icon}
      <p style={STYLESPARAGRAPH}>{title}</p>
      {iconState && iconPosition === "right" && icon}
    </button>
  );
}

export default Button;
