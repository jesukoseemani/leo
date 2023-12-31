import React, { useEffect, useRef } from "react";
import ToastCard from "../ToastCard";
import { removeToast } from "../../../store/toastSlice";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";

import "./toastSort.scss";

const ToastSort = ({ data, position }) => {
  const sortRef = useRef(null);

  const dispatch = useDispatch();

  const handleScrolling = (el) => {
    const isTopPosition = ["top-left", "top-right"].includes(position);
    if (isTopPosition) {
      el?.scrollTo(0, el.scrollHeight);
    } else {
      el?.scrollTo(0, 0);
    }
  };

  useEffect(() => {
    handleScrolling(sortRef.current);
  }, [position, data]);

  const sortedData = position.includes("bottom")
    ? [...data].reverse()
    : [...data];

  return (
    sortedData.length > 0 && (
      <div
        className={`toast-list toast-list--${position}`}
        aria-live="assertive"
        ref={sortRef}
      >
        {sortedData.map((toast) => (
          <ToastCard
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => dispatch(removeToast(toast.id))}
          />
        ))}
      </div>
    )
  );
};

ToastSort.defaultProps = {
  position: "top-right",
};

ToastSort.propTypes = {
  position: PropTypes.oneOf([
    "top-right",
    "top-left",
    "bottom-right",
    "bottom-left",
  ]).isRequired,
  data: PropTypes.array,
};

export default ToastSort;
