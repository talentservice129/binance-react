import React, { useState } from "react";

const LanguageSelector = () => {
  const [selected, ] = useState("Italiano");

  return (
    <div className="group flex items-center text-PrimaryText text-sm">
      <div className="flex items-center gap-1 mx-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-4 h-4"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M15.23 20.403a9.011 9.011 0 005.684-7.153h-3.942c-.147 2.86-.793 5.388-1.741 7.153zm-.757-7.153c-.178 4.102-1.217 7.25-2.473 7.25-1.256 0-2.295-3.148-2.473-7.25h4.946zm0-2.5H9.527C9.705 6.648 10.744 3.5 12 3.5c1.256 0 2.295 3.148 2.473 7.25zm2.499 0h3.942a9.01 9.01 0 00-5.683-7.153c.948 1.765 1.594 4.293 1.741 7.153zm-9.936 0c.147-2.862.793-5.392 1.743-7.156a9.01 9.01 0 00-5.693 7.156h3.95zm0 2.5h-3.95a9.01 9.01 0 005.693 7.157c-.95-1.765-1.596-4.295-1.743-7.157z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="inline text-textSecondary hover:text-textBrand">
          {selected}
        </div>
      </div>
      <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">

      </div>
    </div>
  );
};

export default LanguageSelector;
