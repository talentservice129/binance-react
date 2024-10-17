import React from "react";
import LanguageSelector from "../language-selector";

const AppFooter = () => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex items-center justify-center h-[70px] w-[425px] text-textSecondary text-sm">
        <LanguageSelector />
        <div className="mx-4 cursor-pointer hover:text-textBrand">Cookie</div>
        <div className="mx-4 cursor-pointer hover:text-textBrand">Termini</div>
        <div className="mx-4 cursor-pointer hover:text-textBrand">Privacy</div>
      </div>
    </div>
  );
};

export default AppFooter;
