import React from "react";

const QrGenerator = () => {
  return (
    <div className="p-1 w-10 h-10 rounded-lg hover:bg-Input cursor-pointer bg-Vessel">
      <svg
        fill="textPrimary"
        size="32"
        className="bn-svg w-[32px] h-[32px] text-textPrimary"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4 4h7v7H4V4zm0 9h7v7H4v-7zm11 0h-2v4h4v-2h3v-2h-4v2h-1v-2zm5 3h-2v2h-2v2h4v-4zm-5 2h-2v2h2v-2zM13 4h7v7h-7V4zM8.5 6.5h-2v2h2v-2zm-2 9h2v2h-2v-2zm11-9h-2v2h2v-2z"
          fill="currentColor"
        ></path>
      </svg>
    </div>
  );
};

export default QrGenerator;
