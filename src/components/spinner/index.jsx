import React from "react";

const Spinner = (color) => {
  return (
    <div className="bn-spinner__nezha h-6 px-2">
      <div
        className="nezha-line !bg-TextOnYellow"
        style={{ animationDelay: "50ms" }}
      ></div>
      <div
        className="nezha-line !bg-TextOnYellow"
        style={{ animationDelay: "100ms" }}
      ></div>
      <div
        className="nezha-line !bg-TextOnYellow"
        style={{ animationDelay: "150ms" }}
      ></div>
      <div
        className="nezha-line !bg-TextOnYellow"
        style={{ animationDelay: "200ms" }}
      ></div>
    </div>
  );
};

export default Spinner;
