import React from "react";

const ButtonWrapper = ({ children, size = 24, color = "currentColor" }) => {
  return (
    <button className="button-wrapper hover:bg-hover">
      <span
        className={`rounded-[50%] absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center ${color}`}
        style={{ fontSize: size }}
      >
        {children}
      </span>
    </button>
  );
};

export default ButtonWrapper;
