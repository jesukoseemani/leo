import React, { useEffect, useRef } from "react";
import "./toastSort.scss";
import ToastCard from "../ToastCard";
import toastSlice from "../../../store/toastSlice";
import { useDispatch } from "react-redux";

const ToastSort = ({ data, position }) => {
  const sortRef = useRef(null);
  const { removeToast } = toastSlice.actions;

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

export default ToastSort;
