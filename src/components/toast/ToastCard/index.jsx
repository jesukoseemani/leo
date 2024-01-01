import React from "react";
import PropTypes from "prop-types";

import "./toastCard.scss";

import {
  SuccessIcon,
  FailureIcon,
  WarningIcon,
  CloseIcon,
} from "../../icons/ToastIcons";

const ToastCard = ({ message, type, onClose }) => {
  const iconMap = {
    success: <SuccessIcon />,
    failure: <FailureIcon />,
    warning: <WarningIcon />,
  };

  const toastIcon = iconMap[type] || null;

  return (
    <div className={`toast--${type}`} role="alert">
      <div className="toast-close-btn" onClick={onClose}>
        <span className="icon">
          <CloseIcon />
        </span>
      </div>
      <div className="toast-message">
        {toastIcon && (
          <div className="icon icon--lg icon--thumb">{toastIcon}</div>
        )}
        <p>{message}</p>
      </div>
    </div>
  );
};

ToastCard.defaultProps = {
  type: "success",
  message: "Successfully fetched",
};

ToastCard.propTypes = {
  type: PropTypes.oneOf(["success", "failure", "warning"]).isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastCard;
