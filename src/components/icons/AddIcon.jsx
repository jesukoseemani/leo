import React from "react";

function AddIcon({ width, height }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={`${width ? width : "21"}`}
      height={`${height ? height : "21"}`}
      viewBox="0 0 21 21"
      fill="none"
    >
      <path
        d="M10.5 2V10.5M10.5 19V10.5M10.5 10.5H19H2"
        stroke="#F9F9F9"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default AddIcon;
