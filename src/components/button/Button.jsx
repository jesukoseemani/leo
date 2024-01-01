import React from "react";
import PropTypes from "prop-types";

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

Button.defaultProps = {
  iconState: false,
};

Button.propTypes = {
  iconState: PropTypes.bool,
  iconPosition: PropTypes.string,
  icon: PropTypes.element,
  title: PropTypes.string.isRequired,
  style: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.string,
    width: PropTypes.string,
    height: PropTypes.string,
    radius: PropTypes.string,
    background: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default Button;
